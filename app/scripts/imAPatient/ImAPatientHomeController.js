/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

/**
 * @ngdoc function
 * @name TracsClient.controllers:ImAPatientHomeController
 * @description
 * Controlador que maneja la vista de paciente, esto incluye
 * el número telefónico de las personas cercanas y la posibilidad
 * de enviar un alerta georreferenciada
 */

(function() {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("ImAPatientHomeController", ImAPatientHomeController);


    ImAPatientHomeController.$inject = ["$scope", "$q", "$log", "$state", "$cordovaToast", "$cordovaGeolocation", "$ionicModal", "storage", "dialer", "sms", "ImAPatientFactory"];

    function ImAPatientHomeController($scope, $q, $log, $state, $cordovaToast, $cordovaGeolocation, $ionicModal, storage, dialer, sms, ImAPatientFactory) {

        var vm = this;

        vm.patient = storage.getPatientUser();
        vm.choosingSmsTemplate = false;
        vm.smsTemplates = [
            "Estoy bien :)",
            "Me siento mal :("
        ];

        vm.showFeedbackMessage = false;
        vm.feedbackMessage = "";

        function showConfirmationModal(message) {
            vm.feedbackMessage = message;
            vm.showFeedbackMessage = true;
        }

        vm.callPhoneNumber = function(phoneNumber) {

            if (phoneNumber !== "") {
                dialer.callNumber(function() {}, function(error) {
                    $log.error("No se pudo realizar la llamada al número " + phoneNumber, error);
                    $cordovaToast.showLongBottom("No se pudo realizar la llamada. Hay señal?");
                }, phoneNumber, false);
            } else {
                $cordovaToast.showLongBottom("Esta persona no tiene teléfono");
            }
        };

        vm.sendSms = function(smsText, phoneNumber) {

            if (phoneNumber !== "") {
                var options = {
                    android: {
                        intent: "" // send SMS without open any other app || 'INTENT' send SMS with the native android SMS messaging
                    }
                };

                sms.send(phoneNumber, smsText, options, function() {
                    vm.choosingSmsTemplate = false;
                    showConfirmationModal("Alguien se comunicará pronto con vos");
                }, function(error) {
                    $log.error("No se pudo enviar el sms al número " + phoneNumber, error);
                    $cordovaToast.showLongBottom("No se pudo enviar el mensaje. Hay señal?");
                });
            } else {
                $cordovaToast.showLongBottom("Esta persona no tiene teléfono");
            }

        };

        // Importante: Prender el GPS del emulador
        vm.sendGeoAlert = function() {
            ImAPatientFactory.sendGeoAlertAtMyPosition(vm.patient._id).then(function() {
                showConfirmationModal("Pronto recibirás ayuda");
            }, function() {
                $cordovaToast.showLongBottom("No pudimos localizarte, está activado el GPS?");
            });
        };

    }
})();
