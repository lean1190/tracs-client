/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientDetailController", PatientDetailController);

    PatientDetailController.$inject = ["$stateParams", "$state", "$cordovaToast", "$ionicHistory", "storage", "PatientFactory"];

    function PatientDetailController($stateParams, $state, $cordovaToast, $ionicHistory, storage, PatientFactory) {

        var vm = this;

        vm.patient = {};
        vm.patientOpinions = {};

        activate();

        function activate() {

            vm.patient = storage.getLastVisitedPatient();

            PatientFactory.getPatientOpinions(vm.patient._id).then(function(result) {
                vm.patientOpinions = result;
                console.log(vm.patientOpinions);
            }, function() {
                $cordovaToast.showLongBottom("Ocurrió un error al recuperar las opiniones del paciente, intentalo de nuevo");
            });

        }

        vm.updatePatient = function () {
            var updatedPatient = vm.patient;

            PatientFactory.updatePatientDetail(updatedPatient).then(function () {
                $cordovaToast.showLongBottom("Paciente actualizado correctamente!").then(function () {
                    $state.go("app.patientHome");
                });
            }, function () {
                $cordovaToast.showLongBottom("Ocurrió un error al editar al paciente, intentalo de nuevo");
            });

        };

        vm.addPatientOpinion = function (){

            var currentUserId = storage.getUser()._id;

            var newPatientOpinion = {};
            newPatientOpinion.user = currentUserId;
            newPatientOpinion.description = vm.patientOpinion;

            PatientFactory.addPatientOpinion(newPatientOpinion, vm.patient._id).then(function(){
                $cordovaToast.showLongBottom("Nueva opinión gurdada correctamente!");
            }, function () {
                $cordovaToast.showLongBottom("Ocurrió un error al guardar la opinión del paciente, intentalo de nuevo");
            });

        };
    }
})();
