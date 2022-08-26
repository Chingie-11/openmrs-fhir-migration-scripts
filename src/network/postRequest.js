//This function takes in a Bundle and authentication info as pparameters and returns the Bundle response
const axios = require("axios").default;
module.exports = async function postRequest(data, auth) {

    
   return await axios.post(process.env.FHIR_BASEURL, data, {
        headers: {
            "Authorization": `${auth.token_type} ${auth.access_token}`,
            "Content-Type": "application/json"
        }

    });

}
