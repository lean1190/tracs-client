/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientChatController", PatientChatController);

    PatientChatController.$inject = ["$stateParams", "$state", "$cordovaToast", "$ionicHistory", "storage", "PatientFactory","SocketService", "moment", "$ionicScrollDelegate" ];

    function PatientChatController($stateParams, $state, $cordovaToast, $ionicHistory, storage, PatientFactory, SocketService, moment, $ionicScrollDelegate) {

        var vm = this;

        vm.patient = storage.getLastVisitedPatient();
        vm.user = storage.getUser();

        vm.messages = [];

        activate();

        function activate(){

            vm.currentRoom = "room_"+vm.patient._id;
            vm.currentUser = vm.user.name;

            var room = {
                'room_name': vm.currentRoom,
                'userInfo':{
                    "name": vm.user.name,
                    "id": vm.user._id,
                    "picture":vm.user.picture
                }
            };

            SocketService.emit('join:room', room);

        };

        //This uses the moment.js library to format the timestamp in a standard way.
        vm.humanize = function(timestamp){
            return moment(timestamp).fromNow();
        };

        //Attach the isNotCurrentUser function to the current scope that checks if the user supplied as the argument is the same as the current user. It returns a different string based on the result used in the view so that the message container for the current user is styled differently.
        vm.isNotCurrentUser = function(user){

            if(vm.currentUser != user){
                return 'not-current-user';
            }
            return 'current-user';
        };

        //It executes when the user clicks on the button for sending the message. This constructs an object containing the name of the current room, current user and the actual message. We then push it to the messages array so that it can be immediately seen by the user. And then call the scrollBottom function in the $ionicScrollDelegate to scroll down the page. Next, we assign an empty string to the message so that the contents of the text field gets deleted. Finally, we send the object.
        vm.sendTextMessage = function(){
            var msg = {
                'room': vm.currentRoom,
                'user': vm.currentUser,
                'text': vm.message,
                'time': moment()
            };
            vm.messages.push(msg);
            $ionicScrollDelegate.scrollBottom();

            vm.message = '';

            SocketService.emit('send:message', msg);
        };

        //The leaveRoom function leaves the room, sending a leave:room message to the server so that the current user is removed from the current room, sending the name of the user leaving the room.
        vm.leaveRoom = function(){
            var msg = {
                'id': vm.user._id,
                'user': vm.currentUser,
                'room': vm.currentRoom,
                'time': moment()
            };

            SocketService.emit('leave:room', msg);
            SocketService.removeAllListeners();
            //$state.go('app.patientWall');
        };

        //This listens for messages sent by other users in the room. When a message is received, we push it to the messages array so that it’s displayed in the view.
        SocketService.on('message', function(msg){
            vm.messages.push(msg);
            $ionicScrollDelegate.scrollBottom();

        });

        SocketService.on('chat:members', function(chatMembers){
                vm.chatMembers = chatMembers;
                console.log(vm.chatMembers);
        });
    }
})();
