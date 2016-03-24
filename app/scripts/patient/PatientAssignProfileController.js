/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientAssignProfileController", PatientAssignProfileController);

    PatientAssignProfileController.$inject = ["$stateParams", "$state", "$cordovaToast", "localStorageService", "PatientFactory","UserFactory"];

    function PatientAssignProfileController($stateParams, $state, $cordovaToast, localStorageService, PatientFactory,UserFactory) {

        var vm = this;

        //pensado para sacar al usuario actual de la lista de profesionales. Despues tengo que hacer algun metodo para discriminar tambien los que ya tiene asignados el paciente.
        var currentUser = localStorageService.get("user");

        vm.patient = localStorageService.get("lastVisitedPatient");
        vm.profile = {};
        vm.profile.user="Selecciones un Participante";
        vm.profile.patient = vm.patient._id;

        activate();

        function activate() {
            UserFactory.getAllUsers().then(function(result) {
                vm.users = result;
                console.log(vm.users);
            }, function() {
                $cordovaToast.showLongBottom("Ocurrió un error al recuperar la lista de usuarios, intentalo de nuevo");
            });
        }

        vm.assignProfile = function(){
            console.log(vm.profile);
            PatientFactory.assignProfile(vm.profile).then(function(result){
                console.log(result);
                $state.go("app.patientCurrentProfiles");
            },function(){
                $cordovaToast.showLongBottom("Ocurrió un error al asignar un participante al paciente, intentalo de nuevo");
            });
        };
    }
})();
