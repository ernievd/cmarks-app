myApp.controller('JoinEventController', ['UserService', 'EventService', function (UserService, EventService) {
  var self = this;
  self.userService = UserService;
  self.joinCode = '';

  self.joinEvent = function (code) {
    code = code.toUpperCase();
    console.log(code);
  }

}]);
