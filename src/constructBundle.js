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
