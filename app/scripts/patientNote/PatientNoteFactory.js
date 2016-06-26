/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

/**
 * @ngdoc function
 * @name TracsClient.factories:PatientNoteFactory
 * @description
 * Factory para interactuar con la API REST de notas de pacientes de un usuario.
 * Provee las operaciones básicas CRUD
 */

(function () {
    "use strict";

    angular
        .module("TracsClient.factories")
        .factory("PatientNoteFactory", PatientNoteFactory);

    PatientNoteFactory.$inject = ["$http", "$log", "storage", "EnvironmentConfig"];

    function PatientNoteFactory($http, $log, storage, EnvironmentConfig) {

        var patientNoteEndpoint = EnvironmentConfig.api + "/patientNote";

        var service = {

            updatePatientNote: updatePatientNote,
            deletePatientNote: deletePatientNote

        };

        return service;

        function updatePatientNote(updatedNote, noteId){
             return $http.put(patientNoteEndpoint + "/updatePatientNote/"+ noteId, updatedNote).then(function (result) {
                return result.data;
            }, function(error) {
                $log.error("Ocurrió un error al modificar la nota del paciente " + noteId, error);
            });
        }

        function deletePatientNote(noteId){
             return $http.delete(patientNoteEndpoint + "/"+ noteId).then(function (result) {
                return result.data;
            }, function(error) {
                $log.error("Ocurrió un error al eliminar la nota del paciente " + noteId, error);
            });
        }


    }
})();
