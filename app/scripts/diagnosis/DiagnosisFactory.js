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

            getDiagnosis: getDiagnosis,
            getDiagnosisMedication: getDiagnosisMedication,
            addDiagnosisMedication: addDiagnosisMedication,
            deleteDiagnosisMedication: deleteDiagnosisMedication,
            updateDiagnosis: updateDiagnosis

        };

        return service;

        /**
         * Recupera la informacion de un diagnostico
         * @param   {number} diagnosisId id del diagnostico a buscar
         * @returns {promise} una promesa con la informacion del diagnostico
         */
        function getDiagnosis(diagnosisId) {

            return $http.get(DiagnosisEndpoint + "/" + diagnosisId).then(function (result) {
                return result.data;
            }, function (error) {
                $log.error("Ocurrió un error al recuperar el diagnóstico con id " + diagnosisId, error);
                return error;
            });
        }

        /**
         * Recupera los medicamentos de un diagnostico
         * @param   {number}  userId el id del usuario
         * @returns {promise} una promesa con todos los medicamentos del diagnostico
         */

        function getDiagnosisMedication(diagnosisId) {

            return $http.get(DiagnosisEndpoint + "/diagnosisMedication/" + diagnosisId).then(function (result) {
                return result.data;
            }, function (error) {
                $log.error("Ocurrió un error al recuperar los medicamentos para el diagnositoc " + diagnosisId, error);
                return error;
            });
        }

        /**
         * Agrega una medicacion al diagnostico
         * @param   {object}   newMedication medicacion a agregar
         * @param   {number}   diagnosisId   id del diagnostico a modificar
         * @returns {[[Type]]} [[Description]]
         */
        function addDiagnosisMedication(newMedication, diagnosisId) {

            return $http.put(DiagnosisEndpoint + "/addDiagnosisMedication/" + diagnosisId, newMedication).then(function (result) {

                return result.data;
            }, function (error) {
                $log.error("Ocurrió un error al agregar un nuevo medicamento al diagnostico" + diagnosisId, error);
                return error;
            });
        }

        /**
         * Modifica el nombre y descripcion de un diagnóstico
         * @param   {object}  updatedDiagnosis diagnostico modificado
         * @param   {number}  diagnosisId      id del diagnostico a modificar
         * @returns {promise} una promesa con el diagnostico modificado
         */
        function updateDiagnosis(updatedDiagnosis, diagnosisId){
             return $http.put(DiagnosisEndpoint + "/updateDiagnosis/"+ diagnosisId, updatedDiagnosis).then(function (result) {
                return result.data;
            }, function(error) {
                $log.error("Ocurrió un error al modificar el diagnostico del paciente " + diagnosisId, error);
            });
        }

        function deleteDiagnosisMedication(diagnosisId, medicationId){

            return $http.delete(DiagnosisEndpoint + "/deleteDiagnosisMedication/"+ diagnosisId + "/" +medicationId).then(function (result) {
                return result.data;
            }, function(error) {
                $log.error("Ocurrió un error al eliminar la medicación " + diagnosisId, error);
            });

        }

    }
})();

