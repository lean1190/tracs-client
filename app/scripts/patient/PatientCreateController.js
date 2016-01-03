(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientCreateController", PatientCreateController);

    PatientCreateController.$inject = ["PatientFactory", "$stateParams"];

    function PatientCreateController(PatientFactory, $stateParams) {

        var vm = this;

//Estoy hay que modificarlo con el ._ID del que se loguea

        var creatorId = "111";

        vm.createPatient = function() {

            PatientFactory.createPatient(vm.patient, creatorId);

        }
    }
})();
