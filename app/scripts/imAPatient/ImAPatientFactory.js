/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

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

    ImAPatientFactory.$inject = ["$http", "$log", "storage", "utils", "EnvironmentConfig"];

    function ImAPatientFactory($http, $log, storage, utils, EnvironmentConfig) {

        var imAPatientEndpoint = EnvironmentConfig.api + "/imAPatient";

        var service = {
            linkPatient: linkPatient,
            sendGeoAlert: sendGeoAlert
        };

        return service;

        function sendGeoAlert(geoAlert, patientId){

            return $http.put(imAPatientEndpoint + "/sendGeoAlert/" + patientId, geoAlert).then(function (result) {
                return result;
            }, function(error) {
                $log.error("Ocurrió un error al enviar la alerta, intentalo de nuevo ", error);
                return error;
            });

        }

        /**
         * Recupera los datos para la vista de paciente a partir de un DNI
         * @param   {number}  patientDNI  el DNI del paciente que se quiere asociar
         * @returns {promise} una promesa con la información del paciente
         */
        function linkPatient(patientDni) {
            return $http.get(imAPatientEndpoint + "/" + patientDni).then(function (result) {
                var resultPatient = result.data,
                    patientUser = {};

                // Si se encontró un paciente crea el DTO y lo guarda en el localStorage
                if(!utils.isEmpty(resultPatient)) {
                    patientUser = {
                        _id: resultPatient._id,
                        name: resultPatient.name,
                        birthDate: resultPatient.birthDate,
                        DNI: resultPatient.DNI,
                        picture: resultPatient.picture,
                        closestPeople: resultPatient.closestPeople
                    };

                    storage.setPatientUser(patientUser);
                } else {
                    $log.info("No se encontró el paciente con DNI " + patientDni);
                }

                return patientUser;
            }, function(error) {
                $log.error("Ocurrió un error al recuperar el paciente con DNI " + patientDni, error);
                return error;
            });
        }
    }

})();
