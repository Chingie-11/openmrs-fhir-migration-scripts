##Introduction
This application was created to convert extrated patients from the electronic medical records system (EMRs) to the Hapi-Server.
 
##Features
- Auth2 authentication
- CSV to JSON conversion
- Patient resource creation
- Task resource creation
- Careplan resource creation
- Linkage between a client's resources

##Quick start
To clone and run this application, you'll need Git and Node.js (which comes with npm) installed on your computer.
From your command line:
    #Clone this repository
    git clone https://github.com/d-tree-org/openmrs-fhir-migration-scripts

    #Go into the repository
    cd openmrs-fhir-migration-scripts

    #Install dependencies
    npm install

    #run the app
    npm start

Create a .env file with the following key=value pairs then replace the values with your environments details:
FHIR_TOKEN_URL="token"
FHIR_GRANT="password"
FHIR_CLIENT_ID="client-id"
FHIR_SECRET= xxxxxxxxxxxxx
FHIR_USERNAME="usernme"
FHIR_PASSWORD="user-password"
FHIR_SCROPE="openid"
FHIR_BASEURL = "server-base-url"

##Resources
https://build.fhir.org/resourcelist.html
    https://build.fhir.org/patient.html
    https://build.fhir.org/bundle.html
    https://build.fhir.org/task.html
    https://build.fhir.org/careteam.html
    https://build.fhir.org/organization.html


##Authors/Team
D-Tree Tech Team
See the list of contributors who participated in this project from the [Contributors](http://https://github.com/d-tree-org/openmrs-fhir-migration-scripts/graphs/contributors "Contributors")  link

#Support
Email: mailto:techteam@d-tree.org Slack workspace: [d-tree-team.slack.com](http://d-tree-team.slack.com "d-tree-team.slack.com")
