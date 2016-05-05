/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular, google */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("GeoAlertMapController", GeoAlertMapController);

    GeoAlertMapController.$inject = ["$stateParams", "$q", "$log", "$state", "$cordovaToast", "storage", "PatientFactory", "$cordovaGeolocation"];

    function GeoAlertMapController($stateParams, $q, $log, $state, $cordovaToast, storage, PatientFactory, $cordovaGeolocation) {

        var destination = [$stateParams.latitude, $stateParams.longitude],
            origin = [],
            vm = this;

        vm.patient = storage.getLastVisitedPatient();

        activate();

        function activate() {

            var directionsService = new google.maps.DirectionsService(),
                directionsDisplay = new google.maps.DirectionsRenderer(),
                map = new google.maps.Map(document.getElementById("map"), {
                    zoom: 7,
                    center: {
                        lat: 41.85,
                        lng: -87.65
                    }
                });

            directionsDisplay.setMap(map);

            getMyPosition().then(function () {
                calculateAndDisplayRoute(directionsService, directionsDisplay);
            });
        }

        function calculateAndDisplayRoute(directionsService, directionsDisplay) {

            directionsService.route({

                origin: origin,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING

            }, function (response, status) {

                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert("Directions request failed due to " + status);
                }
            });
        }

        function getMyPosition() {
            return $q(function (resolve, reject) {

                //Opciones para el metodo getCurrentPosition
                var options = {
                    timeout: 80000,
                    enableHighAccuracy: true,
                    maximumAge: 10000
                };

                $cordovaGeolocation.getCurrentPosition(options).then(function (position) {

                    //Seta latitud y longitud del origen
                    origin = [position.latitude, position.longitude];
                    resolve(origin);

                }, function (error) {
                    $log.error("Ocurrió un error al recuperar la posición del usuario, está habilitado el GPS?", error);
                    reject(error);
                });
            });
        }
    }

})();
