(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientCreateController", PatientCreateController);

    PatientCreateController.$inject = ["PatientFactory", "$stateParams"];

    function PatientCreateController(PatientFactory, $stateParams) {

        var vm = this;

//Estoy hay que modificarlo con el ._ID del que se loguea


    var datePickerCallback = function (val) {
        if (typeof(val) === 'undefined') {
            console.log('No date selected');
    } else {
        console.log('Selected date is : ', val)
        }
    };

    vm.datepickerObject = {
      titleLabel: 'Title',  //Optional
      todayLabel: 'Today',  //Optional
      closeLabel: 'Close',  //Optional
      setLabel: 'Set',  //Optional
      setButtonType : 'button-assertive',  //Optional
      todayButtonType : 'button-assertive',  //Optional
      closeButtonType : 'button-assertive',  //Optional
      inputDate: new Date(),    //Optional
      mondayFirst: true,    //Optional
      //disabledDates: disabledDates, //Optional
      //weekDaysList: weekDaysList,   //Optional
      //monthList: monthList, //Optional
      templateType: 'popup', //Optional
      showTodayButton: 'true', //Optional
      modalHeaderColor: 'bar-positive', //Optional
      modalFooterColor: 'bar-positive', //Optional
      from: new Date(2012, 8, 2),   //Optional
      to: new Date(2018, 8, 25),    //Optional
      callback: function (val) {    //Mandatory
        datePickerCallback(val);
      }
    };




        var creatorId = "56986b129a1971d812b0050a";

        vm.createPatient = function() {

            PatientFactory.createPatient(vm.patient, creatorId).then(function(result) {
                console.log("$$$ result", result);
            }, function(err) {
                console.log("$$$ rompiose", err);
            });

        };
    }
})();
