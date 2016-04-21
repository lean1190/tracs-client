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

    MenuController.$inject = ["$rootScope", "$state", "$ionicPopup", "$ionicSideMenuDelegate", "storage"];

    function MenuController($rootScope, $state, $ionicPopup, $ionicSideMenuDelegate, storage) {

        var vm = this;

        // Usuario para mostrar la foto de perfil en el menu
        // Puede ser el usuario logueado o un usuario tipo paciente
        vm.user = storage.getUser() || storage.getPatientUser();

        // Variable utilizada para mostrar u ocultar items del menú
        // según la página
        vm.imAtPatientHome = true;

        console.log("### Menu user", vm.user);

        vm.leftButtonAction = function () {
            console.log("### Accion desde el MenuController");
        };

        vm.logout = function () {
            $ionicPopup.show({
                title: "¿Seguro que querés salir?",
                buttons: [
                    {
                        text: "Seguro",
                        type: "button-assertive",
                        onTap: function (event) {
                            $state.go("logout");
                        }
                    },
                    {
                        text: "Mejor no",
                        type: "button-balanced"
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
         * Suscripción al evento "state.changed.patientHome", que se ejecuta cuando
         * entra al patient home con el listado de pacientes
         */
        $rootScope.$on("state.changed.patientHome", function (event, state) {
            vm.imAtPatientHome = state;
        });
    }

})();
