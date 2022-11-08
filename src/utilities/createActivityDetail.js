const constants = require("./constants");

module.exports = function createActivityDetail(taskName) {
    let dateNow = new Date();
    let taskModel = {
        "outcomeReference": [
            {
                "reference": "",
                "display": constants.tbCovidScreen
            }
        ],
        "detail": {
            "kind": "Task",
            "code": {
                "coding": [
                    {
                        "system": "https://d-tree.org",
                        "code": "client-tb-covid-screening",
                        "display": constants.tbCovidScreen
                    }
                ],
                "text": constants.tbCovidScreen
            },
            "status": "in-progress",
            "scheduledPeriod": {
                "start": dateNow.toISOString(),
                "end": ""
            },
            "performer": [
                {
                    "reference": "Practitioner/649b723c-28f3-4f5f-8fcf-28405b57a1ec",
                    "display": "Test CHW"
                }
            ],
            "description": constants.tbCovidScreen
        }
    }

    if(taskName === constants.screening){
        taskModel.outcomeReference[0].display = constants.tbCovidScreen
        taskModel.detail.code.coding[0].code = ""
        taskModel.detail.code.coding[0].display = constants.screening
        taskModel.detail.code.text = constants.screening
        taskModel.detail.description = constants.screening

    }else if (taskName === constants.tbCovidScreen) {
        taskModel.outcomeReference[0].display = constants.tbCovidScreen
        taskModel.detail.code.coding[0].code = ""
        taskModel.detail.code.coding[0].display = constants.tbCovidScreen
        taskModel.detail.code.text = constants.tbCovidScreen
        taskModel.detail.description = constants.tbCovidScreen

    } else if (taskName === constants.demographicsUpdates) {
        taskModel.outcomeReference[0].display = constants.demographicsUpdates
        taskModel.detail.code.coding[0].code = ""
        taskModel.detail.code.coding[0].display = constants.demographicsUpdates
        taskModel.detail.code.text = constants.demographicsUpdates
        taskModel.detail.description = constants.demographicsUpdates

    } else if (taskName === constants.guardianUpdates) {
        taskModel.outcomeReference[0].display = constants.guardianUpdates
        taskModel.detail.code.coding[0].code = ""
        taskModel.detail.code.coding[0].display = constants.guardianUpdates
        taskModel.detail.code.text = constants.guardianUpdates
        taskModel.detail.description = constants.guardianUpdates

    } else if (taskName === constants.vitals) {
       taskModel.outcomeReference[0].display = constants.vitals
        taskModel.detail.code.coding[0].code = ""
        taskModel.detail.code.coding[0].display = constants.vitals
        taskModel.detail.code.text = constants.vitals
        taskModel.detail.description = constants.vitals

    } else if (taskName === constants.womensHealthScreening) {
        taskModel.outcomeReference[0].display = constants.womensHealthScreening
        taskModel.detail.code.coding[0].code = ""
        taskModel.detail.code.coding[0].display = constants.womensHealthScreening
        taskModel.detail.code.text = constants.womensHealthScreening
        taskModel.detail.description = constants.womensHealthScreening

    } else if (taskName === constants.clinicalRegistration) {
        taskModel.outcomeReference[0].display = constants.clinicalRegistration
        taskModel.detail.code.coding[0].code = ""
        taskModel.detail.code.coding[0].display = constants.clinicalRegistration
        taskModel.detail.code.text = constants.clinicalRegistration
        taskModel.detail.description = constants.clinicalRegistration

       
    } else if (taskName === constants.tbHistoryAndRegimen) {
        taskModel.outcomeReference[0].display = constants.tbHistoryAndRegimen
        taskModel.detail.code.coding[0].code = ""
        taskModel.detail.code.coding[0].display = constants.tbHistoryAndRegimen
        taskModel.detail.code.text = constants.tbHistoryAndRegimen
        taskModel.detail.description = constants.tbHistoryAndRegimen
    }

    return taskModel
}
