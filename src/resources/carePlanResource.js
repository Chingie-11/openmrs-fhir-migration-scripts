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
        "title": "ART Client Visit",
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
            const model = JSON.parse(JSON.stringify(activityDetail[task.taskType]))

            model.outcomeReference[0] = { reference: "Task/" + task.taskId, display: task.taskType }
            model.detail.scheduledPeriod.end = task.appointmentDate

            return model
        })
    }

    return data
}