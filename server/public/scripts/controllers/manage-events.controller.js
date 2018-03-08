myApp.controller('ManageEventsController', ['UserService', 'EventService', 'AudioService', '$mdDialog',
  function (UserService, EventService, AudioService, $mdDialog) {
    var self = this;
    self.userService = UserService;
    //EventService variables
    self.upcomingEvents = EventService.upcomingEvents;
    self.pastEvents = EventService.pastEvents;

    //EventService functions
    self.getUpcomingEvents = EventService.getUpcomingEvents;
    self.getPastEvents = EventService.getPastEvents;
    self.completeEvent = EventService.completeEvent;

    self.showAdvanced = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        controllerAs: 'vm',
        templateUrl: '/../../views/templates/add-event.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: self.customFullscreen // Only for -xs, -sm breakpoints.
      })
      // .then(function(answer) {
      //   self.status = 'You said the information was "' + answer + '".';
      // }, function() {
      //   self.status = 'You cancelled the dialog.';
      // });
    };
  
    function DialogController($mdDialog, EventService) {
      var self = this;
      self.addEvent = EventService.addEvent;


      self.hide = function() {
        $mdDialog.hide();
      };
  
      self.cancel = function() {
        $mdDialog.cancel();
      };

      self.submitEvent = function(newEvent){
        EventService.addEvent(newEvent);
        $mdDialog.hide();
      }
    }
  }]);