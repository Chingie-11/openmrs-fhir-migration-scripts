require('dotenv').config()
const csv = require('csvtojson');
const path = require("path");
const fs = require("fs");
const axios = require("axios").default;
const oauth = require('axios-oauth-client');
const util = require("util")


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
        const patients = [];
        json.forEach(patient => {
            const data = {
                "resourceType": "Task",
                "identifier": [
                    {
                        "use": "official",
                        "value": Math.random().toString(36).substring(2,9)
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
                    "start": Date.now,
                    "end": setDate(Date.now + 14)
                },
                "authoredOn": Date.now,
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

            patients.push({
                resource: data, "request": {
                    "method": "POST",
                    "url": "Task/"
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
            tasks = response.data.id;
            console.log.tasks;
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
            const data = {
                "resourceType": "CarePlan",
                "id": "bc06808c-73b0-4bc9-9ee6-1dc4a73247ce",
                "identifier": [
                    {
                        "use": "official",
                        "value": "//to-do"
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
                    "start": Date.now,
                    "end": setDate(Date.now + 14)
                },
                "created": Date.now,
                "author": {
                    "reference": "Practitioner/649b723c-28f3-4f5f-8fcf-28405b57a1ec",
                    "display": "Test CHW"
                },
                "activity": [
                    {
                        "outcomeReference": [
                            {
                                "reference": "Task/7123f0b9-fd3d-4839-b1ac-a393eca92653",
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
                                "start": "2022-05-19T05:22:49+02:00",
                                "end": "2022-06-02T05:22:49+02:00"
                            },
                            "performer": [
                                {
                                    "reference": "Practitioner/649b723c-28f3-4f5f-8fcf-28405b57a1ec",
                                    "display": "Test CHW"
                                }
                            ],
                            "description": "Vitals"
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


