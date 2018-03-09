myApp.controller('MyEventsController', ['UserService', 'EventService', function(UserService, EventService) {
    var self = this;
    self.userService = UserService;

  }]);