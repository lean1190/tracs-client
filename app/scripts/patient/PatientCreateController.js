(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientCreateController", PatientCreateController);

    PatientCreateController.$inject = ["PatientFactory", "$stateParams"];

    function PatientCreateController(PatientFactory, $stateParams) {

        var vm = this;

//Estoy hay que modificarlo con el ._ID del que se loguea

        var creatorId = "56986b129a1971d812b0050a";

        vm.createPatient = function() {

            PatientFactory.createPatient(vm.patient, creatorId).then(function(result) {
                console.log("$$$ result", result);
            }, function(err) {
                console.log("$$$ rompiose", err);
            });

        };
    }
})();
