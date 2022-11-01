require('dotenv').config()
const csv = require('csvtojson');
const path = require("path");
const fs = require("fs");
const util = require("util");
const getAuthCode = require("./network/auth");
const getBundleResourceIds = require("./bundle/bundleDetails");
const constructBundle = require("./bundle/constructBundle");
const postRequest = require("./network/postRequest");
const createActivityDetail = require("./utilities/createActivityDetail");
const createPatient = require("./resources/patientResource");
const createCarePlan = require("./resources/carePlanResource");
const createUserTasks = require("./utilities/createUserTasks");
const encryptData = require("./utilities/encryption");
const constants = require("./utilities/constants");
const prompt = require('prompt-sync')();

async function main() {
    //Authentication information 
    const auth = await getAuthCode();

    console.log(auth);

    const organisationID = prompt('What is the organisation ID');
    //converting CSV file to JSON 
    csv().fromFile(path.join(__dirname, "./assets/csv/minidump.csv")).then(async (json) => {
        const patients = [];
        const clientDetails = {}

        
        //lopping through the created JSON to get each client's details and populating them in client details for future use with tasks.
        json.forEach(patient => {

            clientDetails[patient.identifier] = {
                nextAppointment: patient.nextAppointment,
                identity: patient.identifier,
                gender: patient.gender,
                birthDate: patient.birthDate
            }

            //populating the patient resource
            const encryptGivenName = encryptData(patient.given);
            const encryptFamilyName = encryptData(patient.family);
            const data = createPatient(patient.identifier, encryptFamilyName, encryptGivenName, patient.telecom, patient.gender, patient.birthDate, patient.city, patient.district, organisationID)

            //adding the necessary request method and URL for Patient resource.
            patients.push({
                resource: data, "request": {
                    "method": "POST",
                    "url": "Patient"
                }
            });
        });

        //writing to a file all the patients created to be sent to the server for verification purposes
        fs.writeFileSync(path.join(__dirname, "./assets/generated/output.json"), JSON.stringify(patients))

        //putting all the patients in a Bundle Resource to be sent to the server in bulk.
        const patientsBundle = constructBundle(patients)

        try {
            //sending the created Bundle resource to the server and saving the response in responsePatient
            const responsePatient = await postRequest(patientsBundle, auth)

            console.log(auth.token_type)
            console.log(responsePatient.data);

            /*Because the Bundle reponse from postRequest does not have full details of the patients,
            we need to get the individual patientIDs from the Bundle reponse and send a GET request
            for each on of them to get the full details.
            The function below is looping through the saved Bundle response to get the patient IDs,
            and putting them in a Bundle which will be sent to the serve to get full details of the patiens */
            const patientDataRequest = getBundleResourceIds(responsePatient)

            console.log(patientDataRequest)

            //sending the saved Bundle with the client IDs to the server and saving the response in patientBundleResponse
            const patientBundleResponse = await postRequest(patientDataRequest, auth)
            console.log((patientBundleResponse).data);

            //looping through the PatientBundle Response to get specific information and adding it to the clientDetails which already had some client detials from the first loop
            patientBundleResponse.data.entry.forEach(data => {
                const userData = clientDetails[data.resource.identifier[0].value]
                let bundleData = {
                    ...userData,
                    userName: data.resource.name[0].given + " " + data.resource.name[0].family,
                    userId: data.resource.id
                }
                clientDetails[data.resource.identifier[0].value] = bundleData;
            });

            //looping through clientDetails to get each client's information and populating Tasks with that information.
            const tasks = createUserTasks(clientDetails);

            //putting all the client tasks in a Bundle to be sent to the server in bulk
            const constructedData = constructBundle(tasks);

            //sending the tasks Bundle to the server and saving the response as taskBundleResponse
            const taskBundleResponse = await postRequest(constructedData, auth);
            console.log(taskBundleResponse.data.entry);


            //looping through the saved tasks Bundle response to to get "Location" of tasks and populating the locations in a Bundle to send to the server to get full client details
            const taskDataRequest = getBundleResourceIds(taskBundleResponse);
            console.log(taskDataRequest);

            //sending the saved Bundle response with the task locations to the server and saving the response as bundleResponse
            const fullTaskResponse = await postRequest(taskDataRequest, auth);
            console.log((fullTaskResponse).data);

            //creating an object of usertasks
            const userTasks = {}

            //looping through the saved full task response with all the task details and populating userTasks with the key being the clientID and the value being the client's tasks 
            fullTaskResponse.data.entry.forEach(task => {
                let patientID = task.resource.for.reference.split("/")[1]
                const user = userTasks[patientID]
                const newUserTask = {
                    taskId: task.resource.id,
                    taskType: task.resource.description,
                    userName: task.resource.for.display,
                    appointmentDate: task.resource.executionPeriod.end,
                    currentDate: task.resource.executionPeriod.start,
                    questionnaireCode: task.resource.reasonReference.reference.substring(14)
                }
                if (user === undefined || user === null) {
                    userTasks[patientID] = [newUserTask]
                } else {
                    user.push(newUserTask)
                    userTasks[patientID] = user
                }
            });

            console.log(userTasks);

            //creating task models to be using in carePlan "Activity"
            const activityDetail = {
                "Screening": createActivityDetail(constants.screening),
                "tbCovidScreening": createActivityDetail(constants.tbCovideScreen),
                "Demographic Updates": createActivityDetail(constants.demographicsUpdates),
                "Guardian Updates": createActivityDetail(constants.guardianUpdates),
                "Vitals": createActivityDetail(constants.vitals),
                "Clinical Registration": createActivityDetail(constants.clinicalRegistration),
                "TB History and Regimen": createActivityDetail(constants.tbHistoryAndRegimen),
                "Women's Health Screening": createActivityDetail(constants.womensHealthScreening)
            };

            console.log(activityDetail);


            //creating client CarePlans
            const CarePlans = []

            //looping through the populated userTasks to create carePlans. Each key/clientID will have a carePlan and the value/tasks being populated in Activity Array
            Object.keys(userTasks).forEach(patientid => {
                const tasks = userTasks[patientid]
                CarePlans.push({
                    resource: createCarePlan(patientid, tasks, activityDetail),
                    "request": {
                        "method": "POST",
                        "url": "CarePlan/"
                    }
                })
            });

            //putting careplans in a Bundle
            const constructedCarePlan = constructBundle(CarePlans)

            //sending careplans Bundle to server and saving response as carePlanResponse
            const carePlanResponse = await postRequest(constructedCarePlan, auth)
            console.log((carePlanResponse).data);





        } catch (error) {
            console.log(util.inspect(error, { showHidden: false, depth: null, colors: true }));
        }

    }).catch((err) => {
        console.log(err);
    });
}


main();


