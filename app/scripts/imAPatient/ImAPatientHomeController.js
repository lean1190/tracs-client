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

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("ImAPatientHomeController", ImAPatientHomeController);


    ImAPatientHomeController.$inject = ["$scope", "$q", "$log", "$state", "$cordovaToast", "$cordovaGeolocation", "$ionicPopup", "storage", "dialer", "sms", "ImAPatientFactory"];

    function ImAPatientHomeController($scope, $q, $log, $state, $cordovaToast, $cordovaGeolocation, $ionicPopup, storage, dialer, sms, ImAPatientFactory) {

        var vm = this;

        vm.patient = storage.getPatientUser();
        vm.patientPosition = {};

        function chooseSmsTemplate() {
            $scope.templates = [
                { label: "Necesito ayuda", message: "Necesito ayuda, por favor vení" },
                { label: "Me siento bien", message: "Me siento bien :)" }
            ];
            $scope.message = {};

            return $ionicPopup.show({
                template:
                '<select ng-model="message" ng-options="template.message as template.label for template in templates" style="width: 100%;">' +
                    '<option value="">- Cómo te sentís? -</option>' +
                '</select>',

                title: "Elegí un texto para el mensaje",
                scope: $scope,
                buttons: [
                    {
                        text: "Enviar mensaje",
                        type: "button-positive",
                        onTap: function () {
                            console.log("### scope message", $scope.message);
                            return $scope.message;
                        }
                    }
                ]
            });
        }

        vm.callPhoneNumber = function (phoneNumber) {

            if (phoneNumber !== "") {
                dialer.callNumber(function () {}, function (error) {
                    $log.error("No se pudo realizar la llamada al número " + phoneNumber, error);
                    $cordovaToast.showLongBottom("No se pudo realizar la llamada! Hay señal?");
                }, phoneNumber, false);
            } else {
                $cordovaToast.showLongBottom("Esta persona no tiene teléfono");
            }
        };

        vm.sendSms = function (phoneNumber) {

            if (phoneNumber !== "") {

                chooseSmsTemplate().then(function(smsTemplate) {
                    console.log("### SMS template", smsTemplate);
                });

                /*var options = {
                    android: {
                        intent: "" // send SMS without open any other app || 'INTENT' send SMS with the native android SMS messaging
                    }
                };

                sms.send(phoneNumber, "Mensaje desde tracs!", options, function () {
                    $cordovaToast.showLongBottom("Mensaje enviado!");
                }, function (error) {
                    $log.error("No se pudo enviar el sms al número " + phoneNumber, error);
                    $cordovaToast.showLongBottom("No se pudo enviar el mensaje! Hay señal?");
                });*/
            } else {
                $cordovaToast.showLongBottom("Esta persona no tiene teléfono");
            }

        };

        // Importante: Prender el GPS del emulador
        vm.sendGeoAlert = function () {

            var options = {
                timeout: 80000,
                enableHighAccuracy: true,
                maximumAge: 10000
            };

            $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
                vm.patientPosition = position.coords;
                vm.patientPosition.timestamp = position.timestamp;

                ImAPatientFactory.sendGeoAlert(vm.patientPosition, vm.patient._id).then(function () {
                    $cordovaToast.showLongBottom("Tu alerta fue enviada correctamente, pronto serás contactado");
                }, function () {
                    $cordovaToast.showLongBottom("Ocurrió un error al enviar la alerta, intentalo de nuevo");
                });
            }, function (error) {
                $cordovaToast.showLongBottom("No pudimos localizarte, está activado el GPS?");
                $log.error("Ocurrió un error al recuperar la posición del paciente", error);
            });
        };

    }
})();
