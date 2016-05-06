/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

/**
 * @ngdoc function
 * @name TracsClient.controllers:PatientCreateController
 * @description
 * Controlador que maneja la validación y creación de un nuevo paciente
 */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientCreateController", PatientCreateController);

    PatientCreateController.$inject = ["$scope", "$stateParams", "$state", "$cordovaToast", "storage", "PatientFactory", "MenuFactory"];

    function PatientCreateController($scope, $stateParams, $state, $cordovaToast, storage, PatientFactory, MenuFactory) {

        var vm = this;
        vm.patient = {
            name: "",
            dni: "",
            birthDate: "",
            phoneNr: "",
            description: ""
        };

        /**
         * Valida que los campos obligatorios hayan sido completados
         * @returns {boolean} true if the validation passes
         */
        function validate() {
            if (vm.patient.name === "") {
                $cordovaToast.showLongBottom("El nombre es obligatorio");
                return false;
            }
            if (vm.patient.dni === "") {
                $cordovaToast.showLongBottom("El DNI es obligatorio");
                return false;
            }
            if (vm.patient.birthDate === "") {
                $cordovaToast.showLongBottom("La fecha de nacimiento es obligatoria");
                return false;
            }

            return true;
        }

        vm.createPatient = function () {
            if (validate()) {
                var creatorId = storage.getUser()._id;

                PatientFactory.createPatient(vm.patient, creatorId).then(function () {
                    $cordovaToast.showLongBottom("Paciente creado!").then(function () {
                        MenuFactory.clearRightButtonAction();
                        $state.go("app.patientHome");
                    });
                }, function () {
                    $cordovaToast.showLongBottom("Ocurrió un error al guardar el paciente, intentalo de nuevo");
                });
            }
        };

        function activate() {
            // Muestra el check para guardar al paciente
            MenuFactory.activateRightButtonAction(function () {
                vm.createPatient();
            });

            // Cuando apretamos atrás se borra el check y su funcionalidad
            MenuFactory.setBackButtonAction(function () {
                MenuFactory.clearRightButtonAction();
            });
        }

        activate();
    }
})();
