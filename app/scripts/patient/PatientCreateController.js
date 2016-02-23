(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientCreateController", PatientCreateController);

    PatientCreateController.$inject = ["$stateParams", "localStorageService", "PatientFactory"];

    function PatientCreateController($stateParams, localStorageService, PatientFactory) {

        var vm = this;

        vm.createPatient = function () {
            var creatorId = localStorageService.get("user")._id;

            PatientFactory.createPatient(vm.patient, creatorId).then(function (result) {
                console.log("$$$ Paciente creado", result);
            }, function (err) {
                console.log("$$$ No se pudo guardar el paciente", err);
            });

        };
    }
})();
