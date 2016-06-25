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

    PushHelper.$inject = ["$http", "$ionicPush", "$log", "EnvironmentConfig", "storage"];

    function PushHelper($http, $ionicPush, $log, EnvironmentConfig, storage) {

        var userEndpoint = EnvironmentConfig.api + "/user";

        function savePushToken(pushToken) {
            var updateData = {
                userId: storage.getUser()._id,
                pushToken: pushToken
            };

            return $http.put(userEndpoint + "/save/push", updateData).then(function (result) {
                return result.data;
            }, function (error) {
                $log.error("Ocurrió un error al guardar el token para notificaciones push", error);
            });
        }

        function showPatientAlert() {
            // TODO redirigir a pantalla de alerta!
        }

        /**
         * Registra al usuario para recibir notificaciones push
         */
        function registerForPushNotifications() {
            $ionicPush.init({
                "debug": true,
                "onNotification": function(notification) {
                    var payload = notification.payload;
                    console.log("### notification", notification);
                    showPatientAlert();
                },
                "onRegister": function(data) {
                    savePushToken(data.token);
                }
            });

            $ionicPush.register();
        }

        var service = {
            registerForPushNotifications: registerForPushNotifications
        };

        return service;
    }

})();
