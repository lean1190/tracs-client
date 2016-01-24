/* jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

/**
 * @ngdoc overview
 * @name TracsClient
 * @description
 * Módulo principal de la aplicación, donde se inicializan los componentes
 * y se configuran las rutas de las vistas y controladores
 */

(function () {
    "use strict";

    angular
        .module("TracsClient", [
                "ionic",
                "ngResource",
                "ngCordova",
                "LocalStorageModule",
                "TracsClient.controllers",
                "TracsClient.factories",
                "TracsClient.directives"
        ])
        .run(run)
        .config(config)
        .constant("ServerUrl", "http://localhost:3000");

    // Declares the controllers module
    angular.module("TracsClient.controllers", []);
    // Declares the factories module
    angular.module("TracsClient.factories", []);
    // Declares the directives module
    angular.module("TracsClient.directives", []);

    function run($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    }

    function config($stateProvider, $urlRouterProvider, localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix("tracs");

        $stateProvider

            .state("app", {
            url: "/app",
            abstract: true,
            templateUrl: "templates/layout/menu.html"
        })

        .state("app.login", {
            url: "/login",
            views: {
                "menuContent": {
                    templateUrl: "templates/login/login.html",
                    controller: "LoginController as vm"
                }
            }
        })

        .state("app.patientCreate", {
            url: "/patientCreate",
            views: {
                "menuContent": {
                    templateUrl: "templates/patient/patientCreate.html",
                    controller: "PatientCreateController as vm"
                }
            }
        })

        .state("app.patientHome", {
            url: "/patientHome",
            views: {
                "menuContent": {
                    templateUrl: "templates/patient/patientHome.html",
                    controller: ""//"PatientHomeController as vm"
                }
            }
        })


        /*.state("app.treatmentCreate", {
            url: "/treatmentCreate",
            views: {
                "menuContent": {
                    templateUrl: "templates/treatment/treatmentCreate.html",
                    controller: "TreatmentCreateController as vm"
                }
            }
        })*/
/*
        .state("app.treatmentHome", {
            url: "/treatmentHome",
            views: {
                "menuContent": {
                    templateUrl: "templates/treatment/treatmentHome.html",
                    controller: "LoginController as vm" "TreatmentHomeController as vm"
                }
            }
        })*/


        .state("app.users", {
            url: "/users",
            views: {
                "menuContent": {
                    templateUrl: "templates/user/users.html",
                    controller: "UserFindAllController as vm"
                }
            }
        })

        .state("app.user", {
            url: "/users/:id",
            views: {
                "menuContent": {
                    templateUrl: "templates/user/user.html",
                    controller: "UserFindByIdController as vm"
                }
            }
        });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise("/app/login");
    }
}());
