/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

/**
 * @ngdoc function
 * @name TracsClient:factories
 * @description
 * Factory para interactuar con el servidor
 * y las notificaciones push de IONIC
 */

(function() {
    "use strict";

    angular
        .module("TracsClient.factories")
        .factory("PushHelper", PushHelper);

    PushHelper.$inject = ["$http", "$state", "$ionicPush", "$log", "EnvironmentConfig", "storage"];

    function PushHelper($http, $state, $ionicPush, $log, EnvironmentConfig, storage) {

        var userEndpoint = EnvironmentConfig.api + "/user";

        /**
         * Guarda en el servidor el token de ionic push
         * asociado con el usuario logueado
         * @param  {string}  pushToken el token generado por la plataforma push de ionic
         * @return {promise} una promesa con el resultado de guardar el token en el servidor
         */
        function savePushToken(pushToken) {
            var updateData = {
                userId: storage.getUser()._id,
                pushToken: pushToken
            };

            return $http.put(userEndpoint + "/save/push", updateData);
        }

        /**
         * Redirige al estado que muestra el alerta georreferenciada de ayuda
         * @param  {object} payload la información recuperada de la notificación
         */
        function showPatientAlert(payload) {
            $state.go("pushGeoAlert", {
                patient: payload.patient,
                coordinates: payload.coordinates
            });
        }

        /**
         * Registra al usuario para recibir notificaciones push
         */
        function registerForPushNotifications() {
            $ionicPush.init({
                "debug": true,
                "onNotification": function(notification) {
                    showPatientAlert(notification.payload);
                },
                "onRegister": function(data) {
                    savePushToken(data.token);
                }
            });

            $ionicPush.register();
        }

        function clearPushNotifications() {
            $ionicPush.setNotificationCallback(function(){});            
        }

        var service = {
            registerForPushNotifications: registerForPushNotifications,
            clearPushNotifications: clearPushNotifications
        };

        return service;
    }

})();
