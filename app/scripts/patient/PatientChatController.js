/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientChatController", PatientChatController);

    PatientChatController.$inject = ["$stateParams", "$state", "$cordovaToast", "$ionicHistory", "storage", "PatientFactory","SocketService", "moment", "$ionicScrollDelegate" ];

    function PatientChatController($stateParams, $state, $cordovaToast, $ionicHistory, storage, PatientFactory, SocketService, moment, $ionicScrollDelegate) {

        var vm = this;

        vm.patient = storage.getPatientUser();
        vm.user = storage.getUser();
        vm.messages = [];

        activate();

        activate = function(){

            vm.currentRoom = vm.patient.name;
            var currentUser = vm.user.name;
        };

        //This uses the moment.js library to format the timestamp in a standard way.
        vm.humanize = function(timestamp){
            return moment(timestamp).fromNow();
        };


        vm.isNotCurrentUser = function(user){

            if(current_user != user){
                return 'not-current-user';
            }
            return 'current-user';
        };

        vm.sendTextMessage = function(){
            var msg = {
                'room': vm.current_room,
                'user': current_user,
                'text': vm.message,
                'time': moment()
            };
            vm.messages.push(msg);
            $ionicScrollDelegate.scrollBottom();

            vm.message = '';

            SocketService.emit('send:message', msg);
        };

        //The leaveRoom function leaves the room, sending a leave:room message to the server so that the current user is removed from the current room, sending the name of the user leaving the room.
        $scope.leaveRoom = function(){
            var msg = {
                'user': current_user,
                'room': vm.current_room,
                'time': moment()
            };

            SocketService.emit('leave:room', msg);
            $state.go('rooms');
        };

        //This listens for messages sent by other users in the room. When a message is received, we push it to the messages array so that it’s displayed in the view.
        SocketService.on('message', function(msg){
            vm.messages.push(msg);
            $ionicScrollDelegate.scrollBottom();
        });
    }
})();
