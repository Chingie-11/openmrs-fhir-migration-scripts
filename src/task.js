
module.exports = function createTasks(taskName, userId, userName, nextAppointment) {
    let dateNow = new Date();
    const task = {
        "resourceType": "Task",
        "meta": {
            "tag": [
                {
                    "system": "https://d-tree.org",
                    "code": "clinic-visit-task-order-1"
                }
            ]
        },
        "identifier": [
            {
                "use": "official",
                "value": Math.random().toString(36).substring(2, 9)
            }
        ],
        "status": "ready",
        "intent": "plan",
        "priority": "routine",
        "description": "TB/COVID Screening",
        "for": {
            "reference": "Patient/" + userId,
            "display": userName
        },
        "executionPeriod": {
            "start": dateNow.toISOString(),
            "end": nextAppointment
        },
        "authoredOn": dateNow.toISOString(),
        "requester": {
            "reference": "Practitioner/649b723c-28f3-4f5f-8fcf-28405b57a1ec",
            "display": "Test CHW"
        },
        "owner": {
            "reference": "Practitioner/649b723c-28f3-4f5f-8fcf-28405b57a1ec",
            "display": "Test CHW"
        },
        "reasonReference": {
            "reference": "Questionnaire/patient-tb-covid",
            "display": "TB/COVID Screening"
        }
    };

    if (taskName === "TB/COVID Screening") {
        task.description = "TB/COVID Screening"
        task.reasonReference.display = "TB/COVID Screening"
        task.meta.tag[0] = {
            "system": "https://d-tree.org",
            "code": "clinic-visit-task-order-1"
        }
    } else if (taskName === "Demographic Updates") {
        task.description = "Demographic Updates"
        task.reasonReference.display = "Demographic Updates"
        task.meta.tag[0] = {
            "system": "https://d-tree.org",
            "code": "clinic-visit-task-order-2"
        }
        task.meta.tag[1] = {
            "system": "https://d-tree.org",
            "code": "guardian-visit"
        }

    } else if (taskName === "Guardian Updates") {
        task.description = "Guardian Updates"
        task.reasonReference.display = "Guardian Updates"
        task.meta.tag[0] = {
            "system": "https://d-tree.org",
            "code": "clinic-visit-task-order-3"
        }
        task.meta.tag[1] = {
            "system": "https://d-tree.org",
            "code": "guardian-visit"
        }
    } else if (taskName === "Vitals") {
        task.description = "Vitals"
        task.reasonReference.display = "Vitals"
        task.meta.tag[0] = {
            "system": "https://d-tree.org",
            "code": "clinic-visit-task-order-4"
        }
    } else if (taskName === "Women's Health Screening") {
        task.description = "Women's Health Screening"
        task.reasonReference.display = "Women's Health Screening"
        task.meta.tag[0] = {
            "system": "https://d-tree.org",
            "code": "clinic-visit-task-order-5"
        }
    } else if (taskName === "Clinical Registration") {
        task.description = "Clinical Registration"
        task.reasonReference.display = "Clinical Registration"
        task.meta.tag[0] = {
            "system": "https://d-tree.org",
            "code": "clinic-visit-task-order-6"
        }
        
    } else if (taskName === "TB History, Regimen and Next Appointment") {
        task.description = "TB History, Regimen and Next Appointment"
        task.reasonReference.display = "TB History, Regimen and Next Appointment"
        task.meta.tag[0] = {
            "system": "https://d-tree.org",
            "code": "clinic-visit-task-order-7"
        }
        task.meta.tag[1] = {
            "system": "https://d-tree.org",
            "code": "guardian-visit"
        }
    }

    return task;
}