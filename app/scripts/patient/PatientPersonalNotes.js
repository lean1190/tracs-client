/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

/**
 * @ngdoc function
 * @name TracsClient.controllers:PatientPersonalNotes
 * @description
 * Controlador que maneja la administracion de las notas que tiene el usuario sobre su paciente
 */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientPersonalNotesController", PatientPersonalNotesController);

    PatientPersonalNotesController.$inject = ["$stateParams", "$state", "$cordovaToast", "storage", "PatientFactory"];

    function PatientPersonalNotesController($stateParams, $state, $cordovaToast, storage, PatientFactory) {

        var vm = this;

        vm.patient = {};
        vm.user = {};
        vm.notes = [];

        activate();

        function activate(){

            vm.patient = storage.getLastVisitedPatient();
            vm.user = storage.getUser();

            PatientFactory.getPersonalNotes(vm.patient._id,vm.user._id).then(function (result) {
                vm.notes = result;
            }, function () {
                $cordovaToast.showLongBottom("Ocurrió un error al recuperar las notas sobre el paciente, intentalo de nuevo");
            });
        }

    }
})();
