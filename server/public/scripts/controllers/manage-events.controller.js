myApp.controller('ManageEventsController', ['UserService', 'EventService', 'AudioService',
  function (UserService, EventService, AudioService) {
    var self = this;
    self.userService = UserService;

    //EventService variables
    self.upcomingEvents = EventService.upcomingEvents;
    self.pastEvents = EventService.pastEvents;

    //EventService functions
    self.addEvent = EventService.addEvent;
    self.getUpcomingEvents = EventService.getUpcomingEvents;
    self.getPastEvents = EventService.getPastEvents;
    self.completeEvent = EventService.completeEvent;

    self.addEvent();

  }]);