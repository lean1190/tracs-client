/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

/**
 * @ngdoc function
 * @name TracsClient:factories
 * @description
 * Factory para mapear un tipo de notificacion con
 * un icono y un link a un estado
 */

(function () {
    "use strict";

    angular
        .module("TracsClient.factories")
        .factory("NotificationsMapper", NotificationsMapper);

    NotificationsMapper.$inject = [];

    function NotificationsMapper() {

        var notificationsInfo = {
            "patient.profile.added": {
                icon: "ion-android-person-add",
                link: "app.patientCurrentProfiles"
            },
            "patient.detail.updated": {
                icon: "ion-android-happy",
                link: "app.patientDetail"
            },
            "patient.opinion.updated": {
                icon: "ion-android-chat",
                link: "app.patientDetail"
            },
            "patient.contacts.updated": {
                icon: "ion-android-call",
                link: "app.patientEditClosestPeople"
            },
            "patient.geoAlert.added":{
                icon:"ion-alert-circled",
                link:"app.patientWall"
            }
        };

        var service = {
            getNotificationInfoForType: getNotificationInfoForType
        };

        return service;

        /**
         * Dado un tipo de notificacion devuelve un objeto con un icono y un link
         * @param   {string} notificationType el tipo de notificacion (debe estar declarado en notificationsInfo)
         * @returns {object} el objeto con la información de la notificación
         */
        function getNotificationInfoForType(notificationType) {
            if(notificationsInfo[notificationType]) {
                return notificationsInfo[notificationType];
            }

            return {icon: "", link: ""};
        }
    }

})();
