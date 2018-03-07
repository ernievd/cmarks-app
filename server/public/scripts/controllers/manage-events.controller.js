myApp.controller('ManageEventsController', ['UserService', 'EventService', 'AudioService',
  function (UserService, EventService, AudioService) {
    var self = this;
    self.userService = UserService;
  }]);