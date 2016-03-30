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
            updateUserProfile: updateUserProfile
        };

        return service;

        function updateUserProfile(updatedUser) {
            return $http.put(userEndpoint + "/" + updatedUser._id, updatedUser).then(function (result) {
                return result.data;
            }, function (error) {
                $log.error("Ocurrió un error al modificar los datos del usuario " + updatedUser.id, error);
            });
        }

    }

})();
