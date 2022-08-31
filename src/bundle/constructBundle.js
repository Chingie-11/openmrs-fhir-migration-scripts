//This function takes an array of resources as an input and creates and Bundle with the array and returns the bundle 
module.exports = function constructBundle(resourceArray){ 
 bundle =    {
    "resourceType": "Bundle",
    "type": "transaction",
    "entry": [
        ...resourceArray
    ]
}

return bundle
}
