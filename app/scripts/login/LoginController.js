/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

/**
 * @ngdoc function
 * @name TracsClient.controllers:LoginController
 * @description
 * Controlador que maneja el login de un usuario
 */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("LoginController", LoginController);

    LoginController.$inject = ["$rootScope", "$scope", "$http", "$state", "$log", "$ionicSideMenuDelegate", "$ionicHistory", "localStorageService", "LoginFactory"];

    function LoginController($rootScope, $scope, $http, $state, $log, $ionicSideMenuDelegate, $ionicHistory, localStorageService, LoginFactory) {

        var vm = this;

        activate();

        function activate() {
            // Si el usuario ya se logueó en la aplicación, lo redirije al menú principal
            if (isUserLoggedIn()) {
                forwardToPatientHome();
            }
        }

        /**
         * Cuando entra a la vista deshabilita la posibilidad de hacer drag
         * Sirve para prevenir que se despliegue el side menu
         */
        $scope.$on("$ionicView.enter", function () {
            $ionicSideMenuDelegate.canDragContent(false);
        });

        /**
         * Cuando sale de la vista habilita nuevamente el dragging.
         * Sirve para que las próximas vistas tengan disponible el side menu
         */
        $scope.$on("$ionicView.leave", function () {
            $ionicSideMenuDelegate.canDragContent(true);
        });

        /**
         * Verifica que haya un usuario logueado
         * @returns {boolean} true si se encontró un usuario
         */
        function isUserLoggedIn() {
            var logedInUser = localStorageService.get("user");

            return logedInUser !== null && logedInUser._id !== false;
        }

        /**
         * Redirige al menú principal
         */
        function changeStateToPatientHome() {
            $state.go("app.patientHome");
        }

        /**
         * Setea la próxima vista para que sea la raíz del stack de navegación,
         * de manera que no se muestre el back button y no se pueda volver al login
         */
        function setNextViewAsHistoryRoot() {
            $ionicHistory.nextViewOptions({
                historyRoot: true
            });
        }

        /**
         * Setea el history root en la próxima vista y redirecciona
         */
        function forwardToPatientHome() {
            // Emite un evento indicando que el usuario en la sesión cambió
            $rootScope.$emit("user.changed");

            setNextViewAsHistoryRoot();
            changeStateToPatientHome();
        }

        /**
         * Dispara la autenticación con Google en la aplicación,
         * pidiendo permisos de acceso y validando los datos con
         * el servidor
         */
        vm.login = function () {
            LoginFactory.login({
                clientId: "1017723616061-btjadg1pe5tug819i8b3sffek1klev6m.apps.googleusercontent.com",
                clientSecret: "McJIjSQt4aRNL_lLO8xSUBOe",
                redirectUri: "http://localhost",
                scopes: "https://www.googleapis.com/auth/plus.login+https://www.googleapis.com/auth/plus.me+https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile"
            }).then(function () {
                forwardToPatientHome();
            }, function (error) {
                $log.error(error.message, error.raw);
            });
        };
    }

})();
