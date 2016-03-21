/* jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular, console */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("UserFindByIdController", UserFindByIdController);

    UserFindByIdController.$inject = ["UserFactory", "$stateParams"];

    function UserFindByIdController(UserFactory, $stateParams) {
        var vm = this;
        vm.user = {};

        activate($stateParams.id);

        function activate(userId) {
            return findUserById(userId).then(function () {
                console.log("--> User found!");
            });
        }

        function findUserById(userId) {
            return UserFactory.findUserById(userId).then(function (user) {
                vm.user = user;
            }, function (err) {
                console.log(err);
            });
        }
    }

})();
