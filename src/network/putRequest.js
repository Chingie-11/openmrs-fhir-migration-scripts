//This function takes in a Bundle and authentication info as pparameters and returns the Bundle response
const axios = require("axios").default;
module.exports = async function postRequest(data, auth, identifier) {

    
   return await axios.put(process.env.FHIR_BASEURL + "CarePlan/"+ identifier, data, {
        headers: {
            "Authorization": `${auth.token_type} ${auth.access_token}`,
            "Content-Type": "application/json"
        }

    });

}
