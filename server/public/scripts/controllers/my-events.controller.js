myApp.controller('MyEventsController', ['UserService', 'EventService', '$routeParams', '$location', function(UserService, EventService, $routeParams, $location) {
    var self = this;
    self.userService = UserService;

  }]);