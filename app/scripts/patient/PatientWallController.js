/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientWallController", PatientWallController);

    PatientWallController.$inject = ["$rootScope", "$scope", "$stateParams", "$interval", "$cordovaToast", "PatientFactory", "SocketService", "$state", "storage", "NotificationsMapper", "ProfileFactory", "DiagnosisFactory"];

    function PatientWallController($rootScope, $scope, $stateParams, $interval, $cordovaToast, PatientFactory, SocketService, $state, storage, NotificationsMapper, ProfileFactory, DiagnosisFactory) {

        var vm = this,
            patientId = $stateParams.id,
            notificationsInterval = null;

        vm.patient = {};
        vm.patientDiagnosis = {};
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

        function showActionButtons() {
            $rootScope.showChatButton = true;
            $rootScope.showAlertButton = true;
        }

        /**
         * Cuando se destruye el controller se asegura
         * que también se corte el intervalo para actualizar
         * las notificaciones
         */
        $scope.$on("$destroy", function () {
            $rootScope.showChatButton = false;
            $rootScope.showAlertButton = false;
            // Make sure that the interval is destroyed
            $interval.cancel(notificationsInterval);
            notificationsInterval = undefined;
        });

        function activate() {

            vm.user = storage.getUser();

            // Recupera todos los datos del paciente
            PatientFactory.getPatientDetail(patientId).then(function (resultPatient) {
                vm.patient = resultPatient;
                vm.notifications = fillNotificationsWithViewInfo(resultPatient.notifications);

                // Recupero el diagnóstico del paciente
                DiagnosisFactory.getDiagnosis(vm.patient.latestDiagnosis).then(function (diagnosis) {
                    vm.patientDiagnosis = diagnosis;
                });

                // Recupera los perfiles para mostrar en el muro
                PatientFactory.getPatientProfiles(vm.patient._id).then(function (result) {
                    vm.patient.profiles = result;
                });

                // Recupera la informacion del perfil
                ProfileFactory.getProfile(patientId, vm.user._id).then(function(profile){
                    storage.setCurrentProfile(profile);
                });

                // Inicializa el intervalo para hacer polling de las notificaciones
                // y traerse las nuevas. Busca cada 20 segundos
                notificationsInterval = $interval(function () {
                    getPatientNotifications();
                }, 20000);

                // Muestra los botones de enviar alerta y chat
                showActionButtons();

            }, function () {
                $cordovaToast.showLongBottom("Ocurrió un error al recuperar la información del paciente, intentalo de nuevo");
            });
        }

        activate();


    }
})();
