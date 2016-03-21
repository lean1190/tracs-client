/* jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular, console */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("TreatmentCreateController", TreatmentCreateController);

    TreatmentCreateController.$inject = ["TreatmentFactory"];

    function TreatmentCreateController(TreatmentFactory) {

        var vm = this;

        //Estoy hay que modificarlo con el ._ID del que se loguea

        var creatorId = "1";
        vm.treatment = TreatmentFactory.newTreatment(creatorId);


        //console.log(vm.treatment);

        /*      $http.get('/treatment/treatmentCreate').success(function(response){
            console.log("volvio");
            vm.treatment = response;
            console.log(vm.treatment.description);
        })*/

        vm.showPatientInput = function () {

            vm.treatmentInfoEntered = !((vm.treatment.treatmentDescription === "") || (vm.treatment.treatmentName === ""));
            console.log(vm.treatmentInfoEntered);

        };

        vm.createTreatment = function () {

            TreatmentFactory.createTreatment(vm.treatment);

        };
    }
})();
