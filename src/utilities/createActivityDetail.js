const constants = require("./constants");

module.exports = function createActivityDetail(taskName) {
    let dateNow = new Date();
    let taskModel = {
        "outcomeReference": [
            {
                "reference": "",
                "display": constants.tbCovideScreen
            }
        ],
        "detail": {
            "kind": "Task",
            "code": {
                "coding": [
                    {
                        "system": "https://d-tree.org",
                        "code": "client-tb-covid-screening",
                        "display": constants.tbCovideScreen
                    }
                ],
                "text": constants.tbCovideScreen
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
            "description": constants.tbCovideScreen
        }
    }

    if(taskName === constants.screening){
        taskModel.outcomeReference[0].display = constants.tbCovideScreen
        taskModel.detail.code.coding[0].code = "patient-screening"
        taskModel.detail.code.coding[0].display = constants.screening
        taskModel.detail.code.text = constants.screening
        taskModel.detail.description = constants.screening

    }else if (taskName === constants.tbCovideScreen) {
        taskModel.outcomeReference[0].display = constants.tbCovideScreen
        taskModel.detail.code.coding[0].code = "patient-tb-covid"
        taskModel.detail.code.coding[0].display = constants.tbCovideScreen
        taskModel.detail.code.text = constants.tbCovideScreen
        taskModel.detail.description = constants.tbCovideScreen

    } else if (taskName === constants.demographicsUpdates) {
        taskModel.outcomeReference[0].display = constants.demographicsUpdates
        taskModel.detail.code.coding[0].code = "patient-demographic-updates"
        taskModel.detail.code.coding[0].display = constants.demographicsUpdates
        taskModel.detail.code.text = constants.demographicsUpdates
        taskModel.detail.description = constants.demographicsUpdates

    } else if (taskName === constants.guardianUpdates) {
        taskModel.outcomeReference[0].display = constants.guardianUpdates
        taskModel.detail.code.coding[0].code = "patient-guardian-updates"
        taskModel.detail.code.coding[0].display = constants.guardianUpdates
        taskModel.detail.code.text = constants.guardianUpdates
        taskModel.detail.description = constants.guardianUpdates

    } else if (taskName === constants.vitals) {
       taskModel.outcomeReference[0].display = constants.vitals
        taskModel.detail.code.coding[0].code = "client-vitals"
        taskModel.detail.code.coding[0].display = constants.vitals
        taskModel.detail.code.text = constants.vitals
        taskModel.detail.description = constants.vitals

    } else if (taskName === constants.womensHealthScreening) {
        taskModel.outcomeReference[0].display = constants.womensHealthScreening
        taskModel.detail.code.coding[0].code = "client-womens-health-screening"
        taskModel.detail.code.coding[0].display = constants.womensHealthScreening
        taskModel.detail.code.text = constants.womensHealthScreening
        taskModel.detail.description = constants.womensHealthScreening

    } else if (taskName === constants.clinicalRegistration) {
        taskModel.outcomeReference[0].display = constants.clinicalRegistration
        taskModel.detail.code.coding[0].code = "art-client-clinical-registration"
        taskModel.detail.code.coding[0].display = constants.clinicalRegistration
        taskModel.detail.code.text = constants.clinicalRegistration
        taskModel.detail.description = constants.clinicalRegistration

       
    } else if (taskName === constants.tbHistoryAndRegimen) {
        taskModel.outcomeReference[0].display = constants.tbHistoryAndRegimen
        taskModel.detail.code.coding[0].code = "art-client-tb-history-and-regimen"
        taskModel.detail.code.coding[0].display = constants.tbHistoryAndRegimen
        taskModel.detail.code.text = constants.tbHistoryAndRegimen
        taskModel.detail.description = constants.tbHistoryAndRegimen
    }

    return taskModel
}
