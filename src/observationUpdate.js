require('dotenv').config()
const csv = require('csvtojson');
const path = require("path");
const fs = require("fs");
const axios = require("axios").default;
const oauth = require('axios-oauth-client');
const util = require("util")

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

                "resourceType": "Observation",
                "id": "4",
                "status": "final",
                "code": {
                    "coding": [
                        {
                            "system": "http://lonic.org",
                            "code": "15074-8",
                            "display": Patient.lab_order
                        }
                    ]
                },
                "subject": {
                    "reference": "Patient/" + patient.person_id,
                    //"display": patient.firstname
                },
                "valueQuantity": {
                    "value": patient.value_numberic,
                    "unit": "mol/L",
                    "system": "https://www.d-tree.org/",
                    "code": "mol/L"
                },
                "method": {
                    "code": "15074-8",
                    "text": patient.test_type
                }


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
            "id":"observation-transaction",
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

main();

