myApp.controller('JoinEventController', ['UserService', 'EventService', function (UserService, EventService) {
  var self = this;
  self.userService = UserService;
  self.joinCode = '';
  self.eventInfo = EventService.eventInfo.list;
  self.wrongCode = EventService.wrongCode;
  
  self.joinEvent = function (code) {
    code = code.toUpperCase();
    EventService.joinEvent(code);
  }

}]);
