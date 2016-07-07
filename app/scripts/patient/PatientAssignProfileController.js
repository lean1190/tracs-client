/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientAssignProfileController", PatientAssignProfileController);

    PatientAssignProfileController.$inject = ["$stateParams", "$state", "$cordovaToast", "storage", "PatientFactory", "utils","MenuFactory"];

    function PatientAssignProfileController($stateParams, $state, $cordovaToast, storage, PatientFactory, utils, MenuFactory) {

        var vm = this;

        vm.patient = storage.getLastVisitedPatient();
        vm.profile = {
            patient: vm.patient._id,
            isParent: false,
            description: ""
        };

        function isValid() {
            if(utils.isEmpty(vm.profile.user)) {
                $cordovaToast.showLongBottom("Debe elegir una persona");
                return false;
            }
            if(vm.profile.description === "") {
                $cordovaToast.showLongBottom("Debe ingresar una descripción");
                return false;
            }

            return true;
        }

        vm.assignProfile = function () {
            if (isValid()) {
                PatientFactory.assignProfile(vm.profile).then(function () {
                    $cordovaToast.showLongBottom("Participante agregado").then(function () {
                        MenuFactory.clearRightButtonAction();
                        $state.go("app.patientCurrentProfiles");
                    });
                }, function () {
                    $cordovaToast.showLongBottom("Ocurrió un error al asignar un participante al paciente, intentalo de nuevo");
                });
            }

        };

        function activate() {
            MenuFactory.clearRightButtonAction();
            // Muestra el check para guardar al paciente
            MenuFactory.activateRightButtonAction(function () {
                vm.assignProfile();
            });

            // Cuando apretamos atrás se borra el check y su funcionalidad
            MenuFactory.setBackButtonAction(function () {
                MenuFactory.clearRightButtonAction();
            });

            PatientFactory.getSelectableUsers(vm.patient._id).then(function (result) {
                vm.users = result;
            }, function () {
                $cordovaToast.showLongBottom("Ocurrió un error al recuperar la lista de usuarios, intentalo de nuevo");
            });
        }

        activate();
    }
})();
