const axios = require("axios").default;
const oauth = require('axios-oauth-client');

 module.exports =  function getAuthCode() {
     oauth.client(axios.create(), {
        url: process.env.FHIR_TOKEN_URL,
        grant_type: process.env.FHIR_GRANT,
        client_id: process.env.FHIR_CLIENT_ID,
        client_secret: process.env.FHIR_SECRET,
        username: process.env.FHIR_USERNAME,
        password: process.env.FHIR_PASSWORD,
        scope: process.env.FHIR_SCROPE
    });
    
}


