/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */


(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientNotesDisplayController", PatientNotesDisplayController);

    PatientNotesDisplayController.$inject = ["$stateParams", "$state", "$cordovaToast", "storage", "PatientFactory","MenuFactory", "PatientNoteFactory"];

    function PatientNotesDisplayController($stateParams, $state, $cordovaToast, storage, PatientFactory, MenuFactory, PatientNoteFactory) {

        var noteId = $stateParams.id,
            vm = this;

        vm.patient = {};
        vm.user = {};
        vm.patientNote = {};

        activate();

        function activate(){

            vm.patient = storage.getLastVisitedPatient();
            vm.user = storage.getUser();

            vm.editOn = false;

            // Muestra el lapiz para editar la nota del paciente
            MenuFactory.activateRightEditButtonAction(function () {

                vm.editFields();

            });

            // Cuando apretamos atrás se borra el boton y su funcionalidad
            MenuFactory.setBackButtonAction(function () {
                MenuFactory.clearRightButtonAction();
            });


            PatientFactory.getPatientNote(noteId).then(function (result) {
                vm.patientNote = result;
            }, function () {
                $cordovaToast.showLongBottom("Ocurrió un error al recuperar la nota sobre el paciente, intentalo de nuevo");
            });
        }

        vm.editFields = function(){

            vm.editOn = true;

            MenuFactory.clearRightButtonAction();

            MenuFactory.activateRightButtonAction(function () {
                vm.updatePatientNote();
            });
        };

        vm.updatePatientNote = function(){
            PatientNoteFactory.updatePatientNote(vm.patientNote, noteId).then(function () {

                $cordovaToast.showLongBottom("Nota Actualizada!").then(function () {
                    MenuFactory.clearRightButtonAction();
                    $state.go("app.patientNotes");
                });


            }, function () {
                $cordovaToast.showLongBottom("Ocurrió un error al actualizar la nota sobre el paciente, intentalo de nuevo");
            });
        };

        vm.deletePatientNote = function(){
            console.log(noteId,vm.patientNote._Id);
            PatientNoteFactory.deletePatientNote(noteId).then(function(){
                $cordovaToast.showLongBottom("Nota borrada correctamente!").then(function () {
                    MenuFactory.clearRightButtonAction();
                    $state.go("app.patientNotes");
                });
            }, function () {
                $cordovaToast.showLongBottom("Ocurrió un error al borrar la nota sobre el paciente, intentalo de nuevo");
            })
        }
    }
})();
