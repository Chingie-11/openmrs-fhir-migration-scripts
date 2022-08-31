const  { v4: uuidv4 } = require('uuid');
const constants = require('../constants');

module.exports = function createTask(taskName, userId, userName, nextAppointment) {
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
                "value": uuidv4()
            }
        ],
        "status": "ready",
        "intent": "plan",
        "priority": "routine",
        "description": constants.tbCovideScreen,
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
            "display": constants.tbCovideScreen
        }
    };

    if (taskName === constants.tbCovideScreen) {
        task.description = constants.tbCovideScreen
        task.reasonReference.display = constants.tbCovideScreen
        task.meta.tag[0] = {
            "system": "https://d-tree.org",
            "code": "clinic-visit-task-order-1"
        }
    } else if (taskName === constants.demographicsUpdates) {
        task.description = constants.demographicsUpdates
        task.reasonReference.display = constants.demographicsUpdates
        task.reasonReference.reference = "Questionnaire/patient-demographic-updates"
        task.meta.tag[0] = {
            "system": "https://d-tree.org",
            "code": "clinic-visit-task-order-2"
        }
        task.meta.tag[1] = {
            "system": "https://d-tree.org",
            "code": "guardian-visit"
        }

    } else if (taskName === constants.guardianUpdates) {
        task.description = constants.guardianUpdates
        task.reasonReference.display = constants.guardianUpdates
        task.meta.tag[0] = {
            "system": "https://d-tree.org",
            "code": "clinic-visit-task-order-3"
        }
        task.meta.tag[1] = {
            "system": "https://d-tree.org",
            "code": "guardian-visit"
        }
    } else if (taskName === constants.vitals) {
        task.description = constants.vitals
        task.reasonReference.display = constants.vitals
        task.meta.tag[0] = {
            "system": "https://d-tree.org",
            "code": "clinic-visit-task-order-4"
        }
    } else if (taskName === constants.womenHealth) {
        task.description = constants.womenHealth
        task.reasonReference.display = constants.womenHealth
        task.meta.tag[0] = {
            "system": "https://d-tree.org",
            "code": "clinic-visit-task-order-5"
        }
    } else if (taskName === constants.clinicalRegistration) {
        task.description = constants.clinicalRegistration
        task.reasonReference.reference = "Questionnaire/art-client-clinical-registration"
        task.reasonReference.display = constants.clinicalRegistration
        task.meta.tag[0] = {
            "system": "https://d-tree.org",
            "code": "clinic-visit-task-order-6"
        }
        
    } else if (taskName === constants.tbHistory) {
        task.description = constants.tbHistory
        task.reasonReference.reference = "Questionnaire/art-client-tb-history-regimen-and-next-appointment-routine"
        task.reasonReference.display = constants.tbHistory
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