/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */


(function () {
    "use strict";

    angular
        .module("TracsClient.factories")
        .factory("DiagnosisFactory", DiagnosisFactory);

    DiagnosisFactory.$inject = ["$http", "$log", "storage", "EnvironmentConfig"];

    function DiagnosisFactory($http, $log, storage, EnvironmentConfig) {

        var DiagnosisEndpoint = EnvironmentConfig.api + "/diagnosis";

        var service = {

            addDiagnosisMedication: addDiagnosisMedication,
            getDiagnosisMedication: getDiagnosisMedication

        };

        return service;

        /**
         * Recupera los medicamentos de un diagnostico
         * @param   {number}  userId el id del usuario
         * @returns {promise} una promesa con todos los pacientes del usuario
         */
        function getDiagnosisMedication(diagnosisId) {

            return $http.get(DiagnosisEndpoint + "/" + diagnosisId).then(function (result) {
                return result.data;
            }, function (error) {
                $log.error("Ocurrió un error al recuperar los medicamentos para el diagnositoc " + diagnosisId, error);
                return error;
            });
        }

        function addDiagnosisMedication(newMedication, diagnosisId) {
            console.log(diagnosisId);

            return $http.put(DiagnosisEndpoint + "/addDiagnosisMedication/" + diagnosisId, newMedication).then(function (result) {

                console.log(result);
                return result.data;
            }, function (error) {
                $log.error("Ocurrió un error al agregar un nuevo medicamento al diagnostico" + diagnosisId, error);
                return error;
            });
        }


    }
})();

