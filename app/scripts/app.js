/* jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

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
                "xeditable",
                "btford.socket-io",
                "TracsClient.controllers",
                "TracsClient.factories",
                "TracsClient.directives",
                "TracsClient.environment",
                "TracsClient.filters"
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
    // Declaración del módulos de filtros
    angular.module("TracsClient.filters", []);

    // Maneja el evento 'deviceready' para saber cuando se cargaron
    // todos los componentes de cordova y el dispositivo está listo.
    // Una vez que está todo cargado, se inicia el proceso de bootstrap
    // de la aplicación, donde se levantan los controllers, factories,
    // templates, etc.f
    // La idea de manejar este evento es evitar problemas a la hora de
    // cargar plugins de cordova u otras cosas que levantan de manera asincronica,
    // y que pueden ser requeridas por algún componente de Angular!
    document.addEventListener("deviceready", function () {
        angular.bootstrap(document, ["TracsClient"]);
    }, false);

    function run($ionicPlatform, editableOptions) {
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

        // Estilo para xeditable
        editableOptions.theme = "bs3"; // bootstrap3 theme. Can be also 'bs2', 'default'
    }

    function config($stateProvider, $urlRouterProvider, localStorageServiceProvider) {

        // Configuración del prefijo para el localStorage
        localStorageServiceProvider.setPrefix("tracs");

        // Configuración de estados y rutas
        $stateProvider

        /**
         * ==================================================================
         * ============ RUTEOS PARA EL SIGNIN (LOGIN Y PACIENTE) ============
         * ==================================================================
         */

        .state("signin", {
            url: "/signin",
            abstract: true,
            templateUrl: "templates/layout/signIn.html"
        })

        .state("signin.login", {
            url: "/login",
            views: {
                "signInContent": {
                    templateUrl: "templates/login/login.html",
                    controller: "LoginController as vm"
                }
            }
        })

        .state("signin.imAPatientLink", {
            url: "/imAPatient/link",
            views: {
                "signInContent": {
                    templateUrl: "templates/imAPatient/link.html",
                    controller: "ImAPatientLinkController as vm"
                }
            }
        })

        .state("logout", {
            cache: false,
            url: "/logout",
            controller: "LogoutController as vm"
        })

        /**
         * ==================================================================
         * =========== RUTEOS PARA EL USUARIO LOGUEADO CON GMAIL ============
         * ==================================================================
         */

        .state("app", {
            url: "/app",
            abstract: true,
            templateUrl: "templates/layout/userView.html",
            controller: "MenuController as vm"
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

        .state("app.patientWall", {
            url: "/patient/wall/:id",
            views: {
                "menuContent": {
                    templateUrl: "templates/patient/wall.html",
                    controller: "PatientWallController as vm"
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
        })

        .state("app.patientClosestPeople", {
            url: "/patient/closestPeople",
            cache: false,
            views: {
                "menuContent": {
                    templateUrl: "templates/patient/closestPeople.html",
                    controller: "PatientClosestPeopleController as vm"
                }
            }
        })

        .state("app.patientCurrentProfiles", {
            url: "/patient/currentProfiles",
            cache: false,
            views: {
                "menuContent": {
                    templateUrl: "templates/patient/currentProfiles.html",
                    controller: "PatientCurrentProfilesController as vm"
                }
            }
        })

        .state("app.patientAssignProfile", {
            url: "/patient/assignProfile",
            views: {
                "menuContent": {
                    templateUrl: "templates/patient/assignProfile.html",
                    controller: "PatientAssignProfileController as vm"
                }
            }
        })


        .state("app.patientChatRoom", {
            url: "patient/chatRoom",
            views: {
                "menuContent": {
                    templateUrl: "templates/chat/chatRoom.html",
                    controller: "PatientChatController as vm"
                }
            }
        })

        .state("app.patientContactInfoCreate", {
            url: "patient/contactInfoCreate",
            views: {
                "menuContent": {
                    templateUrl: "templates/patient/contactInfoCreate.html",
                    controller: "PatientContactInfoCreateController as vm"
                }
            }
        })

        .state("app.patientNotes", {
            url: "patient/notes",
            cache: false,
            views: {
                "menuContent": {
                    templateUrl: "templates/patient/notes.html",
                    controller: "PatientNotesController as vm"
                }
            }
        })

        .state("app.patientNotesCreate", {
            url: "patient/notesCreate",
            views: {
                "menuContent": {
                    templateUrl: "templates/patient/notesCreate.html",
                    controller: "PatientNotesCreateController as vm"
                }
            }
        })

        .state("app.patientNotesDisplay", {
            url: "patient/notesDisplay/:id",
            views: {
                "menuContent": {
                    templateUrl: "templates/patient/notesDisplay.html",
                    controller: "PatientNotesDisplayController as vm"
                }
            }
        })

        .state("app.patientDiagnosis", {
            url: "patient/diagnosis",
            cache: false,
            views: {
                "menuContent": {
                    templateUrl: "templates/patient/diagnosis.html",
                    controller: "PatientDiagnosisController as vm"
                }
            }
        })

        .state("app.patientDiagnosisCreate", {
            url: "patient/diagnosisCreate",
            views: {
                "menuContent": {
                    templateUrl: "templates/patient/diagnosisCreate.html",
                    controller: "PatientDiagnosisCreateController as vm"
                }
            }
        })

        .state("app.patientMedicationCreate", {
            url: "patient/medicationCreate/:id",
            views: {
                "menuContent": {
                    templateUrl: "templates/patient/medicationCreate.html",
                    controller: "PatientMedicationCreateController as vm"
                }
            }
        })

        .state("app.patientHistoryCreate", {
            url: "patient/historyCreate",
            views: {
                "menuContent": {
                    templateUrl: "templates/patient/historyCreate.html",
                    controller: "PatientHistoryCreateController as vm"
                }
            }
        })

        .state("app.geoAlertMap", {
            url: "map/geoAlertMap/:latitude/:longitude)",
            views: {
                "menuContent": {
                    templateUrl: "templates/map/geoAlertMap.html",
                    controller: "GeoAlertMapController as vm"
                }
            }
        })

        /**
         * =========================================================
         * =========== RUTEOS PARA LA VISTA DE PACIENTE ============
         * =========================================================
         */

        .state("patientView", {
            url: "/patientView",
            abstract: true,
            templateUrl: "templates/layout/patientView.html",
            controller: "MenuController as vm"
        })

        .state("patientView.imAPatientHome", {
            url: "/imAPatient/home",
            views: {
                "menuContent": {
                    templateUrl: "templates/imAPatient/home.html",
                    controller: "ImAPatientHomeController as vm"
                }
            }
        });

        // Si ninguno de lo states anteriores matchea, usa esta ruta como contingencia
        $urlRouterProvider.otherwise("/signin/login");
    }
}());
