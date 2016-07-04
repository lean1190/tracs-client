/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientCurrentProfilesController", PatientCurrentProfilesController);

    PatientCurrentProfilesController.$inject = ["$stateParams", "$state", "$cordovaToast", "storage", "PatientFactory","MenuFactory","ProfileFactory"];

    function PatientCurrentProfilesController($stateParams, $state, $cordovaToast, storage, PatientFactory, MenuFactory,ProfileFactory) {

        var vm = this;

        vm.patient = storage.getLastVisitedPatient();
        vm.currentProfile = storage.getCurrentProfile();

        function activate() {

            MenuFactory.clearRightButtonAction();

            PatientFactory.getPatientProfiles(vm.patient._id).then(function(result) {
                vm.profiles = result;
            }, function() {
                $cordovaToast.showLongBottom("Ocurrió un error al recuperar la lista de usuarios, intentalo de nuevo");
            });

        }

        vm.deleteProfile = function(profileUser){
            ProfileFactory.deleteProfile(profileUser,vm.patient._id).then(function(){
                $cordovaToast.showLongBottom("Participante borrado correctamente");
                $state.reload();
            },function(){
                $cordovaToast.showLongBottom("Ocurrió un error al borrar al participante, intentalo de nuevo");
            });
        };

        activate();
     }
})();
