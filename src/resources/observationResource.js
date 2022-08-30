//This function takes in parameters of a patient and returns a patient resource
module.exports = function createObservation(lab_order, person_id, value_numberic, test_type){
    const data = {

        "resourceType": "Observation",
        "id": "4",
        "status": "final",
        "code": {
            "coding": [
                {
                    "system": "http://lonic.org",
                    "code": "15074-8",
                    "display": lab_order
                }
            ]
        },
        "subject": {
            "reference": "Patient/" + person_id,
            //"display": patient.firstname
        },
        "valueQuantity": {
            "value": value_numberic,
            "unit": "mol/L",
            "system": "https://www.d-tree.org/",
            "code": "mol/L"
        },
        "method": {
            "code": "15074-8",
            "text": test_type
        }


    };

    return data
}