(function () {
    "use strict";

    angular
        .module("TracsClient.factories")
        .factory("TreatmentFactory", TreatmentFactory);

    TreatmentFactory.$inject = ["$resource", "$http", "API_ENDPOINT"];

    function TreatmentFactory($resource, $http, API_ENDPOINT) {
        // --> PRODUCTION
        //var urlBase = "https://warm-ocean-7615.herokuapp.com",

        console.log(API_ENDPOINT);
        var urlBase = "http://localhost:9000/#",
            treatmentCreateEndpoint = urlBase + "/treatmentCreate";
            /*schedulesEndpoint = urlBase + "/users/:id/schedule";*/

        var service = {

            newTreatment: newTreatment,
            createTreatment: createTreatment

        };

        return service;

        function newTreatment(creatorId){

            var treatment={};

            treatment.treatmentName="";
            treatment.treatmentDescription = "";
            treatment.patientName ="";
            treatment.patientDateOfBirth ="";
            treatment.patientDescription="";
            treatment.creatorId = creatorId;

            return treatment;
        }

        function createTreatment (newTreatment){
            console.log("llegue al createTreatment");
            //return newTreatment.treatmentName;
            return $http.post(treatmentCreateEndpoint, newTreatment).then(function(result) {
                return result.data;
            });
        }

    }

})();
