/* jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

(function () {
    "use strict";

    angular
        .module("TracsClient.factories")
        .factory("UserFactory", UserFactory);

    UserFactory.$inject = ["$http", "$log", "EnvironmentConfig"];

    function UserFactory($http, $log, EnvironmentConfig) {
        var userEndpoint = EnvironmentConfig.api + "/user";

        var service = {
        };

        return service;



    }

})();
