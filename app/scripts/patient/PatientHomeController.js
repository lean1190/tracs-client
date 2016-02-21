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

    PatientHomeController.$inject = ["PatientFactory","localStorageService"];

    function PatientHomeController(PatientFactory,localStorageService) {

        var vm = this;
        vm.patients = [];

        activate();

        function mockUserData() {
            var mockUser = {
                _id: "56986b129a1971d812b0050a",
                googleId: 8888,
                name: "Mock User",
                email: "mock@tracs.com.ar",
                picture: "http://sporkmarketing.com/wp-content/uploads/2015/12/user-experience.jpg",
                about: "Just a simple user for testing",
                phoneNumber: "1523582791",
                accessToken: "1Ai951j2klsdjf9107207hkjfasf",
                refreshToken: "998sd9fhjagwe31098sd_vsdjiwskga.comasfiw.awriuhus",
                profiles:[]
                /*patients : [
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
                        picture: "https://t2.kn3.net/taringa/1/9/3/4/9/9/Taringa_Power/9E5.jpg",
                        diagnosis: {
                            description: "Hasta tinelli y el maipo no para"
                        }
                    }
                ]*/
            };

            localStorageService.set("user", mockUser);
        }

        function activate() {

            // Mock data
            mockUserData();
            //console.log(localStorageService.get("user"));

/*            var sessionUser = localStorageService.get("user");
                vm.patients = sessionUser.patients;*/

            var userId = localStorageService.get("user")._id;
            PatientFactory.getPatients(userId).then(function(result) {
                console.log("$$$ result", result);
                console.log(result[0].patient[0].name);
                vm.patients = result;
            }, function(err) {
                console.log("$$$ rompiose", err);
            });

        }
    }

})();
