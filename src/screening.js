const dayjs = require('dayjs')

module.exports = function performScreening(gender, birthDate, tasks, guardianUpdates, vitals, womenHealth ){

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


    if (gender === "female") {


        if (monthsDiff < 6) {

            vitals.reasonReference.reference = "Questionnaire/art-client-vitals-female-0-to-6-months"

        } else if (monthsDiff >= 6 && yearsDiff < 5) {

            vitals.reasonReference.reference = "Questionnaire/art-client-vitals-6-months-to-5-years"

        }
        else if (yearsDiff < 9 && yearsDiff >= 5) {

            vitals.reasonReference.reference = "Questionnaire/art-client-vitals-5-to-13-years"

        } else if (yearsDiff < 13 && yearsDiff >= 9) {
            womenHealth.reasonReference.reference = "Questionnaire/art-client-womens-health-screening-female-9-to-14-years"
            vitals.reasonReference.reference = "Questionnaire/art-client-vitals-5-to-13-years"
            addWomenHealth

        } else if (yearsDiff < 14 && yearsDiff >= 13) {
            womenHealth.reasonReference.reference = "Questionnaire/art-client-womens-health-screening-female-9-to-14-years"
            vitals.reasonReference.reference = "Questionnaire/art-client-vitals-13-to-15-years"
            addWomenHealth

        } else if (yearsDiff < 15 && yearsDiff >= 14) {
            vitals.reasonReference.reference = "Questionnaire/art-client-vitals-13-to-15-years"
            addWomenHealth

        } else if (yearsDiff < 25 && yearsDiff >= 15) {

            womenHealth.reasonReference.reference = "Questionnaire/art-client-womens-health-screening-female-15-to-25-years"
            vitals.reasonReference.reference = "Questionnaire/art-client-vitals-female-15-to-30-years"
            guardianUpdates.reasonReference.reference = "Questionnaire/patient-guardian-updates-15-years-plus"
            addWomenHealth

        } else if (yearsDiff < 30 && yearsDiff >= 25) {
            womenHealth.reasonReference.reference = "Questionnaire/art-client-womens-health-screening-female-25-years-plus"
            vitals.reasonReference.reference = "Questionnaire/art-client-vitals-female-15-to-30-years"
            guardianUpdates.reasonReference.reference = "Questionnaire/patient-guardian-updates-15-years-plus"
            addWomenHealth

        } else if (yearsDiff < 40 && yearsDiff >= 30) {
            womenHealth.reasonReference.reference = "Questionnaire/art-client-womens-health-screening-female-25-years-plus"
            vitals.reasonReference.reference = "Questionnaire/art-client-vitals-female-30-to-40-years"
            guardianUpdates.reasonReference.reference = "Questionnaire/patient-guardian-updates-15-years-plus"
            addWomenHealth

        } else if (yearsDiff >= 40) {
            womenHealth.reasonReference.reference = "Questionnaire/art-client-womens-health-screening-female-25-years-plus"
            vitals.reasonReference.reference = "Questionnaire/art-client-vitals-female-40-years-plus"
            guardianUpdates.reasonReference.reference = "Questionnaire/patient-guardian-updates-15-years-plus"
            addWomenHealth
        }


    } else {

        if (monthsDiff < 6) {

            vitals.reasonReference.reference = "Questionnaire/art-client-vitals-male-0-to-6-months"

        } else if (monthsDiff >= 6 && yearsDiff < 5) {

            vitals.reasonReference.reference = "Questionnaire/art-client-vitals-6-months-to-5-years"

        }
        else if (yearsDiff < 13 && yearsDiff >= 5) {

            vitals.reasonReference.reference = "Questionnaire/art-client-vitals-5-to-13-years"

        } else if (yearsDiff < 15 && yearsDiff >= 13) {

            vitals.reasonReference.reference = "Questionnaire/art-client-vitals-13-to-15-years"

        } else if (yearsDiff < 30 && yearsDiff >= 15) {

            vitals.reasonReference.reference = "Questionnaire/art-client-vitals-male-15-to-30-years"
            guardianUpdates.reasonReference.reference = "Questionnaire/patient-guardian-updates-15-years-plus"

        } else if (yearsDiff < 40 && yearsDiff >= 30) {

            vitals.reasonReference.reference = "Questionnaire/art-client-vitals-male-30-to-40-years"
            guardianUpdates.reasonReference.reference = "Questionnaire/patient-guardian-updates-15-years-plus"

        } else if (yearsDiff >= 40) {

            vitals.reasonReference.reference = "Questionnaire/art-client-vitals-male-40-years-plus"
            guardianUpdates.reasonReference.reference = "Questionnaire/patient-guardian-updates-15-years-plus"
        }

    }
}