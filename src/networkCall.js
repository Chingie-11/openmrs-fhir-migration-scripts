const axios = require("axios").default;
module.exports = async function networkCall(data, auth) {

    
   return await axios.post(process.env.FHIR_BASEURL, data, {
        headers: {
            "Authorization": `${auth.token_type} ${auth.access_token}`,
            "Content-Type": "application/json"
        }

    });

}
