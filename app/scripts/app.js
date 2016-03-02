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
                "TracsClient.directives",
                "TracsClient.environment"
        ])
        .run(run)
        .config(config);

    // Declaración del módulo de controllers
    angular.module("TracsClient.controllers", []);
    // Declaración del módulo de factories
    angular.module("TracsClient.factories", []);
    // Declaración del módulo de directivas
    angular.module("TracsClient.directives", []);
    // Declaración del módulos de constantes de environment
    angular.module("TracsClient.environment", []);

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
            cache: false,
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
            cache: false,
            url: "/patient/home",
            views: {
                "menuContent": {
                    templateUrl: "templates/patient/home.html",
                    controller: "PatientHomeController as vm"
                }
            }
        })

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
        })

        // ========== Im a patient states

        .state("app.imAPatientLink", {
            url: "/imAPatient/link",
            views: {
                "menuContent": {
                    templateUrl: "templates/imAPatient/link.html",
                    controller: "ImAPatientLinkController as vm"
                }
            }
        })

        .state("app.imAPatientHome", {
            url: "/imAPatient/home",
            views: {
                "menuContent": {
                    templateUrl: "templates/imAPatient/home.html",
                    controller: "ImAPatientHomeController as vm"
                }
            }
        })

        .state("app.patientDetail", {
            url: "/patient/:id",
            views: {
                "menuContent": {
                    templateUrl: "templates/patient/detail.html",
                    controller: "PatientDetailController as vm"
                }
            }
        });

        // Si ninguno de lo states anteriores matchea, usa esta ruta como contingencia
        $urlRouterProvider.otherwise("/app/login");
    }
}());
