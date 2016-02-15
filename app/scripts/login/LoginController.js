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

    LoginController.$inject = ["$scope", "$http", "$state", "$ionicSideMenuDelegate", "$ionicHistory", "localStorageService",  "LoginFactory"];

    function LoginController($scope, $http, $state, $ionicSideMenuDelegate, $ionicHistory, localStorageService, LoginFactory) {

        var vm = this;

        activate();

        function activate() {
            console.log("Que hay en el session storage??", localStorageService.get("user"));
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

                // Setea la próxima vista para que sea la raíz del stack de navegación,
                // de manera que no se muestre el back button y no se pueda volver al login
                $ionicHistory.nextViewOptions({
                    historyRoot: true
                });

                // Redirige al menú principal
                $state.go("app.patientHome");
            }, function (error) {
                console.error(error.message, error.raw);
            });
        };
    }

})();
