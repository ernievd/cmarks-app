myApp.controller('ManageEventsController', ['UserService', 'EventService', 'AudioService', '$mdDialog',
  function (UserService, EventService, AudioService, $mdDialog) {
    var self = this;

    self.userService = UserService;

    //EventService variables
    self.upcomingEvents = EventService.upcomingEvents;
    self.pastEvents = EventService.pastEvents;
    self.eventToEdit = { title: 'Hello' };
    
    //EventService functions
    self.getUpcomingEvents = EventService.getUpcomingEvents;
    self.getPastEvents = EventService.getPastEvents;
    self.completeEvent = EventService.completeEvent;
    
    // Filestack audio upload modal 
    self.openPicker = function (event_id, speaker_id) {
      AudioService.openPicker(event_id, speaker_id);
    }

    // opens dialog to add an event
    self.showAddEvent = function(ev) {
      $mdDialog.show({
        controller: AddEventController,
        controllerAs: 'vm',
        templateUrl: '/../../views/templates/add-event.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: self.customFullscreen // Only for -xs, -sm breakpoints.
      });
    };

    // add event controller, handles taking input from user and sending new event to event service
    function AddEventController($mdDialog, EventService) {
      var self = this;
      self.addEvent = EventService.addEvent;

      //hides add event dialog
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
      } //end submitEvent
    } //end AddEventController
    
    //opens edit event dialog
    self.showEditEvent = function(event, ev) {
      $mdDialog.show({
        controller: EditEventController,
        controllerAs: 'vm',
        templateUrl: '/../../views/templates/edit-event.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: self.customFullscreen, // Only for -xs, -sm breakpoints.
        resolve: {
          event: function() {
            return event;
          }
        }
      });
    };

    //takes in information about the event to edit, sends any updates to the event service
    function EditEventController($mdDialog, event, EventService) {
      var self = this;

      //format eventDate to use as a placeholder in datepicker
      let eventDate = moment(event.date).format('YYYY-MM-DD');

      //create eventToEdit using correctly formatted eventDate
      self.eventToEdit = {
        id: event.id,
        title: event.title,
        speaker_name: event.speaker_name,
        location: event.location,
        date: eventDate,
        start_time: event.start_time
      }      

      //closes the dialog
      self.hide = function() {
        $mdDialog.hide();
      };
  
      self.cancel = function() {
        $mdDialog.cancel();
      };

      //submits updates to the event to EventService
      self.editEvent = function(eventToEdit){      
        //send eventToEdit to the service to edit in db
        EventService.editEvent(eventToEdit);

        // close dialog
        $mdDialog.hide();
      } //end editEvent
  } //end EditEventController
}]);