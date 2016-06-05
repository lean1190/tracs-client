(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientClosestPeopleController", PatientClosestPeopleController);

    PatientClosestPeopleController.$inject = ["$stateParams", "$state", "$cordovaToast", "storage", "PatientFactory","MenuFactory"];

    function PatientClosestPeopleController($stateParams, $state, $cordovaToast, storage, PatientFactory, MenuFactory) {

        var vm = this;

        vm.patient = {};
        vm.user = {};

        vm.contactP1Id = "";
        vm.contactP2Id = "";
        vm.contactP3Id = "";
        vm.contactP4Id = "";



        function activate() {

            console.log(vm.patient);
            vm.editOn = false;

            vm.patient = storage.getLastVisitedPatient();
            vm.user = storage.getUser();

            // Muestra el check para guardar al paciente
            MenuFactory.activateRightEditButtonAction(function () {
                 vm.editClosestPeople();
            });

            // Cuando apretamos atrás se borra el check y su funcionalidad
            MenuFactory.setBackButtonAction(function () {
                MenuFactory.clearRightButtonAction();
            });

         /* PatientFactory.getPatientProfiles(vm.patient._id).then(function (result) {
                vm.profiles = result;
                console.log(vm.profiles);
            }, function () {
                $cordovaToast.showLongBottom("Ocurrió un error al recuperar la lista de usuarios, intentalo de nuevo");
            });*/
        }

        vm.editClosestPeople = function(){

            vm.editOn = true;

            MenuFactory.clearRightButtonAction();

            MenuFactory.activateRightButtonAction(function () {
                vm.updateClosestPeople();
            });

            PatientFactory.getPatientProfiles(vm.patient._id).then(function (result) {
                vm.profiles = result;
                console.log(vm.profiles);
            }, function () {
                $cordovaToast.showLongBottom("Ocurrió un error al recuperar la lista de usuarios, intentalo de nuevo");
            });
        };

        vm.updateClosestPeople = function () {

            //Se arma el arreglo a añadirse como patient.closestPeople
            var closestPeople = [];

            closestPeople.push(getContactInformation(vm.contactP1Id, 1, vm.profiles));
            closestPeople.push(getContactInformation(vm.contactP2Id, 2, vm.profiles));
            closestPeople.push(getContactInformation(vm.contactP3Id, 3, vm.profiles));
            closestPeople.push(getContactInformation(vm.contactP4Id, 4, vm.profiles));

            PatientFactory.updateClosestPeople(closestPeople, vm.patient._id).then(function () {

                $cordovaToast.showLongBottom("Los contactos cercanos del paciente fueron modificados con exito!").then(function () {

                        MenuFactory.clearRightButtonAction();
                        $state.reload();

                });

            }, function () {
                $cordovaToast.showLongBottom("Ocurrió un error al modificar las personas cercanas del paciente, intentalo de nuevo");
            });

        };

        function getContactInformation(contactId, priority, profiles) {

            var contact = {

            };

            for (var i = 0; i < profiles.length; i++) {
                if (contactId === profiles[i].user._id) {
                    contact.personId = profiles[i].user._id;
                    contact.name = profiles[i].user.name;
                    contact.phoneNumber = profiles[i].user.phoneNumber;
                    contact.picture = profiles[i].user.picture;

                    contact.priority = priority;

                    return contact;
                }
            }

            // Si no se encontro quiere decir que el usuario seleccionado quedo en blanco, se hace uno dummy sin informacion. El person ID se setea por default con el id del usuario que esta modificando los datos.

            contact.personId = vm.user._id;
            contact.name = "Sin Asignar";
            contact.phoneNumber = "";
            contact.picture = "https://image.freepik.com/free-icon/cancel-call--ios-7-interface-symbol_318-34763.png";
            contact.priority = priority;

            return contact;
        }

        activate();
    }

})();
