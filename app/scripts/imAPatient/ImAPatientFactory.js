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

    ImAPatientFactory.$inject = ["$http", "$log", "$cordovaGeolocation", "storage", "utils", "EnvironmentConfig"];

    function ImAPatientFactory($http, $log, $cordovaGeolocation, storage, utils, EnvironmentConfig) {

        var imAPatientEndpoint = EnvironmentConfig.api + "/imAPatient";

        var service = {
            linkPatient: linkPatient,
            getMyPosition: getMyPosition,
            sendGeoAlert: sendGeoAlert,
            sendGeoAlertAtMyPosition: sendGeoAlertAtMyPosition
        };

        return service;

        /**
         * Envía un alerta georreferenciada para un paciente
         * @param   {object}  geoAlert un objeto con los datos de posicionamiento
         * @param   {string}  patientId el id del paciente para el alerta
         * @returns {promise} una promesa con el resultado del envío del alerta
         */
        function sendGeoAlert(geoAlert, patientId) {
            // Transformación para evitar bugs de datos que no llegan al servidor (rarísimo)
            var alertObject = {
                coords: {
                    latitude: geoAlert.coords.latitude,
                    longitude: geoAlert.coords.longitude
                },
                timestamp: geoAlert.timestamp
            };
            return $http.put(imAPatientEndpoint + "/sendGeoAlert/" + patientId, alertObject).then(function (result) {
                return result;
            }, function(error) {
                $log.error("Ocurrió un error al enviar la alerta, intentalo de nuevo ", error);
                return error;
            });
        }

        /**
         * Recupera la posición actual del usuario
         * @returns {promise} una promesa con la posición del usuario
         */
        function getMyPosition() {
            var options = {
                timeout: 80000,
                enableHighAccuracy: true,
                maximumAge: 10000
            };

            return $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
                return position;
            }, function (error) {
                $log.error("Ocurrió un error al recuperar la posición del paciente", error);
            });
        }

        /**
         * Recupera la posición actual del usuario, y
         * envía un alerta georreferenciada para un paciente
         * @param   {string}  patientId el id del paciente para el alerta
         * @returns {promise} una promesa con el resultado del envío del alerta
         */
        function sendGeoAlertAtMyPosition(patientId) {
            return getMyPosition().then(function(myPosition) {
                return sendGeoAlert(myPosition, patientId);
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
