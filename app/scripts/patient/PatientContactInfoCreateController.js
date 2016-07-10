/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

/**
 * @ngdoc function
 * @name TracsClient.controllers:PatientContactInfoCreateController
 * @description
 * Controlador que maneja la validación y creación de un nuevo paciente
 */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientContactInfoCreateController", PatientContactInfoCreateController);

    PatientContactInfoCreateController.$inject = ["$scope", "$stateParams", "$state", "$cordovaToast", "storage", "PatientFactory", "MenuFactory"];

    function PatientContactInfoCreateController($scope, $stateParams, $state, $cordovaToast, storage, PatientFactory, MenuFactory) {

        var vm = this;
        vm.contactInfo = {
            name: "",
            address: "",
            phoneNumber: "",
        };

        /**
         * Valida que los campos obligatorios hayan sido completados
         * @returns {boolean} true if the validation passes
         */
        function validate() {
            if (vm.contactInfo.name === "") {
                $cordovaToast.showLongBottom("El nombre es obligatorio");
                return false;
            }
            if (vm.contactInfo.address === "") {
                $cordovaToast.showLongBottom("La dirección es obligatoria");
                return false;
            }
            if (vm.contactInfo.phoneNumber === "") {
                $cordovaToast.showLongBottom("La ciudad es obligatoria");
                return false;
            }

            return true;
        }

        vm.createContactInfo = function () {
            if (validate()) {

                PatientFactory.updatePatientContactInfo(vm.contactInfo, vm.patient._id).then(function () {
                    $cordovaToast.showLongBottom("Información de contacto del paciente agregada con exito!");
                    MenuFactory.clearRightButtonAction();
                    $state.go("app.patientDetail", { id: vm.patient._id });

                }, function () {
                    $cordovaToast.showLongBottom("Ocurrió un error al guardar la información de contacto, intente de nuevo");
                });
            }
        };

        function activate() {

            vm.patient = storage.getLastVisitedPatient();

            //Limpia los botones preexistentes
            MenuFactory.clearRightButtonAction();

            // Muestra el check para guardar al paciente
            MenuFactory.activateRightButtonAction(function () {
                vm.createContactInfo();
            });

            // Cuando apretamos atrás se borra el check y su funcionalidad
            MenuFactory.setBackButtonAction(function () {
                MenuFactory.clearRightButtonAction();
            });
        }

        activate();
    }
})();
