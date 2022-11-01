 const  { v4: uuidv4 } = require('uuid');

module.exports = function createCarePlan(patientid,tasks, activityDetail) {
    let dateNow = new Date();
    const data = {
        "resourceType": "CarePlan",
        "identifier": [
            {
                "use": "official",
                "value": uuidv4()
            }
        ],
        "status": "active",
        "intent": "plan",
        "title": "Client Already On ART Visit 1",
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
            const model = activityDetail[task.taskType]
            console.log(model);

            model.outcomeReference[0] = { reference: "Task/" + task.taskId, display: task.taskType }
            model.detail.scheduledPeriod.end = task.appointmentDate
            model.detail.code.coding[0].code = task.questionnaireCode
            return model
        })
    }

    return data
}