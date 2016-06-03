/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

/**
 * @ngdoc function
 * @name TracsClient.controllers:PatientHomeController
 * @description
 * Controlador que despliega la lista de pacientes del usuario
 */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientHomeController", PatientHomeController);

    PatientHomeController.$inject = ["$scope", "$log", "$state", "$q", "$rootScope", "$cordovaToast", "$ionicPopup", "$ionicHistory", "storage", "utils", "sim", "PatientFactory", "UserFactory"];

    function PatientHomeController($scope, $log, $state, $q, $rootScope, $cordovaToast, $ionicPopup, $ionicHistory, storage, utils, sim, PatientFactory, UserFactory) {

        var vm = this,
            loggedInUser = storage.getUser();

        vm.patients = [];

        /**
         * Actualiza el número de teléfono del usuario logueado, tanto el localStorage como en el servidor
         * @param {string} newPhoneNumber el número de teléfono del usuario
         */
        function updateUserPhoneNumber(newPhoneNumber) {
            loggedInUser.phoneNumber = newPhoneNumber;
            storage.setUser(loggedInUser);

            var updatedUser = {
                _id: loggedInUser._id,
                phoneNumber: newPhoneNumber
            };

            UserFactory.updateUserProfile(updatedUser);
        }

        /**
         * Muestra al usuario un popup con un input para que ingrese
         * su numero de teléfono
         * @returns {promise} una promesa con el numero ingresado por el usuario
         */
        function promptUserPhoneNumber() {
            return $q(function (resolve) {
                $scope.data = {};
                $ionicPopup.show({
                    template: "<input type='text' placeholder='Ej: 2215238491' class='popup-input' ng-model='data.inputPhoneNumber'>",
                    title: "Ingresá tu teléfono",
                    subTitle: "Así se podrán comunicar con vos",
                    scope: $scope,
                    buttons: [
                        {
                            text: "Listo!",
                            type: "button-positive",
                            onTap: function (event) {
                                if (!$scope.data.inputPhoneNumber) {
                                    // Previene que el usuario cierre la ventana a menos que complete el teléfono
                                    event.preventDefault();
                                } else {
                                    resolve($scope.data.inputPhoneNumber);
                                }
                            }
                        }
                    ]
                });
            });
        }

        /**
         * Verifica que el usuario logueado tenga el número de teléfono cargado
         * Si no lo tiene se intentará recuperar desde la SIM,
         * o se le pide al usuario que lo ingrese manualmente
         */
        function checkUserPhoneNumber() {
            if (utils.isEmpty(loggedInUser.phoneNumber)) {
                sim.getSimInfo(function (simInfo) {
                    $log.info("Se recupero el telefono desde la SIM!", simInfo.phoneNumber);
                    updateUserPhoneNumber(simInfo.phoneNumber);
                }, function (error) {
                    // El prompt al usuario no estoy seguro que tenga que ir en el error,
                    // tal vez si no lo pudo recuperar va por success y lo devuelve vacio o null
                    // Hay que probarlo o abordar ambos escenarios
                    $log.error("No se pudo recuperar el número de teléfono desde la SIM, se le pedirá al usuario que lo ingrese", error);
                    promptUserPhoneNumber().then(function(newPhoneNumber) {
                        updateUserPhoneNumber(newPhoneNumber);
                    });
                });
            }
        }

        /**
         * Setea la próxima vista para que sea la raíz del stack de navegación,
         * de manera que no se muestre el back button y no se pueda volver al login
         */
        function setNextViewAsHistoryRoot() {
            $ionicHistory.nextViewOptions({
                historyRoot: true
            });
        }

        /**
         * Redirige al muro de un paciente pasado por parámetro
         * @param {number} patientId el id del paciente
         */
        vm.changeStateToPatientWall = function(patientId) {
            // Emite un evento indicando que salio del listado de usuarios
            $rootScope.$emit("state.changed.patientHome", false);

            setNextViewAsHistoryRoot();
            $state.go("app.patientWall", { id: patientId });
        };

        function activate() {

            // Emite un evento indicando estoy en el home de pacientes
            // para actualizar el menú
            $rootScope.$emit("state.changed.patientHome", true);

            // Para evitar navegación rara de la aplicación,
            // borra el historial cada vez que entra a esta pantalla
            $ionicHistory.clearHistory();

            // Verifica que el usuario logueado tenga el número de teléfono cargado
            checkUserPhoneNumber();

            var userId = loggedInUser._id;
            // Recupera todos los pacientes asociados al usuario
            PatientFactory.getPatients(userId).then(function (result) {
                vm.profiles = result;
            }, function () {
                $cordovaToast.showLongBottom("Ocurrió un error al recuperar la lista de pacientes, intentalo de nuevo");
            });

        }

        activate();
    }

})();
