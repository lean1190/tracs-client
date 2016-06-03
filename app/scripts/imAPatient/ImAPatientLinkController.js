/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

/**
 * @ngdoc function
 * @name TracsClient.controllers:ImAPatientLinkController
 * @description
 * Controlador que maneja el linkeo de un DNI con un paciente
 * Finalmente decide el acceso a la vista de paciente
 */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("ImAPatientLinkController", ImAPatientLinkController);

    ImAPatientLinkController.$inject = ["$scope", "$state", "$ionicHistory", "$ionicSideMenuDelegate", "$cordovaToast", "utils", "ImAPatientFactory"];

    function ImAPatientLinkController($scope, $state, $ionicHistory, $ionicSideMenuDelegate, $cordovaToast, utils, ImAPatientFactory) {

        var vm = this;

        vm.dni = "";

        vm.isValid = function () {
            return vm.dni !== "";
        };

        /**
         * Asocia un número de DNI con un paciente y redirige
         * a la vista de paciente
         */
        vm.linkPatient = function () {
            if (vm.isValid()) {
                ImAPatientFactory.linkPatient(vm.dni).then(function (patientInfo) {
                    if (!utils.isEmpty(patientInfo)) {
                        $cordovaToast.showLongBottom("Paciente encontrado!").then(function () {
                            // Setea la próxima vista como root del history de navegación
                            $ionicHistory.nextViewOptions({
                                historyRoot: true
                            });
                            // Redirige a la vista de paciente
                            $state.go("patientView.imAPatientHome");
                        });
                    } else {
                        $cordovaToast.showLongBottom("No encontramos al paciente con dni " + vm.dni);
                    }
                }, function () {
                    $cordovaToast.showLongBottom("No encontramos al paciente con dni " + vm.dni);
                });
            } else {
                $cordovaToast.showLongBottom("Debés ingresar un DNI");
            }
        };

        vm.goBack = function () {
            $ionicHistory.goBack();
        };
    }
})();
