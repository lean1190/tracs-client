/**
 * @ngdoc filter
 * @name TracsClient.filters:tenden d
 * @external https://github.com/hijonathan/moment.twitter
 * @description
 * Filtro que devuelve la fecha en formato twitter, tipo: 6 days
 */

(function () {
    "use strict";

    angular
        .module("TracsClient.filters")
        .filter("twitterDate", TwitterLikeDateFilter);

    TwitterLikeDateFilter.$inject = ["moment"];

    function TwitterLikeDateFilter(moment) {
        return function (inputDate) {
            return moment(inputDate).twitterLong();
        };
    }
}());
