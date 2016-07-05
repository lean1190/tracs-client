/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

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

    LoginController.$inject = ["$rootScope", "$scope", "$http", "$state", "$log", "$cordovaToast", "$ionicSideMenuDelegate", "$ionicHistory", "storage", "LoginFactory", "PushHelper", "EnvironmentConfig"];

    function LoginController($rootScope, $scope, $http, $state, $log, $cordovaToast, $ionicSideMenuDelegate, $ionicHistory, storage, LoginFactory, PushHelper, EnvironmentConfig) {

        var vm = this;

        /**
         * Verifica que haya un usuario logueado
         * @returns {boolean} true si se encontró un usuario
         */
        function isUserLoggedIn() {
            var logedInUser = storage.getUser();

            return logedInUser !== null && logedInUser._id !== false;
        }

        /**
         * Verifica si el usuario se logueó como paciente
         * @returns {boolean} true si el usuario se logueó como paciente
         */
        function isPatientLoggedIn() {
            var logedInPatient = storage.getPatientUser();

            return logedInPatient !== null && logedInPatient._id !== false;
        }

        /**
         * Redirige al menú principal
         */
        function changeStateToLoggedInHome() {
            $state.go("app.patientHome");
        }

        /**
         * Redirige a la vista de paciente
         */
        function changeStateToPatientView() {
            $state.go("patientView.imAPatientHome");
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
        function forwardToLoggedInHome() {
            PushHelper.registerForPushNotifications();
            setNextViewAsHistoryRoot();
            changeStateToLoggedInHome();
        }

        /**
         * Setea el history root en la próxima vista y redirecciona
         */
        function forwardToPatientView() {
            setNextViewAsHistoryRoot();
            changeStateToPatientView();
        }

        /**
         * Dispara la autenticación con Google en la aplicación,
         * pidiendo permisos de acceso y validando los datos con
         * el servidor
         */
        vm.login = function () {
            // Por simplicidad los parámetros de la API de Google se pasan en el cliente.
            // Por seguridad, lo óptimo sería recuperar estos datos desde el servidor
            LoginFactory.login({
                clientId: EnvironmentConfig.googleClientId,
                clientSecret: EnvironmentConfig.googleClientSecret,
                redirectUri: EnvironmentConfig.googleRedirectUri,
                scopes: "https://www.googleapis.com/auth/plus.login+https://www.googleapis.com/auth/plus.me+https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile"
            }).then(function () {
                forwardToLoggedInHome();
            }, function (error) {
                $log.error(error.message, error.raw);
                $cordovaToast.showLongBottom("No pudimos loguearte! Por favor intentalo de nuevo");
            });
        };

        function activate() {
            // Si el usuario ya se logueó en la aplicación, lo redirige al listado de pacientes asignados
            if (isUserLoggedIn()) {
                forwardToLoggedInHome();
            // Si el usuario es un paciente y ya registró su DNI, lo redirige a la vista de paciente
            } else if (isPatientLoggedIn()) {
                forwardToPatientView();
            }
        }

        activate();
    }

})();
