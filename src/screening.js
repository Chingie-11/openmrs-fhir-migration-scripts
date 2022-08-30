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



    tasksArray.forEach(task => {
        //guardian updates screening
        if (task === constants.guardianUpdates) {

            if (yearsDiff >= 15) {
                guardianUpdates.reasonReference.reference = "Questionnaire/patient-guardian-updates-15-years-plus"
            } else {
                guardianUpdates.reasonReference.reference = "Questionnaire/patient-guardian-updates-0-to-15-years"
            }
        }

        //women health screening
        else if (task === constants.womenHealth && gender === "female") {

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
        else if (task === constants.vitals) {

            if (gender === female) {

                if (monthsDiff < 6) {
                    vitals.reasonReference.reference = "Questionnaire/art-client-vitals-female-0-to-6-months"
                } else if (monthsDiff >= 6 && yearsDiff < 5) {
                    vitals.reasonReference.reference = "Questionnaire/art-client-vitals-6-months-to-5-years"
                } else if (yearsDiff < 13 && yearsDiff >= 5) {
                    vitals.reasonReference.reference = "Questionnaire/art-client-vitals-5-to-13-years"
                } else if (yearsDiff < 15 && yearsDiff >= 13) {
                    vitals.reasonReference.reference = "Questionnaire/art-client-vitals-13-to-15-years"
                } else if (yearsDiff < 30 && yearsDiff >= 15) {
                    vitals.reasonReference.reference = "Questionnaire/art-client-vitals-female-15-to-30-years"
                }else if (yearsDiff < 40 && yearsDiff >= 30) {
                    vitals.reasonReference.reference = "Questionnaire/art-client-vitals-female-30-to-40-years"
                }else if (yearsDiff >= 40) {
                    vitals.reasonReference.reference = "Questionnaire/art-client-vitals-female-40-years-plus"
                }
                
            } else {

                if (monthsDiff < 6) {
                    vitals.reasonReference.reference = "Questionnaire/art-client-vitals-male-0-to-6-months"
                } else if (monthsDiff >= 6 && yearsDiff < 5) {
                    vitals.reasonReference.reference = "Questionnaire/art-client-vitals-6-months-to-5-years"
                } else if (yearsDiff < 13 && yearsDiff >= 5) {
                    vitals.reasonReference.reference = "Questionnaire/art-client-vitals-5-to-13-years"
                } else if (yearsDiff < 15 && yearsDiff >= 13) {
                    vitals.reasonReference.reference = "Questionnaire/art-client-vitals-13-to-15-years"
                } else if (yearsDiff < 30 && yearsDiff >= 15) {
                    vitals.reasonReference.reference = "Questionnaire/art-client-vitals-male-15-to-30-years"
                }else if (yearsDiff < 40 && yearsDiff >= 30) {
                    vitals.reasonReference.reference = "Questionnaire/art-client-vitals-male-30-to-40-years"
                }else if (yearsDiff >= 40) {
                    vitals.reasonReference.reference = "Questionnaire/art-client-vitals-male-40-years-plus"
                }
            }
        }
    });
}