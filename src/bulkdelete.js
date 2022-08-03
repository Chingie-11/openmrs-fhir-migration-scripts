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
    
        const patients = ["200", "75", "78", "79"];
       
        patients.forEach(element => {
       
            
           try {
            
            const response = await axios.delete("https://fhir-dev.d-tree.org/fhir/Patient/" + element +"/",  {
                headers: {
                    "Authorization": `${auth.token_type} ${auth.access_token}`,
                    "Content-Type": "application/json"
                }
            });
            console.log(response.data);
        } catch (error) {
            console.log(util.inspect(error, { showHidden: false, depth: null, colors: true }));
        }  

        });

    
}

main();

