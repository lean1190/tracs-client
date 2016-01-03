(function () {
    "use strict";

    angular
        .module("TracsClient.factories")
        .factory("PatientFactory", PatientFactory);

    PatientFactory.$inject = ["$resource", "$http", "API_ENDPOINT"];

    function PatientFactory($resource, $http, API_ENDPOINT) {
        // --> PRODUCTION
        //var urlBase = "https://warm-ocean-7615.herokuapp.com",

        console.log(API_ENDPOINT);
        var urlBase = "http://localhost:3000",
            patientCreateEndpoint = urlBase + "/patient";

        var service = {

            createPatient: createPatient

        };

        return service;

        function createPatient (newPatient, creatorId){
            console.log("llegue al createPatient");
            newPatient.admin = creatorId;
            //return newPatient.patientName;
            return $http.post(patientCreateEndpoint+"/", newPatient).then(function(result) {
                return result.data;
            })
        };

    }

})();
