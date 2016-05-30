/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

/**
 * @ngdoc function
 * @name TracsClient.controllers:MenuController
 * @description
 * Controlador que maneja la información del usuario que se muestra en el menú
 */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("MenuController", MenuController);

    MenuController.$inject = ["$scope", "$rootScope", "$state", "$ionicPopup", "$ionicSideMenuDelegate", "$cordovaToast", "storage", "ImAPatientFactory"];

    function MenuController($scope, $rootScope, $state, $ionicPopup, $ionicSideMenuDelegate, $cordovaToast, storage, ImAPatientFactory) {

        var vm = this;

        // Usuario para mostrar la foto de perfil en el menu
        vm.user = storage.getUser();

        // Variable utilizada para mostrar u ocultar items del menú
        // según la página
        vm.imAtPatientHome = true;

        vm.logout = function () {
            $ionicPopup.show({
                title: "¿Seguro que querés salir?",
                buttons: [
                    {
                        text: "Sí",
                        type: "button-default",
                        onTap: function () {
                            $state.go("logout");
                        }
                    },
                    {
                        text: "No",
                        type: "button-positive"
                    }
                ]
            });
        };

        /**
         * Cierra el side menu
         * Sirve para reemplazar la directiva menu-close y asi evitar
         * que cambie le history root de navegación
         */
        vm.closeMenu = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };

        /**
         * Envía un alerta georreferenciada que será vista
         * por todos los participantes del tratamiento
         */
        vm.sendGeoAlert = function () {
            var confirmAlert = $ionicPopup.show({
                template: "<div style='text-align: center'>¿Enviar alerta?</div>",
                title: "Confirmar",
                scope: $scope,
                buttons: [
                    {
                        text: "Sí",
                        type: "button-positive",
                        onTap: function () {
                            return true;
                        }
                    },
                    {
                        text: "No",
                        type: "button-default"
                    }
                ]
            });

            confirmAlert.then(function(confirmed) {
                if(confirmed) {
                    // Paciente que se está visualizando actualmente
                    var patient = storage.getLastVisitedPatient();
                    ImAPatientFactory.sendGeoAlertAtMyPosition(patient._id).then(function () {
                        $cordovaToast.showLongBottom("Ya enviamos el alerta, pronto recibirás ayuda");
                    }, function () {
                        $cordovaToast.showLongBottom("No pudimos localizarte, está activado el GPS?");
                    });
                }
            });
        };

        /**
         * Suscripción al evento "state.changed.patientHome", que se ejecuta cuando
         * entra al patient home con el listado de pacientes
         */
        var unregisterEvent = $rootScope.$on("state.changed.patientHome", function (event, state) {
            vm.imAtPatientHome = state;
        });

        $scope.$on("$destroy", unregisterEvent);

    }

})();
