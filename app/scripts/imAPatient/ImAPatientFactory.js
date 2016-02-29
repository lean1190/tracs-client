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
                var resultPatient = result.data,
                    patientUser = {
                        _id: resultPatient._id,
                        name: resultPatient.name,
                        birthDate: resultPatient.birthDate,
                        DNI: resultPatient.DNI,
                        picture: resultPatient.picture
                    };

                localStorageService.set("patientUser", patientUser);
                return result.data;
            }, function(error) {
                $log.error("No se encontró el paciente con DNI " + patientDni, error);
            });
        }

    }

})();
