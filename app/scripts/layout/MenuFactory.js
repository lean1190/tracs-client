/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

/**
 * @ngdoc function
 * @name TracsClient.factories:MenuFactory
 * @description
 * Factory para manejar las operaciones sobre-escribibles del menú
 */

(function () {
    "use strict";

    angular
        .module("TracsClient.factories")
        .factory("MenuFactory", MenuFactory);

    MenuFactory.$inject = ["$rootScope", "$ionicPlatform"];

    function MenuFactory($rootScope, $ionicPlatform) {

        $rootScope.hasRightButtonAction = false;
        $rootScope.showChatButton = false;
        $rootScope.showAlertButton = false;

        var defaultRightButtonAction = function () {},
            defaultBackButtonAction = $rootScope.$ionicGoBack,
            deregisterHardBackButton = function () {};

        var service = {
            showRightButtonAction: showRightButtonAction,
            setRightButtonAction: setRightButtonAction,
            activateRightButtonAction: activateRightButtonAction,
            clearRightButtonAction: clearRightButtonAction,

            activateRightEditButtonAction: activateRightEditButtonAction,
            showRightEditButtonAction: showRightEditButtonAction,

            setBackButtonAction: setBackButtonAction,
            clearBackButtonAction: clearBackButtonAction
        };

        return service;

        /**
         * Vuelve el botón derecho del menú al estado
         * inicial, sin función y sin mostrarse
         */
        function clearRightButtonAction() {
            $rootScope.rightButtonAction = defaultRightButtonAction;
            $rootScope.hasRightButtonAction = false;
            $rootScope.hasRightEditButtonAction = false;
        }

        /**
         * Activa el flag que hace que se muestre
         * el botón de acción a la derecha
         */
        function showRightButtonAction() {
            $rootScope.hasRightButtonAction = true;
        }

         function showRightEditButtonAction() {
            $rootScope.hasRightEditButtonAction = true;
        }

        /**
         * Setea una acción para el botón derecho del menú
         * @param {function} action la acción que debe ejecutar el botón
         */
        function setRightButtonAction(action) {
            $rootScope.rightButtonAction = action;
        }

        /**
         * Setea la acción y muestra el botón derecho del menú
         * @param {function} action la acción que debe ejecutar el botón
         */
        function activateRightButtonAction(action) {
            setRightButtonAction(action);
            showRightButtonAction();
        }

        function activateRightEditButtonAction(action) {
            setRightButtonAction(action);
            showRightEditButtonAction();
        }

        /**
         * Vuelve el botón de atrás del menú al estado
         * inicial, con la función por defecto
         */
        function clearBackButtonAction() {
            $rootScope.$ionicGoBack = defaultBackButtonAction;
            deregisterHardBackButton();
        }

        /**
         * Setea una acción para el botón de atrás del menú
         * y para el botón físico del teléfono
         * @param {function} action la acción que debe ejecutar el botón
         */
        function setBackButtonAction(action) {
            var customBackButtonAction = function () {
                // Ejecuta la acción personalizada
                action();
                // Ejecuta la acción por default (ir atrás)
                defaultBackButtonAction();
                clearBackButtonAction();
            };

            // Registra la acción para el botón de atrás del menú
            $rootScope.$ionicGoBack = customBackButtonAction;

            // Registra la misma acción para el botón físico de atrás
            deregisterHardBackButton = $ionicPlatform.registerBackButtonAction(
                customBackButtonAction, 101
            );
        }

    }

})();
