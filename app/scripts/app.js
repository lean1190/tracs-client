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
                //,"ionic-datepicker"
        ])
        .run(run)
        .config(config)
        // Acomodar según la url correspondiente
        .constant("ServerUrl", "http://192.168.0.130:3000");

    // Declaración del módulo de controllers
    angular.module("TracsClient.controllers", []);
    // Declaración del módulo de factories
    angular.module("TracsClient.factories", []);
    // Declaración del módulo de directivas
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
            templateUrl: "templates/layout/menu.html",
            controller: "MenuController as vm"
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

        .state("app.logout", {
            url: "/logout",
            views: {
                "menuContent": {
                    controller: "LogoutController as vm"
                }
            }
        })

        .state("app.patientCreate", {
            url: "/patient/create",
            views: {
                "menuContent": {
                    templateUrl: "templates/patient/create.html",
                    controller: "PatientCreateController as vm"
                }
            }
        })

        .state("app.patientHome", {
            url: "/patient/home",
            views: {
                "menuContent": {
                    templateUrl: "templates/patient/home.html",
                    controller: "PatientHomeController as vm"
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

        // Si ninguno de lo states anteriores matchea, usa esta ruta como contingencia
        $urlRouterProvider.otherwise("/app/login");
    }
}());
