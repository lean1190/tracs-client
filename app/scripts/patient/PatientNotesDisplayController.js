/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */


(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientNotesDisplayController", PatientNotesDisplayController);

    PatientNotesDisplayController.$inject = ["$stateParams", "$state", "$cordovaToast", "storage", "PatientFactory"];

    function PatientNotesDisplayController($stateParams, $state, $cordovaToast, storage, PatientFactory) {

        var noteId = $stateParams.id,
            vm = this;

        vm.patient = {};
        vm.user = {};
        vm.patientNote = {};

        activate();

        function activate(){

            vm.patient = storage.getLastVisitedPatient();
            vm.user = storage.getUser();

            PatientFactory.getPatientNote(noteId).then(function (result) {
                vm.patientNote = result;
                console.log(vm.patientNote);
            }, function () {
                $cordovaToast.showLongBottom("Ocurrió un error al recuperar la nota sobre el paciente, intentalo de nuevo");
            });
        }

    }
})();
