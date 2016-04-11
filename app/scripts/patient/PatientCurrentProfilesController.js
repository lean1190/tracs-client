/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientCurrentProfilesController", PatientCurrentProfilesController);

    PatientCurrentProfilesController.$inject = ["$stateParams", "$state", "$cordovaToast", "localStorageService", "PatientFactory", "UserFactory"];

    function PatientCurrentProfilesController($stateParams, $state, $cordovaToast, localStorageService, PatientFactory, UserFactory) {

        var vm = this;

        vm.patient = localStorageService.get("lastVisitedPatient");

        activate();

        function activate() {

            PatientFactory.getPatientProfiles(vm.patient._id).then(function(result) {
                vm.profiles = result;
                console.log(vm.profiles);
            }, function() {
                $cordovaToast.showLongBottom("Ocurrió un error al recuperar la lista de usuarios, intentalo de nuevo");
            });

        }

     }
})();
