//This function takes in parameters of a patient and returns a patient resource
module.exports = function createPatient(identifier, family, given, telecom, gender, birthDate, city, district ){
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
            "use": "home",
            "type": "physical",
            "city": city,
            "district": district,
            "country": "Malawi"
        }],
        "managingOrganization": {
            "reference": "Organization/10173"
        },
        "generalPractitioner": [{
            "reference": "",
            "type": "Practitioner",
            "identifier": {
                "use": "official",
                "value": "chwtrial123"
            }
        }]

    };

    return data
}