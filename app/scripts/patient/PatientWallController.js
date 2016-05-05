/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientWallController", PatientWallController);

    PatientWallController.$inject = ["$rootScope", "$scope", "$stateParams", "$interval", "$cordovaToast", "PatientFactory", "SocketService", "$state", "storage", "NotificationsMapper"];

    function PatientWallController($rootScope, $scope, $stateParams, $interval, $cordovaToast, PatientFactory, SocketService, $state, storage, NotificationsMapper) {

        var vm = this,
            patientId = $stateParams.id,
            notificationsInterval = null;

        vm.patient = {};
        vm.notifications = [];

        /**
         * Agrega a las notificaciones un icono y un link a un estado
         * @param   {Array} notifications las notificaciones
         * @returns {Array} el arreglo de notificaciones con la información para la vista
         */
        function fillNotificationsWithViewInfo(notifications) {
            for (var i = 0; i < notifications.length; i++) {
                var currentNotification = notifications[i],
                    notificationInfo = NotificationsMapper.getNotificationInfoForType(currentNotification.type);

                currentNotification.icon = notificationInfo.icon;
                currentNotification.link = notificationInfo.link;
            }

            return notifications;
        }

        /**
         * Recupera las notificaciones para el paciente actual
         */
        function getPatientNotifications() {
            PatientFactory.getNotifications(patientId).then(function (resultNotifications) {
                vm.notifications = fillNotificationsWithViewInfo(resultNotifications);
            });
        }

        function showChatButton() {
            $rootScope.showChatButton = true;
        }

        /**
         * Cuando se destruye el controller se asegura
         * que también se corte el intervalo para actualizar
         * las notificaciones
         */
        $scope.$on("$destroy", function () {
            $rootScope.showChatButton = false;
            // Make sure that the interval is destroyed
            if (angular.isDefined(notificationsInterval)) {
                $interval.cancel(notificationsInterval);
                notificationsInterval = undefined;
            }
        });

        function activate() {
            // Recupera todos los datos del paciente
            PatientFactory.getPatientDetail(patientId).then(function (resultPatient) {
                vm.patient = resultPatient;
                vm.notifications = fillNotificationsWithViewInfo(resultPatient.notifications);

                // Recupera los perfiles para mostrar en el muro
                PatientFactory.getPatientProfiles(vm.patient._id).then(function (result) {
                    vm.patient.profiles = result;
                });

                // Inicializa el intervalo para hacer polling de las notificaciones
                // y traerse las nuevas. Busca cada 20 segundos
                notificationsInterval = $interval(function () {
                    getPatientNotifications();
                }, 20000);

                showChatButton();

            }, function () {
                $cordovaToast.showLongBottom("Ocurrió un error al recuperar la información del paciente, intentalo de nuevo");
            });
        }

        activate();


    }
})();
