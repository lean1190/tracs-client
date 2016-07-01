/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

/**
 * @ngdoc function
 * @name TracsClient.factories:ProfileFactory
 * @description
 * Factory para interactuar con la API REST de perfiles de un usuario.
 * Provee las operaciones básicas CRUD
 */

(function () {
    "use strict";

    angular
        .module("TracsClient.factories")
        .factory("ProfileFactory", ProfileFactory);

    ProfileFactory.$inject = ["$http", "$log", "storage", "EnvironmentConfig"];

    function ProfileFactory($http, $log, storage, EnvironmentConfig) {

        var profileEndpoint = EnvironmentConfig.api + "/Profile";

        var service = {

            getProfile: getProfile,
            deleteProfile: deleteProfile
        };

        return service;

        function getProfile (patientId,userId){

            return $http.get(profileEndpoint + "/" + patientId +"/"+userId).then(function (result) {
                return result.data;
            }, function (error) {
                $log.error("Ocurrió un error al recuperar el perfil para el paciente "+patientId + "y el paciente" + patientId , error);
                return error;
            });
        }

        function deleteProfile(userId, patientId){
            return $http.delete(profileEndpoint + "/" + userId + "/" + patientId).then(function (result) {
                return result.data;
            }, function (error) {
                $log.error("Ocurrió un error al borrar el perfil ");
                return error;
            });
        }

    }

})();
