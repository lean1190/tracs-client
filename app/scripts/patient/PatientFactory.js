/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

/**
 * @ngdoc function
 * @name TracsClient.factories:PatientFactory
 * @description
 * Factory para interactuar con la API REST de pacientes de un usuario.
 * Provee las operaciones básicas CRUD
 */

(function () {
    "use strict";

    angular
        .module("TracsClient.factories")
        .factory("PatientFactory", PatientFactory);

    PatientFactory.$inject = ["$resource", "$http", "$log", "EnvironmentConfig"];

    function PatientFactory($resource, $http, $log, EnvironmentConfig) {

        var patientEndpoint = EnvironmentConfig.api + "/patient";

        var service = {

            createPatient: createPatient,
            getPatients: getPatients

        };

        return service;

        /**
         * Crea un paciente nuevo para un usuario
         * @param   {object}  newPatient un objeto con los datos del nuevo paciente
         * @param   {number}  creatorId  el id del usuario creador
         * @returns {promise} una promesa con el nuevo usuario
         */
        function createPatient(newPatient, creatorId) {
            newPatient.admin = creatorId;

            return $http.post(patientEndpoint, newPatient).then(function (result) {
                return result.data;
            }, function(error) {
                $log.error("Ocurrió un error al crear el paciente", error);
            });
        }

        /**
         * Recupera todos los pacientes de un usuario
         * @param   {number}  userId el id del usuario
         * @returns {promise} una promesa con todos los pacientes del usuario
         */
        function getPatients(userId) {
            return $http.get(patientEndpoint + "/user/" + userId).then(function (result) {
                return result.data;
            }, function(error) {
                $log.error("Ocurrió un error al recuperar los pacientes del usuario con id " + userId, error);
            });
        }

    }

})();
