myApp.service('UserService', ['$http', '$location', function($http, $location){
  console.log('UserService Loaded');
  var self = this;
  self.userObject = {};

  // Make sure that the user is logged in!!
  self.getuser = function(){

    console.log('UserService -- getuser');
// <<<<<<< HEAD
//     $http.get('/api/linked/')
//     .then(function(response) {
//         //Look at response
//       console.log('Response is - ', response);
// 	    if(response) {
//             // user has a current session on the server
// =======
    $http.get('/auth').then(function(response) {
        if(response.data.status) {
            // user has a curret session on the server
            self.userObject = response.data;
            console.log('UserService -- getuser -- User Data: ', self.userObject);
        } else {
            console.log('UserService -- getuser -- failure');
            // user has no session, bounce them back to the login page
            $location.path("/login");
        }
    },function(response){
      console.log('UserService -- getuser -- failure: ', response);
      $location.path("/login");
    });
    }

  self.logout = function() {
    console.log('UserService -- logout');
    $http.get('/auth/logout').then(function(response) {
      console.log('UserService -- logout -- logged out');
      $location.path("/login");
    });
  }
}]);
