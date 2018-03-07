myApp.controller('EventController', ['UserService', 'EventService', 'CmarkService',
  function (UserService, EventService, CmarkService) {
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
  }]);
