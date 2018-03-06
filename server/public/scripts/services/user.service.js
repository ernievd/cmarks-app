myApp.service('UserService', ['$http', '$location', function($http, $location){
  console.log('UserService Loaded');
  var self = this;
  self.userObject = {};

  // Make sure that the user is logged in!!
  self.getuser = function(){
    console.log('UserService -- getuser');
    $http.get('/api/linked/account').then(function(response) {
        //Look at response
	    console.log('I am in self.getuser');
	    console.log('Response is - ', response);
	    if(response.data.username) {
            // user has a current session on the server
            self.userObject.userName = response.data.username;
            console.log('UserService -- getuser -- User Data: ', self.userObject.userName);
        } else {
            console.log('UserService -- getuser -- failure');
            // user has no session, bounce them back to the login page
            $location.path("/login");
        }
    },function(response){
      console.log('UserService -- getuser -- failure: ', response);
      $location.path("/login");
    });
  },

  self.logout = function() {
    console.log('UserService -- logout');
    $http.get('/api/user/logout').then(function(response) {
      console.log('UserService -- logout -- logged out');
      $location.path("/login");
    });
  }
}]);
