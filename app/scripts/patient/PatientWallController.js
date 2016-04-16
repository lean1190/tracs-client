/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientWallController", PatientWallController);

    PatientWallController.$inject = ["$scope", "$stateParams", "$interval", "$cordovaToast", "PatientFactory"];

    function PatientWallController($scope, $stateParams, $interval, $cordovaToast, PatientFactory) {

        var vm = this,
            patientId = $stateParams.id,
            notificationsInterval = null;

        vm.patient = {};
        vm.notifications = [];

        /**
         * Recupera las notificaciones para el paciente actual
         */
        function getPatientNotifications() {
            PatientFactory.getNotifications(patientId).then(function (resultNotifications) {
                vm.notifications = resultNotifications;
            });
        }

        /**
         * Cuando se destruye el controller se asegura
         * que también se corte el intervalo para actualizar
         * las notificaciones
         */
        $scope.$on("$destroy", function () {
            // Make sure that the interval is destroyed
            if (angular.isDefined(notificationsInterval)) {
                $interval.cancel(notificationsInterval);
                notificationsInterval = undefined;
            }
        });


         vm.enterPatientChatRoom = function(){

            vm.current_room = "Sala de chat de " + vm.patient.name;

            var room = {
                'room_name': vm.current_room
            };

            SocketService.emit('join:room', room);

            $state.go("app.patientChatRoom");
        };



        function activate() {
            // Recupera todos los datos del paciente
            PatientFactory.getPatientDetail(patientId).then(function (resultPatient) {
                vm.patient = resultPatient;
                vm.notifications = resultPatient.notifications;

                // Recupera los perfiles para mostrar en el muro
                PatientFactory.getPatientProfiles(vm.patient._id).then(function (result) {
                    vm.patient.profiles = result;
                });

                // Inicializa el intervalo para hacer polling de las notificaciones
                // y traerse las nuevas. Busca cada 20 segundos
                $interval(function() {
                    getPatientNotifications();
                }, 20000);

            }, function () {
                $cordovaToast.showLongBottom("Ocurrió un error al recuperar la información del paciente, intentalo de nuevo");
            });
        }

        activate();


    }
})();
