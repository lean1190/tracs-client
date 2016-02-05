/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: nofunc */

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

    PatientHomeController.$inject = [];

    function PatientHomeController() {

        var vm = this;
        vm.patients = [];

        activate();

        function activate() {
            // Mock data
            vm.patients = [
                {
                    _id: "1",
                    name: "Juancito",
                    picture: "https://i1.sndcdn.com/artworks-000121970424-p9oirz-t500x500.jpg",
                    diagnosis: {
                        description: "Le gusta el arrrrrte"
                    }
                },
                {
                    _id: "2",
                    name: "Zulma",
                    picture: "http://www.sitiosargentina.com.ar/imagenes-2009/zulma-lobarto-5.jpg",
                    diagnosis: {
                        description: "Hasta tinelli y el maipo no para"
                    }
                }
            ];

        }
    }

})();
