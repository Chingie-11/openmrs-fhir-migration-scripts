require('dotenv').config()
const csv = require('csvtojson');
const path = require("path");
const fs = require("fs");
const axios = require("axios").default;
const oauth = require('axios-oauth-client');
const util = require("util")
const dayjs = require('dayjs')

const getAuthCode = require ("./network.js")
const getBundleResourceIds = require ("./bundleDetails")
const performScreening = require ("./screening")
const constructBundle = require ("./constructBundle")
const networkCall = require ("./networkCall")
const createTaskModel = require ("./taskModel")
const createTasks = require ("./task")
const createPatient = require ("./patientResource")


async function main() {
  
    const getAuthorizationCode = oauth.client(axios.create(), {
        url: process.env.FHIR_TOKEN_URL,
        grant_type: process.env.FHIR_GRANT,
        client_id: process.env.FHIR_CLIENT_ID,
        client_secret: process.env.FHIR_SECRET,
        username: process.env.FHIR_USERNAME,
        password: process.env.FHIR_PASSWORD,
        scope: process.env.FHIR_SCROPE
    });




    //Authentication information 
    const auth = await getAuthorizationCode();

    console.log(auth);

    //converting CSV file to JSON 
    csv().fromFile(path.join(__dirname, "./assets/csv/minidump.csv")).then(async (json) => {
        const patients = [];
        const clientDetails = {}
        
        //lopping through the created JSON to get each client's details and populating them in client details for future use with tasks.
        json.forEach(patient => {

            clientDetails[patient.identifier] = {
                nextAppointment: patient.nextAppointment,
                userName: patient.given + patient.family,
                identity: patient.identifier,
                gender: patient.gender,
                birthDate: patient.birthDate
            }

            //populating the patient resource
           data = createPatient(patient.identifier,patient.family,patient.given,patient.telecom, patient.gender, patient.birthDate, patient.city, patient.district)

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
        const patientData = constructBundle(patients)


        try {
            //sending the created Bundle resource to the server and saving the response in responsePatient
            const responsePatient = await networkCall(patientData,auth)
            
            console.log(auth.token_type)
            console.log(responsePatient.data);

            //looping through the saved Bundle response to to get "Location" of Patients and populating the locations in a Bundle to send to the server to get full client details
            const patientDataRequest = getBundleResourceIds(responsePatient)

            console.log(patientDataRequest)

            //sending the saved Bundle response with the client locations to the server and saving the response in patientBundleResponse
            const patientBundleResponse = await networkCall(patientDataRequest,auth)
            console.log((patientBundleResponse).data);


            const userIDs = {}

            //looping through the PatientBundle Response to get specific information and adding it to the clientDetails which already had some client detials from the first loop
            patientBundleResponse.data.entry.forEach(id => {
                const userData = clientDetails[id.resource.identifier[0].value]
                bundleData = {
                    ...userData,
                    artNumber: id.resource.identifier[0].value,
                    userName: id.resource.name[0].given + " " + id.resource.name[0].family,
                    userId: id.resource.id
                }
                clientDetails[id.resource.identifier[0].value] = bundleData;
            });

            const tasks = [];
            let dateNow = new Date();
            let today = dayjs(Date.now())
            let dateEnd = today.add(14, "day").format();

            //looping through clientDetails to get each client's information and populating Tasks with that information.
            Object.keys(clientDetails).forEach(patientid => {

                const details = clientDetails[patientid]
                
                const tbCovid = createTasks("TB/COVID Screening",details.userId, details.userName,details.nextAppointment)

                const demographicUpdates = createTasks("Demographic Updates",details.userId, details.userName,details.nextAppointment)

                const guardianUpdates = createTasks("Guardian Updates",details.userId, details.userName,details.nextAppointment)

                const vitals = createTasks("Vitals",details.userId, details.userName,details.nextAppointment)

                const womenHealth = createTasks("Women's Health Screening",details.userId, details.userName,details.nextAppointment)

                const clinicalReg = createTasks("Clinical Registration",details.userId, details.userName,details.nextAppointment)

                const nextAppointment = createTasks("TB History, Regimen and Next Appointment",details.userId, details.userName,details.nextAppointment)

                const currentDate = dayjs(Date.now())
                const dateThen = dayjs(details.birthDate)
                let yearsDiff = currentDate.diff(dateThen, 'year')
                let monthsDiff = currentDate.diff(dateThen, 'month')

                //screening tasks by age and gender to get the correct next appointment tasks/questionnaires
                performScreening(details.gender,details.birthDate, tasks,  guardianUpdates, vitals, womenHealth  )


                const taskMethod = {
                    "method": "POST",
                    "url": "Task/"
                }
                tasks.push(
                    {
                        resource: demographicUpdates, "request": taskMethod
                    },
                    {
                        resource: guardianUpdates, "request": taskMethod
                    },
                    {
                        resource: tbCovid, "request": taskMethod
                    },
                    {
                        resource: clinicalReg, "request": taskMethod
                    },
                    {
                        resource: vitals, "request": taskMethod
                    },
                    {
                        resource: nextAppointment, "request": taskMethod
                    }

                );
            });


            //putting all the client tasks in a Bundle to be sent to the server in bulk
            const constructedData = constructBundle(tasks)

            //sendig the tasks Bundle to the server and saving the response as taskBundleResponse
            const taskBundleResponse = await networkCall(constructedData,auth)
            console.log(taskBundleResponse.data.entry);


            //looping through the saved tasks Bundle response to to get "Location" of tasks and populating the locations in a Bundle to send to the server to get full client details
            const taskDataRequest = getBundleResourceIds(taskBundleResponse)
            console.log(taskDataRequest)


            //sending the saved Bundle response with the task locations to the server and saving the response as bundleResponse
            const fullTaskResponse = await networkCall(taskDataRequest,auth)
            console.log((fullTaskResponse).data);

            //creating an object of usertasks
            const userTasks = {}

            //looping through the saved full task response with all the task details and populating userTasks with the key being the clientID and the value being the client's tasks 
            fullTaskResponse.data.entry.forEach(task => {
                const user = userTasks[task.resource.for.reference.split("/")[1]]
                const newUserTask = {
                    taskId: task.resource.id,
                    taskType: task.resource.description,
                    userName: task.resource.for.display,
                    appointmentDate: task.resource.executionPeriod.end,
                    currentDate: task.resource.executionPeriod.start
                }
                if (user === undefined || user === null) {
                    userTasks[task.resource.for.reference.split("/")[1]] = [newUserTask]
                } else {
                    user.push(newUserTask)
                    userTasks[task.resource.for.reference.split("/")[1]] = user
                }
            });

            //creating task models to be using in carePlan "Activity"
            const taskModel = {
                "TB/COVID Screening": createTaskModel("TB/COVID Screening"),
                "Demographic Updates": createTaskModel("Demographic Updates"),
                "Guardian Updates": createTaskModel("Guardian Updates"),
                "Vitals": createTaskModel("Vitals"),
                "Clinical Registration": createTaskModel("Clinical Registration"),
                "TB History, Regimen and Next Appointment": createTaskModel("TB History, Regimen and Next Appointment"),
                "Women's Health Screening": createTaskModel("Women's Health Screening")

            };


            //creating client CarePlans
            const CarePlans = []

            //looping through the populated userTasks to create carePlans. Each key/clientID will have a carePlan and the value/tasks being populated in Activity Array
            Object.keys(userTasks).forEach(patientid => {
                const tasks = userTasks[patientid]
                CarePlans.push({
                    resource: {
                        "resourceType": "CarePlan",
                        "identifier": [
                            {
                                "use": "official",
                                "value": Math.random().toString(36).substring(2, 9)
                            }
                        ],
                        "status": "active",
                        "intent": "plan",
                        "title": "ART Client Visit",
                        "subject": tasks.map(x => ({
                            "reference": "Patient/" + patientid,
                            "display": x.userName
                        })),
                        "period": tasks.map(x => ({
                            "start": dateNow.toISOString(),
                            "end": x.appointmentDate
                        })),
                        "created": dateNow.toISOString(),
                        "author": {
                            "reference": "Practitioner/649b723c-28f3-4f5f-8fcf-28405b57a1ec",
                            "display": "Test CHW"
                        },
                        activity: tasks.map(task => {
                            const model = JSON.parse(JSON.stringify(taskModel[task.taskType]))

                            model.outcomeReference[0] = { reference: "Task/" + task.taskId, display: task.taskType }
                            model.detail.scheduledPeriod.end = task.appointmentDate

                            return model
                        })
                    },
                    "request": {
                        "method": "POST",
                        "url": "CarePlan/"
                    }
                })
            });

            //putting careplans in a Bundle
            const constructedCarePlan = constructBundle(CarePlans)

            //sending careplans Bundle to server and saving response as carePlanResponse
            const carePlanResponse = await networkCall(constructedCarePlan,auth)
            console.log((carePlanResponse).data);



        } catch (error) {
            console.log(util.inspect(error, { showHidden: false, depth: null, colors: true }));
        }

    }).catch((err) => {
        console.log(err);
    });
}


main();


