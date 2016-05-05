/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

/**
 * @ngdoc function
 * @name TracsClient.controllers:PatientNotes
 * @description
 * Controlador que maneja la administracion de las notas que tiene el usuario sobre su paciente
 */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientNotesController", PatientNotesController);

    PatientNotesController.$inject = ["$stateParams", "$state", "$cordovaToast", "storage", "PatientFactory"];

    function PatientNotesController($stateParams, $state, $cordovaToast, storage, PatientFactory) {

        var vm = this;

        vm.patient = {};
        vm.user = {};
        vm.patientNotes = [];

        activate();

        function activate(){

            vm.patient = storage.getLastVisitedPatient();
            vm.user = storage.getUser();

            PatientFactory.getPatientNotes(vm.patient._id, vm.user._id).then(function (result) {
                vm.patientNotes = result;
                console.log(vm.patientNotes);
            }, function () {
                $cordovaToast.showLongBottom("Ocurrió un error al recuperar las notas sobre el paciente, intentalo de nuevo");
            });
        }

        vm.displayNote = function(noteId){

            $state.go("app.patientNotesDisplay", { id: noteId });
        }

    }
})();