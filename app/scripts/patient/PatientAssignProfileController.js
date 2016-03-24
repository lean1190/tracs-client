/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientAssignProfileController", PatientAssignProfileController);

    PatientAssignProfileController.$inject = ["$stateParams", "$state", "$cordovaToast", "localStorageService", "PatientFactory","utils"];

    function PatientAssignProfileController($stateParams, $state, $cordovaToast, localStorageService, PatientFactory, utils) {

        var vm = this;

        //pensado para sacar al usuario actual de la lista de profesionales. Despues tengo que hacer algun metodo para discriminar tambien los que ya tiene asignados el paciente.
        var currentUser = localStorageService.get("user");

        vm.patient = localStorageService.get("lastVisitedPatient");
        vm.profile = {};
        vm.profile.patient = vm.patient._id;

        activate();

        function activate() {
            PatientFactory.getSelectableUsers(vm.patient._id).then(function(result) {
                vm.users = result;
                console.log(vm.users);
            }, function() {
                $cordovaToast.showLongBottom("Ocurrió un error al recuperar la lista de usuarios, intentalo de nuevo");
            });
        }

        vm.assignProfile = function(){

            if (!(utils.isEmpty(vm.profile.user))){
                PatientFactory.assignProfile(vm.profile).then(function(result){
                    $state.go("app.patientCurrentProfiles");
                },function(){
                    $cordovaToast.showLongBottom("Ocurrió un error al asignar un participante al paciente, intentalo de nuevo");
                });
            }else{
                $cordovaToast.showLongBottom("Por favor, elija un participante valido");
            };
        }
    }
})();
