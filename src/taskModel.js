
module.exports = function createTaskModel(taskName) {
    let taskModel = {
        "outcomeReference": [
            {
                "reference": "",
                "display": "TB/COVID Screening"
            }
        ],
        "detail": {
            "kind": "Task",
            "code": {
                "coding": [
                    {
                        "system": "https://d-tree.org",
                        "code": "client-tb-covid-screening",
                        "display": "TB/COVID Screening"
                    }
                ],
                "text": "TB/COVID Screening"
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
            "description": "TB/COVID Screening"
        }
    }


    if (taskName === "TB/COVID Screening") {
        taskModel.outcomeReference[0].display = "TB/COVID Screening"
        taskModel.detail.code.coding[0].code = "client-tb-covid-screening"
        taskModel.detail.code.coding[0].display = "TB/COVID Screening"
        taskModel.detail.code.text = "TB/COVID Screening"
        taskModel.detail.description = "TB/COVID Screening"

    } else if (taskName === "Demographic Updates") {
        taskModel.outcomeReference[0].display = "Demographic Updates"
        taskModel.detail.code.coding[0].code = "patient-demographic-updates"
        taskModel.detail.code.coding[0].display = "Demographic Updates"
        taskModel.detail.code.text = "Demographic Updates"
        taskModel.detail.description = "Demographic Updates"

    } else if (taskName === "Guardian Updates") {
        taskModel.outcomeReference[0].display = "Guardian Updates"
        taskModel.detail.code.coding[0].code = "patient-guardian-updates"
        taskModel.detail.code.coding[0].display = "Guardian Updates"
        taskModel.detail.code.text = "Guardian Updates"
        taskModel.detail.description = "Guardian Updates"

    } else if (taskName === "Vitals") {
       taskModel.outcomeReference[0].display = "Vitals"
        taskModel.detail.code.coding[0].code = "client-vitals"
        taskModel.detail.code.coding[0].display = "Vitals"
        taskModel.detail.code.text = "Vitals"
        taskModel.detail.description = "Vitals"

    } else if (taskName === "Women's Health Screening") {
        taskModel.outcomeReference[0].display = "Women's Health Screening"
        taskModel.detail.code.coding[0].code = "client-womens-health-screening"
        taskModel.detail.code.coding[0].display = "Women's Health Screening"
        taskModel.detail.code.text = "Women's Health Screening"
        taskModel.detail.description = "Women's Health Screening"

    } else if (taskName === "Clinical Registration") {
        taskModel.outcomeReference[0].display = "Clinical Registration"
        taskModel.detail.code.coding[0].code = "art-client-clinical-registration"
        taskModel.detail.code.coding[0].display = "Clinical Registration"
        taskModel.detail.code.text = "Clinical Registration"
        taskModel.detail.description = "Clinical Registration"

       
    } else if (taskName === "TB History, Regimen and Next Appointment") {
        taskModel.outcomeReference[0].display = "TB History, Regimen and Next Appointment"
        taskModel.detail.code.coding[0].code = " client-tb-history-regimen-and-next-appointment"
        taskModel.detail.code.coding[0].display = "TB History, Regimen and Next Appointment"
        taskModel.detail.code.text = "TB History, Regimen and Next Appointment"
        taskModel.detail.description = "TB History, Regimen and Next Appointment"
    }

    return taskModel
}
