myApp.controller('ManageEventsController', ['UserService', 'EventService', 'AudioService',
  function (UserService, EventService, AudioService) {
    var self = this;
    self.userService = UserService;

    //EventService variables
    self.upcomingEvents = EventService.upcomingEvents;
    self.pastEvents = EventService.pastEvents;
    console.log('pastEvents', self.pastEvents);
    
    //EventService functions
    self.addEvent = EventService.addEvent;
    self.getUpcomingEvents = EventService.getUpcomingEvents;
    self.getPastEvents = EventService.getPastEvents;
    self.completeEvent = EventService.completeEvent;
    console.log('completeEvent', self.completeEvent);
    
    // Filestack audio upload function 
    self.openPicker = function (event_id, speaker_id) {
      console.log('event id', event_id);
      AudioService.openPicker(event_id, speaker_id);
    }

  }]);