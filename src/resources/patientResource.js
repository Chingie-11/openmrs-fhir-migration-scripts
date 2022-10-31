//This function takes in parameters of a patient and returns a patient resource
module.exports = function createPatient(identifier, family, given, telecom, gender, birthDate, city, district, organisationID){
    const data = {
        "resourceType": "Patient",
        "meta": {
            "tag": [
                {
                    "system": "https://d-tree.org",
                    "code": "client-already-on-art"
                }
            ]
        },
        "identifier": [
            {
                "value": identifier,
                "use": "official"
            }
        ],

        "active": true,
        "name": [
            {
                "use": "official",
                "family": family,
                "given": given
            }
        ],
        "telecom": [{
            "system": "phone",
            "value": telecom,
            "use": "home"
        }],
        "gender": gender.toLowerCase(),
        "birthDate": birthDate,
        "address": [{
            "state":"tracingCatchment",
            "text":"physicalLocator",
            "use": "home",
            "type": "physical",
            "city": city,
            "district": district,
            "country": "Malawi"
        }],
        "managingOrganization": {
            "reference": "Organization/" + organisationID
        },
        "generalPractitioner": [{
            "reference": "Practitioner/649b723c-28f3-4f5f-8fcf-28405b57a1ec"
        }]

    };

    return data
}