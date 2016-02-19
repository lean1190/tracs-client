(function () {
    "use strict";

    angular
        .module("TracsClient.factories")
        .factory("PatientFactory", PatientFactory);

    PatientFactory.$inject = ["$resource", "$http", "EnvironmentConfig"];

    function PatientFactory($resource, $http, EnvironmentConfig) {

        var patientCreateEndpoint = EnvironmentConfig.api + "/patient";

        var service = {

            createPatient: createPatient

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

    }

})();
