/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */


(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientNotesCreateController", PatientNotesCreateController);

    PatientNotesCreateController.$inject = ["$stateParams", "$state", "$cordovaToast", "storage", "PatientFactory"];

    function PatientNotesCreateController($stateParams, $state, $cordovaToast, storage, PatientFactory) {

        var vm = this;

        vm.patient = {};
        vm.user = {};
        vm.note = {};

        activate();

        function activate(){
            vm.patient = storage.getLastVisitedPatient();
            vm.user = storage.getUser();
        }

        vm.createNote = function(){

            vm.note.user = vm.user._id;

            PatientFactory.addPatientNote(vm.note,vm.patient._id).then(function () {
                $cordovaToast.showLongBottom("Su nota fue agregada exitosamente!");
            }, function () {
                $cordovaToast.showLongBottom("Ocurrió un error al agregar la nota, intentalo de nuevo");
            });
        };
    }

})();