(function () {
    "use strict";

    angular
        .module("TracsClient.factories")
        .factory("PatientFactory", PatientFactory);

    PatientFactory.$inject = ["$resource", "$http", "EnvironmentConfig"];

    function PatientFactory($resource, $http, EnvironmentConfig) {

        var patientCreateEndpoint = EnvironmentConfig.api + "/patient";
        var patientGetEndpoint = EnvironmentConfig.api + "/patient";

        var service = {

            createPatient: createPatient,
            getPatients: getPatients

        };

        return service;

        function createPatient (newPatient, creatorId){

            console.log("llegue al createPatient");
            newPatient.admin = creatorId;
            //return newPatient.patientName;
            console.log(newPatient);
            return $http.post(patientCreateEndpoint+"/", newPatient).then(function(result) {
                return result.data;
            });
        }

        function getPatients (userId){
            console.log("llegue al getPatients");
            console.log(userId);
            return $http.get(patientGetEndpoint + "/" + userId).then(function(result){
                console.log(result.data);
                return result.data;
            })
        }

    }

})();
