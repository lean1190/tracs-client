/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientDetailController", PatientDetailController);

    PatientDetailController.$inject = ["$stateParams", "$state", "$cordovaToast", "localStorageService", "PatientFactory"];

    function PatientDetailController($stateParams, $state, $cordovaToast, localStorageService, PatientFactory) {

        var vm = this;
        var patientId = $stateParams.id;
        console.log(patientId);
        activate()

        function activate() {

            PatientFactory.getPatient(patientId).then(function(result) {
                vm.patient = result;
                console.log(vm.patient);

            }, function(err) {
                $cordovaToast.showLongBottom("Ocurrió un error al recuperar la información del paciente, intentalo de nuevo");
            });


        }
    }

})();
