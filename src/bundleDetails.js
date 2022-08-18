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