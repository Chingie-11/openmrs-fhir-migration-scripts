//This funtion performs screening using gender and birthday to give the correct task and/or Questionnaire for each client.
const dayjs = require('dayjs')
const constants = require('./constants')

module.exports = function performScreening(gender, birthDate, tasks, tasksArray, guardianUpdates, vitals, womenHealth) {

    const currentDate = dayjs(Date.now())
    const dateThen = dayjs(birthDate)
    let yearsDiff = currentDate.diff(dateThen, 'year')
    let monthsDiff = currentDate.diff(dateThen, 'month')
    let addWomenHealth = tasks.push({
        resource: womenHealth, "request": {
            "method": "POST",
            "url": "Task/"
        }
    });



    return tasksArray.map(task => {
        
        //guardian updates screening
        if (task.description === constants.guardianUpdates) {
            if (yearsDiff >= 15) {
                guardianUpdates.reasonReference.reference = "Questionnaire/patient-guardian-updates-15-years-plus"
            } else {
                guardianUpdates.reasonReference.reference = "Questionnaire/patient-guardian-updates-0-to-15-years"
            }
        }

        //women health screening
        else if (task.description === constants.womensHealthScreening && gender === "female") {
            if (yearsDiff < 15 && yearsDiff >= 9) {
                womenHealth.reasonReference.reference = "Questionnaire/art-client-womens-health-screening-female-9-to-14-years"
                addWomenHealth
            } else if (yearsDiff < 25 && yearsDiff >= 15) {
                womenHealth.reasonReference.reference = "Questionnaire/art-client-womens-health-screening-female-15-to-25-years"
                addWomenHealth
            } else if (yearsDiff >= 25) {
                womenHealth.reasonReference.reference = "Questionnaire/art-client-womens-health-screening-female-25-years-plus"
                addWomenHealth
            }
        }

        //vitals screening
        else if (task.description === constants.vitals) {

            if (gender === "female") {

                if (monthsDiff < 6) {
                    vitals.reasonReference.reference = "Questionnaire/patient-vitals-female-0-to-6-months"
                } else if (monthsDiff >= 6 && yearsDiff < 15) {
                    vitals.reasonReference.reference = "Questionnaire/patient-vitals-6-months-to-15-years"
                } else if (yearsDiff >= 15) {
                    vitals.reasonReference.reference = "Questionnaire/art-client-vitals-female-15-years-plus"
                }
                
            } else {

                if (monthsDiff < 6) {
                    vitals.reasonReference.reference = "Questionnaire/patient-vitals-male-0-to-6-months"
                } else if (monthsDiff >= 6 && yearsDiff < 15) {
                    vitals.reasonReference.reference = "Questionnaire/patient-vitals-6-months-to-15-years"
                } else if (yearsDiff >= 15) {
                    vitals.reasonReference.reference = "Questionnaire/art-client-vitals-male-15-years-plus"
                }
            }
        } 
        return task
    });
}