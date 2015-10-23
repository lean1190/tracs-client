'use strict';

/**
 * @ngdoc constant
 * @name TracsClient.API_ENDPOINT
 * @description
 * # API_ENDPOINT
 * Defines the API endpoint where our resources will make requests against.
 * Is used inside /services/ApiService.js to generate correct endpoint dynamically
 */


angular.module('TracsClient')

// development
.constant('API_ENDPOINT', {
    host: 'http://localhost',
    port: 3000,
    path: '',
    needsAuth: false,
    fullPath: function() {
        return this.host + this.port;
    }
});


// live example with HTTP Basic Auth
/*
.constant('API_ENDPOINT', {
  host: 'http://yourserver.com',
  path: '/api/v2',
  needsAuth: true,
  username: 'whatever',
  password: 'foobar'
});
*/
