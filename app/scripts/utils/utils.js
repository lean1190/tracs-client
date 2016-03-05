"use strict";

angular.module("TracsClient.utils").factory("utils", function () {
    var helper = helper || {};

    /**
     * Check if the object has a property
     * @param   {object}  object the object to check if empty
     * @returns {boolean} true if the object has no properties
     */
    helper.isEmptyObject = function (object) {
        for (var property in object) {
            if (object.hasOwnProperty(property)) {
                return false;
            }
        }

        return true;
    };

    /**
     * Check if a variable is empty, null, undefined or blank .
     * @param   {any type} variable the variable to check if empty
     * @returns {boolean}  true if the object is empty
     */
    helper.isEmpty = function (variable) {
        return (!variable || variable === null || typeof variable === "undefined" || variable === "" || variable === {} || this.isEmptyObject(variable));
    };

    return helper;
});
