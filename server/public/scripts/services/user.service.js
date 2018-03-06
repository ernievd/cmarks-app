myApp.service('UserService', ['$http', '$location', function($http, $location){
  console.log('UserService Loaded');
  var self = this;
  self.userObject = {};

  self.getuser = function(){
    console.log('UserService -- getuser');
    $http.get('/auth').then(function(response) {
        if(response.data.status) {
            // user has a curret session on the server
            self.userObject.userName = response.data.name;
            console.log('UserService -- getuser -- User Data: ', self.userObject.userName);
        } else {
            console.log('UserService -- getuser -- failure');
            // user has no session, bounce them back to the login page
            $location.path("/login");
        }
    },function(response){
      console.log('UserService -- getuser -- failure: ', response);
      $location.path("/join-event");
    });
  },

  self.logout = function() {
    console.log('UserService -- logout');
    $http.get('/auth/logout').then(function(response) {
      console.log('UserService -- logout -- logged out');
      $location.path("/login");
    });
  }
}]);
