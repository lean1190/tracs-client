/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

/**
 * @ngdoc function
 * @name TracsClient.controllers:ImAPatientHomeController
 * @description
 * Controlador que maneja el linkeo de un DNI con un paciente
 * Finalmente decide el acceso a la vista de paciente
 */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("ImAPatientHomeController", ImAPatientHomeController);

    ImAPatientHomeController.$inject = ["$state", "$cordovaToast", "localStorageService", "ImAPatientFactory"];

    function ImAPatientHomeController($state, $cordovaToast, localStorageService, ImAPatientFactory) {

        var vm = this;

        vm.patient = localStorageService.get("patientUser");

        console.log("### ImAPatientHome", vm.patient);
    }
})();
