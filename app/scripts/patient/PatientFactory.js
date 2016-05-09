/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

/**
 * @ngdoc function
 * @name TracsClient.factories:PatientFactory
 * @description
 * Factory para interactuar con la API REST de pacientes de un usuario.
 * Provee las operaciones básicas CRUD
 */

(function () {
    "use strict";

    angular
        .module("TracsClient.factories")
        .factory("PatientFactory", PatientFactory);

    PatientFactory.$inject = ["$http", "$log", "storage", "EnvironmentConfig"];

    function PatientFactory($http, $log, storage, EnvironmentConfig) {

        var patientEndpoint = EnvironmentConfig.api + "/patient";

        var service = {

            getPatients: getPatients,
            getPatientDetail: getPatientDetail,
            getPatientProfiles: getPatientProfiles,
            getSelectableUsers: getSelectableUsers,
            getNotifications: getNotifications,
            getPatientOpinions: getPatientOpinions,
            getPatientNotes: getPatientNotes,
            getPatientNote: getPatientNote,
            getPatientDiagnosis: getPatientDiagnosis,
            createPatient: createPatient,
            updatePatientDetail: updatePatientDetail,
            updateClosestPeople: updateClosestPeople,
            assignProfile: assignProfile,
            addPatientOpinion: addPatientOpinion,
            addPatientNote: addPatientNote,
            addPatientDiagnosis: addPatientDiagnosis,

        };

        return service;

        /**
         * Recupera todos los pacientes de un usuario
         * @param   {number}  userId el id del usuario
         * @returns {promise} una promesa con todos los pacientes del usuario
         */
        function getPatients(userId) {

            return $http.get(patientEndpoint + "/user/" + userId).then(function (result) {
                return result.data;
            }, function (error) {
                $log.error("Ocurrió un error al recuperar los pacientes del usuario con id " + userId, error);
                return error;
            });
        }


        /**
         * Recupera la toda la información del paciente indicado y lo guarda en el localStorage
         * @param   {number} patientId ID del paciente
         * @returns {promise} una promesa con los detalles del paciente
         */
        function getPatientDetail(patientId) {

            return $http.get(patientEndpoint + "/detail/" + patientId).then(function (result) {
                storage.setLastVisitedPatient(result.data);
                return result.data;
            }, function (error) {
                $log.error("Ocurrió un error al recuperar los pacientes del usuario con id " + patientId, error);
            });
        }

        /**
         * Recupera los participantes asignados a un paciente
         * @param   {number}  patientId el ID de un paciente
         * @returns {promise} una promesa con todos los participantes asociados al paciente
         */
        function getPatientProfiles(patientId) {

            return $http.get(patientEndpoint + "/profiles/" + patientId).then(function (result) {
                return result.data;
            }, function (error) {
                $log.error("Ocurrió un error al obtener los participantes del paciente", error);
            });

        }

        /**
         * Recuperar un arreglo con los usuarios que pueden ser asignados
         * como participantes del tratamiento
         * @param   {number}  patientId el id del paciente
         * @returns {promise} una promesa con los usuarios recuperados
         */
        function getSelectableUsers(patientId) {

            return $http.get(patientEndpoint + "/selectableUsers/" + patientId).then(function (result) {
                return result.data;
            }, function (error) {
                $log.error("Ocurrió un error al obtener los participantes disponibles a seleccionar", error);
            });

        }

        /**
         * Recupera las notificaciones de un paciente
         * @param   {number}  patientId el id del paciente
         * @returns {promise} una promesa con las notificaciones
         */
        function getNotifications(patientId) {

            return $http.get(patientEndpoint + "/notifications/" + patientId).then(function (notifications) {
                return notifications.data;
            }, function (error) {
                $log.error("Ocurrió un error al obtener las notificaciones", error);
            });

        }

        /**
         * Recupera las opiniones de un paciente
         * @param   {number}  patientId el id del paciente
         * @returns {promise} una promesa con las opiniones
         */
        function getPatientOpinions(patientId){
            return $http.get(patientEndpoint + "/patientOpinions/"+ patientId).then(function(result){
                return result.data;
            }, function (error) {
                $log.error("Ocurrió un error al obtener las opiniones del paciente " + patientId, error);
            });
        }

        /**
         * Recupera las notas personales del usuario sobre un paciente
         * @param   {number} patientId id del paciente del cual se quieren recuperar las notas
         * @param   {number} userId    id del usuario que quiere recuperar las notas de su paciente
         * @returns {promise} una promesa con las notas sobre el paciente
         */
        function getPatientNotes(patientId, userId){

            return $http.get(patientEndpoint + "/patientNotes/" + patientId +"/"+userId).then(function (result) {
                return result.data;
            }, function (error) {
                $log.error("Ocurrió un error al obtener las notas sobre el paciente", error);
            });
        }


        /**
         * Recupera una nota especifica
         * @param   {number}  noteId Id de la nota a buscar
         * @returns {promise} una promesa con la informacion de la nota
         */
        function getPatientNote(noteId){

            return $http.get(patientEndpoint + "/patientNote/"+noteId).then(function (result) {
                return result.data;
            }, function (error) {
                $log.error("Ocurrió un error al obtener la nota sobre el paciente", error);
            });
        }

        /**
         * Recupera el diagnostico del paciente
         * @param   {number}  patientId id del paciente del cual quiero obtener el diagnostico
         * @returns {promise} una promesa con la informacion del diagnostico
         */
        function getPatientDiagnosis(patientId){

            return $http.get(patientEndpoint + "/patientDiagnosis/"+patientId).then(function (result) {
                return result.data;
            }, function (error) {
                $log.error("Ocurrió un error al obtener el diagnostico del paciente", error);
            });
        }

        /**
         * Crea un paciente nuevo para un usuario
         * @param   {object}  newPatient un objeto con los datos del nuevo paciente
         * @param   {number}  creatorId  el id del usuario creador
         * @returns {promise} una promesa con el nuevo usuario
         */
        function createPatient(newPatient, creatorId) {
            newPatient.admin = creatorId;

            return $http.post(patientEndpoint, newPatient).then(function (result) {
                return result.data;
            }, function (error) {
                $log.error("Ocurrió un error al crear el paciente", error);
            });
        }

        /**
         * Agrega un diagnostico sobre un paciente
         * @param   {number} patientId    id del paciente al cual se le esta definiendo un diagnostico
         * @param   {object} newDiagnosis nuevo diagnostico a asignar
         * @returns {promise} una promesa con la informacion del paciente modificado
         */
        function addPatientDiagnosis(patientId,newDiagnosis) {

            return $http.put(patientEndpoint + "/addPatientDiagnosis/" + patientId, newDiagnosis).then(function (result) {
                return result.data;
            }, function (error) {
                $log.error("Ocurrió un error al crear el diagnostico del paciente", error);
            });
        }

        /**
         * Modifica los detalles del paciente
         * @param   {object}   updatedPatient el paciente con los datos a actualizados
         * @returns {promise} una promesa con el paciente modificado
         */
        function updatePatientDetail(updatedPatient) {

            return $http.put(patientEndpoint + "/" + updatedPatient._id, updatedPatient).then(function (result) {
                return result.data;
            }, function (error) {
                $log.error("Ocurrió un error al modificar los pacientes del usuario con id " + updatedPatient.id, error);
            });
        }

        /**
         * Modifica las personas mas cercanas de un paciente
         * @param   {array}   closestPeople conjunto de usuarios a ser asignados como personas cercanas
         * @returns {promise} una promesa con el paciente modificado
         */
        function updateClosestPeople(closestPeople, patientId){
             return $http.put(patientEndpoint + "/updatePatientClosestPeople/"+ patientId, closestPeople).then(function (result) {
                return result.data;
            }, function(error) {
                $log.error("Ocurrió un error al modificar las personas cercanas del paciente con id " + patientId, error);
            });
        }

        /**
         * Asigna un nuevo perfil al paciente
         * @param   {object}   newProfile nuevo perfil a asignar
         * @returns {promise} una promsea con el paciente modificado
         */
        function assignProfile(newProfile) {

            return $http.put(patientEndpoint + "/addProfileToPatient/" + newProfile.patient, newProfile).then(function (result) {
                return result.data;
            }, function (error) {
                $log.error("Ocurrió un error al agregar un participante al tratamiento del paciente con id " + newProfile.patient, error);
            });
        }

        /**
         * Agrega una nueva opinion sobre un paciente
         * @param   {object}  newOpinion Nueva opinion a ser agregada
         * @param   {number}  patientId el id del paciente al cual se le va a asignar la opinion
         * @returns {promise} una promesa con el paciente modificado
         */
        function addPatientOpinion(newOpinion, patientId){
            return $http.put(patientEndpoint + "/addPatientOpinion/"+ patientId, newOpinion).then(function (result) {
                return result.data;
            }, function (error) {
                $log.error("Ocurrió un error al agregar una opinión sobre el paciente " + newOpinion.patient, error);
            });
        }

        /**
         * Agrega una nueva nota personal sobre el paciente
         * @param   {object} newNoteData Informacion sobre la nueva nota
         * @param   {number} patientId   Id del paciente sobre el cual se realizo la nota
         * @returns {promise} una promesa con el paciente modificado
         */
        function addPatientNote(newNoteData, patientId){
            return $http.put(patientEndpoint + "/addPatientNote/"+ patientId, newNoteData).then(function (result) {
                return result.data;
            }, function (error) {
                $log.error("Ocurrió un error al agregar una nota sobre el paciente " + patientId, error);
            });
        }
    }
})();
