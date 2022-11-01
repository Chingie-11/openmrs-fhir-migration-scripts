const createTask = require("../resources/taskResource")
const performScreening = require("./screening")
const constants = require("./constants")

module.exports = function createUserTasks(clientDetails){
            const tasks = [];
            //looping through clientDetails to get each client's information and populating Tasks with that information.
            Object.keys(clientDetails).forEach(patientid => {

                const details = clientDetails[patientid]

                const tbCovid = createTask(constants.tbCovideScreen, details.userId, details.userName, details.nextAppointment)

                const demographicUpdates = createTask(constants.demographicsUpdates, details.userId, details.userName, details.nextAppointment)

                const guardianUpdates = createTask(constants.guardianUpdates, details.userId, details.userName, details.nextAppointment)

                const vitals = createTask(constants.vitals, details.userId, details.userName, details.nextAppointment)

                const womenHealth = createTask(constants.womensHealthScreening, details.userId, details.userName, details.nextAppointment)

                const clinicalReg = createTask(constants.clinicalRegistration, details.userId, details.userName, details.nextAppointment)

                const nextAppointment = createTask(constants.tbHistoryAndRegimen, details.userId, details.userName, details.nextAppointment)

                //screening tasks by age and gender to get the correct next appointment tasks/questionnaires
                const tasksArray =  performScreening(details.gender, details.birthDate, tasks, [demographicUpdates, guardianUpdates, tbCovid, clinicalReg, vitals, nextAppointment,womenHealth], guardianUpdates, vitals, womenHealth)
                console.log(tasksArray)

                const taskMethod = {
                    "method": "POST",
                    "url": "Task/"
                }

                tasksArray.forEach(element => {
                    if (element !== womenHealth ) {
                        tasks.push(
                            {
                                resource: element, "request": taskMethod
                            }
                        );
                    }
                    

                });


            });
        
            return tasks

}