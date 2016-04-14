(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientEditClosestPeopleController", PatientEditClosestPeopleController);

    PatientEditClosestPeopleController.$inject = ["$stateParams", "$state", "$cordovaToast", "localStorageService", "PatientFactory"];

    function PatientEditClosestPeopleController($stateParams, $state, $cordovaToast, localStorageService, PatientFactory) {

        var vm = this;

        vm.patient = localStorageService.get("lastVisitedPatient");

        vm.contactP1Id ="";
        vm.contactP2Id ="";
        vm.contactP3Id ="";
        vm.contactP4Id ="";

        activate();

        function activate() {
            PatientFactory.getPatientProfiles(vm.patient._id).then(function(result) {
                vm.profiles = result;
            }, function() {
                $cordovaToast.showLongBottom("Ocurrió un error al recuperar la lista de usuarios, intentalo de nuevo");
            });
        }

        function getContactInformation(contactId, priority,profiles){

            for (var i=0; i < profiles.length; i++) {
                if (contactId == profiles[i].user._id) {

                    var contact = {};

                    contact.personId = profiles[i].user._id;
                    contact.name = profiles[i].user.name;
                    contact.phoneNumber = profiles[i].user.phoneNumber;
                    contact.picture = profiles[i].user.picture
                    contact.priority = priority;

                    return contact;
                }
            }
        };

        vm.editClosestPeople = function(){

            //Se arma el arreglo a añadirse como patient.closestPeople
            var closestPeople = [];

            closestPeople.push(getContactInformation(vm.contactP1Id, 1,vm.profiles));
            closestPeople.push(getContactInformation(vm.contactP2Id, 2,vm.profiles));
            closestPeople.push(getContactInformation(vm.contactP3Id, 3,vm.profiles));
            closestPeople.push(getContactInformation(vm.contactP4Id, 4,vm.profiles));

            PatientFactory.updateClosestPeople(closestPeople, vm.patient._id).then(function(result){
                    $state.go("app.patientDetail");
                },function(){
                    $cordovaToast.showLongBottom("Ocurrió un error al modificar las personas cercanas del paciente, intentalo de nuevo");
                }
            );

        }
    }
})();
