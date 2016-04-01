/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientWallController", PatientWallController);

    PatientWallController.$inject = ["$stateParams", "$cordovaToast", "PatientFactory"];

    function PatientWallController($stateParams, $cordovaToast, PatientFactory) {

        var vm = this,
            patientId = $stateParams.id;

        vm.patient = {};

        activate();

        function activate() {
            // Recupera todos los datos del paciente
            PatientFactory.getPatientDetail(patientId).then(function (resultPatient) {
                vm.patient = resultPatient;

                // Recupera los perfiles para mostrar en el muro
                PatientFactory.getPatientProfiles(vm.patient._id).then(function(result) {
                    vm.patient.profiles = result;
                });

            }, function () {
                $cordovaToast.showLongBottom("Ocurrió un error al recuperar la información del paciente, intentalo de nuevo");
            });
        }

    }
})();
