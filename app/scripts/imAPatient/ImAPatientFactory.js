/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

/**
 * @ngdoc function
 * @name TracsClient.factories:ImAPatientFactory
 * @description
 * Factory para las operaciones en la vista de paciente
 */

(function () {
    "use strict";

    angular
        .module("TracsClient.factories")
        .factory("ImAPatientFactory", ImAPatientFactory);

    ImAPatientFactory.$inject = ["$http", "$log", "localStorageService", "EnvironmentConfig"];

    function ImAPatientFactory($http, $log, localStorageService, EnvironmentConfig) {

        var imAPatientEndpoint = EnvironmentConfig.api + "/imAPatient";

        var service = {
            linkPatient: linkPatient
        };

        return service;

        /**
         * Recupera los datos para la vista de paciente a partir de un DNI
         * @param   {number}  patientDNI  el DNI del paciente que se quiere asociar
         * @returns {promise} una promesa con la información del paciente
         */
        function linkPatient(patientDni) {
            return $http.get(imAPatientEndpoint + "/" + patientDni).then(function (result) {
                console.log("### Volvio del linkPatient", result.data);
                var patientUser = {

                };

                localStorageService.set("patientUser", result.data);
                return result.data;
            }, function(error) {
                $log.error("No se encontró el paciente con DNI " + patientDni, error);
            });
        }

        /**
         * Recupera todos los pacientes de un usuario
         * @param   {number}  userId el id del usuario
         * @returns {promise} una promesa con todos los pacientes del usuario
         */
        /*function getPatients(userId) {
            return $http.get(patientEndpoint + "/user/" + userId).then(function (result) {
                return result.data;
            }, function(error) {
                $log.error("Ocurrió un error al recuperar los pacientes del usuario con id " + userId, error);
            });
        }*/

    }

})();
