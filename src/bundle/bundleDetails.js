/*This function gets a Bundle Response as an input and gets each resource's location 
which contains the ID of the resource and puts the locations in another Bundle, sends the Bundle to the server
to get full details of all the resources. It returns a Bundle response with full details of the resources*/ 
module.exports = function getBundleResourceIds(response){
   const details = {
        "resourceType": "Bundle",
        "type": "transaction",
        "entry": response.data.entry.map(x => ({
            "request": {
                "method": "GET",
                "url": x.response.location
            }
        }))
    }
    return details;
}