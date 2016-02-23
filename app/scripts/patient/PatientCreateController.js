(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientCreateController", PatientCreateController);

    PatientCreateController.$inject = ["$stateParams", "$state", "$cordovaToast", "localStorageService", "PatientFactory"];

    function PatientCreateController($stateParams, $state, $cordovaToast, localStorageService, PatientFactory) {

        var vm = this;

        vm.createPatient = function () {

            var creatorId = localStorageService.get("user")._id;

            PatientFactory.createPatient(vm.patient, creatorId).then(function (result) {
                console.log("### Paciente creado", result);
                $cordovaToast.showLongBottom("Paciente creado").then(function () {
                   $state.go("app.patientHome");
                });
            }, function () {
                $cordovaToast.showLongBottom("Ocurrió un error al guardar el paciente, intentalo de nuevo").then(function () {
                   $state.go("app.patientHome");
                });
            });

        };
    }
})();
