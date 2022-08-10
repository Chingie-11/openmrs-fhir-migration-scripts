require('dotenv').config()
const csv = require('csvtojson');
const path = require("path");
const fs = require("fs");
const axios = require("axios").default;
const oauth = require('axios-oauth-client');
const util = require("util")
const dayjs = require('dayjs')

let tasks = {};

async function createTask() {
    const getAuthorizationCode = oauth.client(axios.create(), {
        url: process.env.FHIR_TOKEN_URL,
        grant_type: process.env.FHIR_GRANT,
        client_id: process.env.FHIR_CLIENT_ID,
        client_secret: process.env.FHIR_SECRET,
        username: process.env.FHIR_USERNAME,
        password: process.env.FHIR_PASSWORD,
        scope: process.env.FHIR_SCROPE
    });

    const auth = await getAuthorizationCode();
    console.log(auth);
    csv().fromFile(path.join(__dirname, "./assets/csv/minidump.csv")).then(async (json) => {
        const tasks = [];
        let dateNow = new Date();
        let today = dayjs(Date.now())
        let dateEnd = today.add(14, "day").format();
        json.forEach(patient => {

            const tbCovid = {
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
                    "reference": "Patient/" + patient.identifier,
                    "display": patient.given + patient.family
                },
                "executionPeriod": {
                    "start": dateNow.toISOString(),
                    "end": patient.nextAppointment
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

            const demographicUpdates = {
                "resourceType": "Task",
                "meta": {
                    "tag": [
                        {
                            "system": "https://d-tree.org",
                            "code": "guardian-visit"
                        },
                        {
                            "system": "https://d-tree.org",
                            "code": "clinic-visit-task-order-2"
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
                "description": "Demographic Updates",
                "for": {
                    "reference": "Patient/" + patient.identifier,
                    "display": patient.given + patient.family
                },
                "executionPeriod": {
                    "start": dateNow.toISOString(),
                    "end": patient.nextAppointment 
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
                    "reference": "Questionnaire/patient-demographic-updates",
                    "display": "Demographic Updates"
                }
            };

            const guardianUpdates = {
                "resourceType": "Task",
                "meta": {
                    "tag": [
                        {
                            "system": "https://d-tree.org",
                            "code": "guardian-visit"
                        },
                        {
                            "system": "https://d-tree.org",
                            "code": "clinic-visit-task-order-3"
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
                "description": "Guardian Updates",
                "for": {
                    "reference": "Patient/" + patient.identifier,
                    "display": patient.given + patient.family
                },
                "executionPeriod": {
                    "start": dateNow.toISOString(),
                    "end": patient.nextAppointment 
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
                    "reference": "Questionnaire/patient-guardian-updates-0-to-15-years",
                    "display": "Guardian Updates"
                }
            };

            const vitals = {
                "resourceType": "Task",
                "meta": {
                    "tag": [
                        {
                            "system": "https://d-tree.org",
                            "code": "clinic-visit-task-order-4"
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
                "description": "Vitals",
                "for": {
                    "reference": "Patient/" + patient.identifier,
                    "display": patient.given + patient.family
                },
                "executionPeriod": {
                    "start": dateNow.toISOString(),
                    "end": patient.nextAppointment 
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
                    "reference": "Questionnaire/art-client-vitals-male-15-years-plus",
                    "display": "Vitals"
                }
            };

            const womenHealth = {
                "resourceType": "Task",
                "meta": {
                    "tag": [
                        {
                            "system": "https://d-tree.org",
                            "code": "clinic-visit-task-order-5"
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
                "description": "Women's Health Screening",
                "for": {
                    "reference": "Patient/" + patient.identifier,
                    "display": patient.given + patient.family
                },
                "executionPeriod": {
                    "start": dateNow.toISOString(),
                    "end": patient.nextAppointment 
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
                    "reference": "Questionnaire/art-client-womens-health-screening-female-9-years-plus",
                    "display": "Women's Health Screening"
                }
            };

            const clinicalReg = {
                "resourceType": "Task",
                "meta": {
                    "tag": [
                        {
                            "system": "https://d-tree.org",
                            "code": "clinic-visit-task-order-6"
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
                "description": "Clinical Registration",
                "for": {
                    "reference": "Patient/" + patient.identifier,
                    "display": patient.given + patient.family
                },
                "executionPeriod": {
                    "start": dateNow.toISOString(),
                    "end": patient.nextAppointment
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
                    "reference": "Questionnaire/art-client-clinical-registration",
                    "display": "Clinical Registration"
                }
            };

            const nextAppointment = {
                "resourceType": "Task",
                "meta": {
                    "tag": [
                        {
                            "system": "https://d-tree.org",
                            "code": "guardian-visit"
                        },
                        {
                            "system": "https://d-tree.org",
                            "code": "clinic-visit-task-order-7"
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
                "description": "TB History, Regimen and Next Appointment",
                "for": {
                    "reference": "Patient/" + patient.identifier,
                    "display": patient.given + patient.family
                },
                "executionPeriod": {
                    "start": dateNow.toISOString(),
                    "end": patient.nextAppointment 
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
                    "reference": "Questionnaire/art-client-tb-history-regimen-and-next-appointment-routine",
                    "display": "TB History, Regimen and Next Appointment"
                }
            };

            const currentDate = dayjs(Date.now())
            const dateThen = dayjs(patient.birthDate)
            let yearsDiff = currentDate.diff(dateThen, 'year')
            let monthsDiff = currentDate.diff(dateThen, 'month')
            if (patient.gender !== "male") {
               

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

                } else if (yearsDiff < 14 && yearsDiff >= 13) {
                    womenHealth.reasonReference.reference = "Questionnaire/art-client-womens-health-screening-female-9-to-14-years"
                    vitals.reasonReference.reference = "Questionnaire/art-client-vitals-13-to-15-years"

                } else if (yearsDiff < 15 && yearsDiff >= 14) {
                    vitals.reasonReference.reference = "Questionnaire/art-client-vitals-13-to-15-years"

                } else if (yearsDiff < 25 && yearsDiff >= 15) {


                    womenHealth.reasonReference.reference = "Questionnaire/art-client-womens-health-screening-female-15-to-25-years"
                    vitals.reasonReference.reference = "Questionnaire/art-client-vitals-female-15-to-30-years"
                    guardianUpdates.reasonReference.reference = "Questionnaire/patient-guardian-updates-15-years-plus"

                } else if (yearsDiff < 30 && yearsDiff >= 25) {


                    womenHealth.reasonReference.reference = "Questionnaire/art-client-womens-health-screening-female-25-years-plus"
                    vitals.reasonReference.reference = "Questionnaire/art-client-vitals-female-15-to-30-years"
                    guardianUpdates.reasonReference.reference = "Questionnaire/patient-guardian-updates-15-years-plus"

                } else if (yearsDiff < 40 && yearsDiff >= 30) {
                    womenHealth.reasonReference.reference = "Questionnaire/art-client-womens-health-screening-female-25-years-plus"
                    vitals.reasonReference.reference = "Questionnaire/art-client-vitals-female-30-to-40-years"
                    guardianUpdates.reasonReference.reference = "Questionnaire/patient-guardian-updates-15-years-plus"

                } else if (yearsDiff >= 40) {
                    womenHealth.reasonReference.reference = "Questionnaire/art-client-womens-health-screening-female-25-years-plus"
                    vitals.reasonReference.reference = "Questionnaire/art-client-vitals-female-40-years-plus"
                    guardianUpdates.reasonReference.reference = "Questionnaire/patient-guardian-updates-15-years-plus"
                }

                tasks.push({
                    resource: womenHealth, "request": {
                        "method": "POST",
                        "url": "Task/"
                    }
                });

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








            tasks.push(
                {
                    resource: demographicUpdates, "request": {
                        "method": "POST",
                        "url": "Task/"
                    }
                },
                {
                    resource: guardianUpdates, "request": {
                        "method": "POST",
                        "url": "Task/"
                    }
                },
                {
                    resource: tbCovid, "request": {
                        "method": "POST",
                        "url": "Task/"
                    }
                },

                {
                    resource: clinicalReg, "request": {
                        "method": "POST",
                        "url": "Task/"
                    }
                },
                {
                    resource: vitals, "request": {
                        "method": "POST",
                        "url": "Task/"
                    }
                },
                {
                    resource: nextAppointment, "request": {
                        "method": "POST",
                        "url": "Task/"
                    }
                }

            );
        });
        fs.writeFileSync(path.join(__dirname, "./assets/generated/output.json"), JSON.stringify(tasks))
        const constructedData = {
            "resourceType": "Bundle",
            "type": "transaction",
            "entry": [
                ...tasks
            ]
        }
        try {

            const response = await axios.post(process.env.FHIR_BASEURL, constructedData, {
                headers: {
                    "Authorization": `${auth.token_type} ${auth.access_token}`,
                    "Content-Type": "application/json"
                }
            });
            console.log(response.data);

            const taskDataRequest = {
                "resourceType": "Bundle",
                "type": "transaction",
                "entry": response.data.entry.map(x => ({
                    "request": {
                        "method": "GET",
                        "url": x.response.location
                    }
                }))
            }

            console.log(taskDataRequest)



            const bundleResponse = await axios.post(process.env.FHIR_BASEURL, taskDataRequest, {
                headers: {
                    "Authorization": `${auth.token_type} ${auth.access_token}`,
                    "Content-Type": "application/json"
                }
            });
            console.log((bundleResponse).data);


            const userTasks = {}
            bundleResponse.data.entry.forEach(task => {
                const user = userTasks[task.resource.for.reference.split("/")[1]]
                const newUserTask = {
                    taskId: task.resource.id,
                    taskType: task.resource.description,
                    userName: task.resource.for.display,
                    appointmentDate: task.resource.executionPeriod.end,
                    currentDate: task.resource.executionPeriod.start
                }
                if (user === undefined || user === null) {
                    userTasks[task.resource.for.reference.split("/")[1]] = [newUserTask]
                } else {
                    user.push(newUserTask)
                    userTasks[task.resource.for.reference.split("/")[1]] = user
                }
            });


            const taskModel = {


                "TB/COVID Screening": {
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
                },
                "Demographic Updates": {
                    "outcomeReference": [
                        {
                            "reference": "",
                            "display": "Demographic Updates"
                        }
                    ],
                    "detail": {
                        "kind": "Task",
                        "code": {
                            "coding": [
                                {
                                    "system": "https://d-tree.org",
                                    "code": "patient-demographic-updates",
                                    "display": "Demographic Updates"
                                }
                            ],
                            "text": "Demographic Updates"
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
                        "description": "Demographic Updates"
                    }
                },
                "Guardian Updates": {
                    "outcomeReference": [
                        {
                            "reference": "",
                            "display": "Guardian Updates"
                        }
                    ],
                    "detail": {
                        "kind": "Task",
                        "code": {
                            "coding": [
                                {
                                    "system": "https://d-tree.org",
                                    "code": "patient-guardian-updates",
                                    "display": "Guardian Updates"
                                }
                            ],
                            "text": "Guardian Updates"
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
                        "description": "Guardian Updates"
                    }
                },
                "Vitals": {
                    "outcomeReference": [
                        {
                            "reference": "",
                            "display": "Vitals"
                        }
                    ],
                    "detail": {
                        "kind": "Task",
                        "code": {
                            "coding": [
                                {
                                    "system": "https://d-tree.org",
                                    "code": "client-vitals",
                                    "display": "Vitals"
                                }
                            ],
                            "text": "Vitals"
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
                        "description": "Vitals"
                    }
                },
                "Clinical Registration": {
                    "outcomeReference": [
                        {
                            "reference": "",
                            "display": "Clinical Registration"
                        }
                    ],
                    "detail": {
                        "kind": "Task",
                        "code": {
                            "coding": [
                                {
                                    "system": "https://d-tree.org",
                                    "code": "art-client-clinical-registration",
                                    "display": "Clinical Registration"
                                }
                            ],
                            "text": "Clinical Registration"
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
                        "description": "Clinical Registration"
                    }
                },
                "TB History, Regimen and Next Appointment": {
                    "outcomeReference": [
                        {
                            "reference": "",
                            "display": "TB History, Regimen and Next Appointment"
                        }
                    ],
                    "detail": {
                        "kind": "Task",
                        "code": {
                            "coding": [
                                {
                                    "system": "https://d-tree.org",
                                    "code": "client-tb-history-regimen-and-next-appointment",
                                    "display": "TB History, Regimen and Next Appointment"
                                }
                            ],
                            "text": "TB History, Regimen and Next Appointment"
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
                        "description": "TB History, Regimen and Next Appointment"
                    }
                },
                "Women's Health Screening": {
                    "outcomeReference": [
                        {
                            "reference": "",
                            "display": "Women's Health Screening"
                        }
                    ],
                    "detail": {
                        "kind": "Task",
                        "code": {
                            "coding": [
                                {
                                    "system": "https://d-tree.org",
                                    "code": "client-womens-health-screening",
                                    "display": "Women's Health Screening"
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
                        "description": "Women's Health Screening"
                    }
                }

            };

            const CarePlans = []
            Object.keys(userTasks).forEach(patientid => {
                const tasks = userTasks[patientid]
                CarePlans.push({
                    resource: {
                        "resourceType": "CarePlan",
                        "identifier": [
                            {
                                "use": "official",
                                "value": Math.random().toString(36).substring(2, 9)
                            }
                        ],
                        "status": "active",
                        "intent": "plan",
                        "title": "ART Client Visit",
                        "subject": tasks.map(x => ({     
                            "reference": "Patient/" + patientid,
                            "display": x.userName })) ,
                        "period":  tasks.map(x => ({     
                            "start": dateNow.toISOString(),
                            "end": x.appointmentDate })),
                        "created": dateNow.toISOString(),
                        "author": {
                            "reference": "Practitioner/649b723c-28f3-4f5f-8fcf-28405b57a1ec",
                            "display": "Test CHW"
                        },
                        activity: tasks.map(task => {
                            const model = JSON.parse(JSON.stringify(taskModel[task.taskType]))
                            
                            model.outcomeReference[0] = { reference: "Task/" + task.taskId, display: task.taskType }
                            model.detail.scheduledPeriod.end = task.appointmentDate

                            return model
                        })
                    },
                    "request": {
                        "method": "POST",
                        "url": "CarePlan/"
                    }
                })
            });


            const constructedCarePlan = {
                "resourceType": "Bundle",
                "type": "transaction",
                "entry": [
                    ...CarePlans
                ]
            }

            const carePlanResponse = await axios.post(process.env.FHIR_BASEURL, constructedCarePlan, {
                headers: {
                    "Authorization": `${auth.token_type} ${auth.access_token}`,
                    "Content-Type": "application/json"
                }
            });
            console.log((carePlanResponse).data);



        } catch (error) {
            console.log(util.inspect(error, { showHidden: false, depth: null, colors: true }));
        }

    }).catch((err) => {
        console.log(err);
    });



}

async function main() {
    const getAuthorizationCode = oauth.client(axios.create(), {
        url: process.env.FHIR_TOKEN_URL,
        grant_type: process.env.FHIR_GRANT,
        client_id: process.env.FHIR_CLIENT_ID,
        client_secret: process.env.FHIR_SECRET,
        username: process.env.FHIR_USERNAME,
        password: process.env.FHIR_PASSWORD,
        scope: process.env.FHIR_SCROPE
    });
    const auth = await getAuthorizationCode();
    console.log(auth);
    csv().fromFile(path.join(__dirname, "./assets/csv/minidump.csv")).then(async (json) => {
        const patients = [];
        json.forEach(patient => {
            const taskModel = {
                "resourceType": "CarePlan",
                "id": "116ed6df-9bc6-44f2-9b2c-5ea5fac02b65",
                "identifier": [
                    {
                        "use": "official",
                        "value": "bbea690b-53ce-448d-880e-4f287fe7f095"
                    }
                ],
                "status": "active",
                "intent": "plan",
                "title": "ART Client Visit",
                "subject": {
                    "reference": "Patient/" + patient.identifier,
                    "display": patient.given + patient.family
                },
                "period": {
                    "start": dateNow.toISOString(),
                    "end": dateEnd,
                },
                "created": dateNow.toISOString(),
                "author": {
                    "reference": "Practitioner/649b723c-28f3-4f5f-8fcf-28405b57a1ec",
                    "display": "Test CHW"
                },
                "activity": [
                    {
                        "outcomeReference": [
                            {
                                "reference": "Task/1fbb36f4-3912-42ea-b4a2-474dd7c916fb",
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
                                "end": dateEnd
                            },
                            "performer": [
                                {
                                    "reference": "Practitioner/649b723c-28f3-4f5f-8fcf-28405b57a1ec",
                                    "display": "Test CHW"
                                }
                            ],
                            "description": "TB/COVID Screening"
                        }
                    },
                    {
                        "outcomeReference": [
                            {
                                "reference": "Task/3b67efc1-942d-444c-a0ce-2d6b90b60da4",
                                "display": "Demographic Updates"
                            }
                        ],
                        "detail": {
                            "kind": "Task",
                            "code": {
                                "coding": [
                                    {
                                        "system": "https://d-tree.org",
                                        "code": "patient-demographic-updates",
                                        "display": "Demographic Updates"
                                    }
                                ],
                                "text": "Demographic Updates"
                            },
                            "status": "in-progress",
                            "scheduledPeriod": {
                                "start": dateNow.toISOString(),
                                "end": dateEnd
                            },
                            "performer": [
                                {
                                    "reference": "Practitioner/649b723c-28f3-4f5f-8fcf-28405b57a1ec",
                                    "display": "Test CHW"
                                }
                            ],
                            "description": "Demographic Updates"
                        }
                    },
                    {
                        "outcomeReference": [
                            {
                                "reference": "Task/32eaf9bb-fc7c-496f-ad41-3963450ee3ce",
                                "display": "Guardian Updates"
                            }
                        ],
                        "detail": {
                            "kind": "Task",
                            "code": {
                                "coding": [
                                    {
                                        "system": "https://d-tree.org",
                                        "code": "patient-guardian-updates",
                                        "display": "Guardian Updates"
                                    }
                                ],
                                "text": "Guardian Updates"
                            },
                            "status": "in-progress",
                            "scheduledPeriod": {
                                "start": dateNow.toISOString(),
                                "end": dateEnd
                            },
                            "performer": [
                                {
                                    "reference": "Practitioner/649b723c-28f3-4f5f-8fcf-28405b57a1ec",
                                    "display": "Test CHW"
                                }
                            ],
                            "description": "Guardian Updates"
                        }
                    },
                    {
                        "outcomeReference": [
                            {
                                "reference": "Task/d4883442-9b83-47cf-a8dc-97a969859a9c",
                                "display": "Vitals"
                            }
                        ],
                        "detail": {
                            "kind": "Task",
                            "code": {
                                "coding": [
                                    {
                                        "system": "https://d-tree.org",
                                        "code": "client-vitals",
                                        "display": "Vitals"
                                    }
                                ],
                                "text": "Vitals"
                            },
                            "status": "in-progress",
                            "scheduledPeriod": {
                                "start": dateNow.toISOString(),
                                "end": dateEnd
                            },
                            "performer": [
                                {
                                    "reference": "Practitioner/649b723c-28f3-4f5f-8fcf-28405b57a1ec",
                                    "display": "Test CHW"
                                }
                            ],
                            "description": "Vitals"
                        }
                    },
                    {
                        "outcomeReference": [
                            {
                                "reference": "Task/354efa71-2753-4bb3-bbde-bb9360232412",
                                "display": "Clinical Registration"
                            }
                        ],
                        "detail": {
                            "kind": "Task",
                            "code": {
                                "coding": [
                                    {
                                        "system": "https://d-tree.org",
                                        "code": "art-client-clinical-registration",
                                        "display": "Clinical Registration"
                                    }
                                ],
                                "text": "Clinical Registration"
                            },
                            "status": "in-progress",
                            "scheduledPeriod": {
                                "start": dateNow.toISOString(),
                                "end": dateEnd
                            },
                            "performer": [
                                {
                                    "reference": "Practitioner/649b723c-28f3-4f5f-8fcf-28405b57a1ec",
                                    "display": "Test CHW"
                                }
                            ],
                            "description": "Clinical Registration"
                        }
                    },
                    {
                        "outcomeReference": [
                            {
                                "reference": "Task/5eb1ef65-13ed-4845-9431-528798e12669",
                                "display": "TB History, Regimen and Next Appointment"
                            }
                        ],
                        "detail": {
                            "kind": "Task",
                            "code": {
                                "coding": [
                                    {
                                        "system": "https://d-tree.org",
                                        "code": "client-tb-history-regimen-and-next-appointment",
                                        "display": "TB History, Regimen and Next Appointment"
                                    }
                                ],
                                "text": "TB History, Regimen and Next Appointment"
                            },
                            "status": "in-progress",
                            "scheduledPeriod": {
                                "start": dateNow.toISOString(),
                                "end": dateEnd
                            },
                            "performer": [
                                {
                                    "reference": "Practitioner/649b723c-28f3-4f5f-8fcf-28405b57a1ec",
                                    "display": "Test CHW"
                                }
                            ],
                            "description": "TB History, Regimen and Next Appointment"
                        }
                    }
                ]
            };

            patients.push({
                resource: data, "request": {
                    "method": "PUT",
                    "url": "Patient/?identifier=" + patient.identifier
                }
            });
        });
        fs.writeFileSync(path.join(__dirname, "./assets/generated/output.json"), JSON.stringify(patients))
        const constructedData = {
            "resourceType": "Bundle",
            "type": "transaction",
            "entry": [
                ...patients
            ]
        }
        try {
            const response = await axios.post(process.env.FHIR_BASEURL, constructedData, {
                headers: {
                    "Authorization": `${auth.token_type} ${auth.access_token}`,
                    "Content-Type": "application/json"
                }
            });
            console.log(response.data);
        } catch (error) {
            console.log(util.inspect(error, { showHidden: false, depth: null, colors: true }));
        }

    }).catch((err) => {
        console.log(err);
    });

}

createTask();


