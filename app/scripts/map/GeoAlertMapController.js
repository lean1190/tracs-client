/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular, google */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("GeoAlertMapController", GeoAlertMapController);

    GeoAlertMapController.$inject = ["$stateParams", "$q", "$log", "$state", "$cordovaToast", "storage", "PatientFactory", "$cordovaGeolocation"];

    function GeoAlertMapController($stateParams, $q, $log, $state, $cordovaToast, storage, PatientFactory, $cordovaGeolocation) {

        var destination = {
                lat: parseFloat($stateParams.latitude),
                lng: parseFloat($stateParams.longitude),
            },
            origin = {},
            vm = this;

        vm.patient = storage.getLastVisitedPatient();

        function calculateAndDisplayRoute(directionsDisplay, directionsService, markerArray) {

            var originLatLng = new google.maps.LatLng(origin.lat, origin.lng),
                destinationLatLng = new google.maps.LatLng(destination.lat, destination.lng);

            // First, remove any existing markers from the map.
            for (var i = 0; i < markerArray.length; i++) {
                markerArray[i].setMap(null);
            }

            directionsService.route({
                origin: originLatLng,
                destination: destinationLatLng,
                travelMode: google.maps.TravelMode.DRIVING
            }, function (response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                } else {
                    $cordovaToast.showLongBottom("No pudimos trazar el camino hasta el paciente. Está activado el GPS?");
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

                    // Setea latitud y longitud del origen
                    origin = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    resolve(origin);

                }, function (error) {
                    $log.error("Ocurrió un error al recuperar la posición del usuario, está habilitado el GPS?", error);
                    reject(error);
                });
            });
        }

        activate();

        function activate() {

            var markerArray = [],
                // Instantiate a directions service.
                directionsService = new google.maps.DirectionsService,
                // Create a map and center it on Manhattan.
                map = new google.maps.Map(document.getElementById("map"), {
                    zoom: 10,
                    center: {
                        lat: destination.lat,
                        lng: destination.lng
                    }
                }),

                // Create a renderer for directions and bind it to the map.
                directionsDisplay = new google.maps.DirectionsRenderer({
                    map: map
                });

            getMyPosition().then(function(myPosition) {
                origin = myPosition;
                calculateAndDisplayRoute(directionsDisplay, directionsService, markerArray, map);
            }, function (error) {
                $log.error(error);
            });
        }
    }

})();
