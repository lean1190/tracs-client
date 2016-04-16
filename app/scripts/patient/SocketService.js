/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

(function(){

    "use strict";

    angular
        .module("TracsClient.controllers")
        .service("SocketService", SocketService);

    SocketService.inject = ["socketFactory","EnvironmentConfig"];

    function SocketService(socketFactory,EnvironmentConfig){
        return socketFactory({
            ioSocket: io.connect(EnvironmentConfig.chatSocket)
        });
    }
})();
