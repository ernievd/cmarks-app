myApp.service('UserService', ['$http', '$location', function ($http, $location) {
  var self = this;
  self.userObject = {};

  // Make sure that the user is logged in!!
  self.getuser = function () {
    $http.get('/auth').then(function (response) {
      if (response.data.status) {
        // user has a curret session on the server
        self.userObject = response.data;
      } else {
        console.error('UserService -- getuser -- failure');
        // user has no session, bounce them back to the login page
        $location.path("/login");
      }
    }, function (response) {
      console.error('UserService -- getuser -- failure: ', response);
      //bounce back to login if error
      $location.path("/login");
    });
  } //end getuser

  //log out user
  self.logout = function () {
    $http.get('/auth/logout').then(function (response) {
      $location.path("/login");
    });
  } //end logout
}]);