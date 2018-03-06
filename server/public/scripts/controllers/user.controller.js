myApp.controller('UserController', ['UserService', 'LinkedinService', function(UserService, LinkedinService) {
  console.log('UserController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
}]);
