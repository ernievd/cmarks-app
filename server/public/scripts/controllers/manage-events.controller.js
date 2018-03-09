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


    self.showAddEvent = function(ev) {
      $mdDialog.show({
        controller: AddEventController,
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
  
    function AddEventController($mdDialog, EventService) {
      var self = this;
      self.addEvent = EventService.addEvent;


      self.hide = function() {
        $mdDialog.hide();
      };
  
      self.cancel = function() {
        $mdDialog.cancel();
      };

      self.submitEvent = function(newEvent){       
        // format the start time to be saved in the database 
        let start_time = moment(newEvent.start_time).format('h:mm:ss a');   
        
        // create event object with new start time
        let eventToAdd = {
          title: newEvent.title,
          speaker_name: newEvent.speaker_name,
          location: newEvent.location,
          date: newEvent.date,
          start_time: start_time 
        }

        //send eventToAdd to the service to add to db
        EventService.addEvent(eventToAdd);
        
        // close dialog
        $mdDialog.hide();
      }
    }
}]);