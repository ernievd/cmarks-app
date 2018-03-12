myApp.controller('ManageEventsController', ['UserService', 'EventService', 'AudioService', '$mdDialog',
  function (UserService, EventService, AudioService, $mdDialog) {
    var self = this;
    self.userService = UserService;
    //EventService variables
    self.upcomingEvents = EventService.upcomingEvents;
    self.pastEvents = EventService.pastEvents;
    console.log('pastEvents', self.pastEvents);
    self.eventToEdit = { title: 'Hello'};
    
    //EventService functions
    self.getUpcomingEvents = EventService.getUpcomingEvents;
    self.getPastEvents = EventService.getPastEvents;
    self.completeEvent = EventService.completeEvent;
    console.log('completeEvent', self.completeEvent);
    
    // Filestack audio upload function 
    self.openPicker = function (event_id, speaker_id) {
      console.log('event id', event_id);
      AudioService.openPicker(event_id, speaker_id);
    }


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
        console.log('event to add:', eventToAdd);
        
        //send eventToAdd to the service to add to db
        EventService.addEvent(eventToAdd);
        
        // close dialog
        $mdDialog.hide();
      }
    }
    
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

    function EditEventController($mdDialog, event, EventService) {
      var self = this;

      let eventDate = moment(event.date).format('YYYY-MM-DD');
      
      self.eventToEdit = {
        id: event.id,
        title: event.title,
        speaker_name: event.speaker_name,
        location: event.location,
        date: eventDate,
        start_time: event.start_time
      }

      console.log('eventToEdit :', self.eventToEdit);
      

      self.hide = function() {
        $mdDialog.hide();
      };
  
      self.cancel = function() {
        $mdDialog.cancel();
      };

      self.editEvent = function(eventToEdit){       
        // let start_time = moment(eventToEdit.start_time).format('h:mm:ss a');
        let editedEvent = {};
        if(typeof(eventToEdit.start_time) == 'string') {
          editedEvent = eventToEdit;
        } else {
          editedEvent = {
            id: eventToEdit.id,
            title: eventToEdit.title,
            speaker_name: eventToEdit.speaker_name,
            location: eventToEdit.location,
            date: eventToEdit.date,
            start_time: moment(eventToEdit.start_time).format('h:mm:ss a')
          }
        }
        console.log('edited event: ', editedEvent);
        //send eventToAdd to the service to edit in db
        EventService.editEvent(editedEvent);
        
        // close dialog
        $mdDialog.hide();
      }

  }
}]);