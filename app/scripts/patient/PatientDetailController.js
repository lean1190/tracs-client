/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientDetailController", PatientDetailController);

    PatientDetailController.$inject = ["$state", "$cordovaToast", "$ionicHistory", "storage", "PatientFactory", "MenuFactory"];

    function PatientDetailController($state, $cordovaToast, $ionicHistory, storage, PatientFactory, MenuFactory) {

        var vm = this;

        vm.patient = {};
        vm.patientOpinions = {};

        vm.updatePatient = function () {
            var updatedPatient = vm.patient;
            console.log("### Updated patient", vm.patient);

            PatientFactory.updatePatientDetail(updatedPatient).then(function () {
                $cordovaToast.showLongBottom("Paciente actualizado correctamente!").then(function () {
                    MenuFactory.clearRightButtonAction();
                    $state.go("app.patientWall", { id: vm.patient._id });
                });
            }, function () {
                $cordovaToast.showLongBottom("Ocurrió un error al editar al paciente, intentalo de nuevo");
            });

        };

        vm.addPatientOpinion = function (){
            var currentUserId = storage.getUser()._id,
                newPatientOpinion = {};

            newPatientOpinion.user = currentUserId;
            newPatientOpinion.description = vm.patientOpinion;

            PatientFactory.addPatientOpinion(newPatientOpinion, vm.patient._id).then(function(){
                $cordovaToast.showLongBottom("Nueva opinión gurdada correctamente!");
            }, function () {
                $cordovaToast.showLongBottom("Ocurrió un error al guardar la opinión del paciente, intentalo de nuevo");
            });
        };

        vm.changeToGeneralTab = function() {
            MenuFactory.activateRightButtonAction(function () {
                vm.updatePatient();
            });
        };

        vm.changeToOpinionsTab = function() {
            MenuFactory.activateRightButtonAction(function () {
                vm.addPatientOpinion();
            });
        };

        function activate() {
            vm.patient = storage.getLastVisitedPatient();
            vm.profile = storage.getCurrentProfile();

            console.log("### Patient", vm.patient);

            // Muestra el check para guardar al paciente
            vm.changeToGeneralTab();

            // Cuando apretamos atrás se borra el check y su funcionalidad
            MenuFactory.setBackButtonAction(function () {
                MenuFactory.clearRightButtonAction();
            });

            PatientFactory.getPatientOpinions(vm.patient._id).then(function(result) {
                vm.patientOpinions = result;
                console.log("### Opinions", result);
            }, function() {
                $cordovaToast.showLongBottom("Ocurrió un error al recuperar las opiniones del paciente, intentalo de nuevo");
            });
        }

        activate();
    }
})();
