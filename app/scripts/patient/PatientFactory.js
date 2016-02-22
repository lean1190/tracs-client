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

    PatientFactory.$inject = ["$resource", "$http", "EnvironmentConfig"];

    function PatientFactory($resource, $http, EnvironmentConfig) {

        var patientCreateEndpoint = EnvironmentConfig.api + "/patient";
        var patientGetEndpoint = EnvironmentConfig.api + "/patient";

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
            //return newPatient.patientName;
            console.log(newPatient);
            return $http.post(patientCreateEndpoint + "/", newPatient).then(function (result) {
                return result.data;
            });
        }

        /**
         * Recupera todos los pacientes de un usuario
         * @param   {number}  userId el id del usuario
         * @returns {promise} una promesa con todos los pacientes del usuario
         */
        function getPatients(userId) {
            return $http.get(patientGetEndpoint, userId).then(function (result) {
                console.log(result.data);
                return result.data;
            });
        }

    }

})();
