'use strict';

/**
 * @ngdoc overview
 * @name TracsClient
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */


(function() {
    angular
        .module("TracsClient", [
                "ionic",
                "ngResource",
                "ngCordova",
                "angularSpinners",
                "TracsClient.controllers",
                "TracsClient.factories"
        ])
        .run(run)
        .config(config);

    // Declares the controllers module
    angular.module("TracsClient.controllers", []);
    // Declares the factories module
    angular.module("TracsClient.factories", []);

    function run($ionicPlatform) {
        "use strict";

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

    function config($stateProvider, $urlRouterProvider) {
        "use strict";

        $stateProvider

        .state("app", {
            url: "/app",
            abstract: true,
            templateUrl: "templates/layout/menu.html"
        })

        .state("app.mierda", {
            url:"/mierda",
            views: {
                "menuContent": {
                    templateUrl: "templates/login/login.html",
                    controller: "UserFindAllController as vm"
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
        });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise("/app/mierda");
    }
}());


