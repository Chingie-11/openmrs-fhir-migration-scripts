require('dotenv').config()
const csv = require('csvtojson');
const path = require("path");
const fs = require("fs");
const axios = require("axios").default;
const oauth = require('axios-oauth-client');
const util = require("util")
const getAuthCode = require("./network/auth")
const constructBundle = require("./constructBundle")
const postRequest = require("./network/postRequest")
const createPatient = require ("./resources/patientResource")

async function main() {
    const auth = await getAuthCode();

    console.log(auth);
    csv().fromFile(path.join(__dirname, "./assets/csv/minidump.csv")).then(async (json) => {
        const patients = [];
        json.forEach(patient => {
            const data = createPatient(patient.identifier,patient.family,patient.given,patient.telecom, patient.gender, patient.birthDate, patient.city, patient.district,10374)

            patients.push({
                resource: data, "request": {
                    "method": "PUT", 
                    "url": "Patient/?identifier=" + patient.identifier
                }
            });
        });
        fs.writeFileSync(path.join(__dirname, "./assets/generated/output.json"), JSON.stringify(patients))
        const constructedData = constructBundle(patients)
        try {
            const response = postRequest(constructedData)
            console.log(response.data);
            
        } catch (error) {
            console.log(util.inspect(error, { showHidden: false, depth: null, colors: true }));
        }

    }).catch((err) => {
        console.log(err);
    });

}

main();

