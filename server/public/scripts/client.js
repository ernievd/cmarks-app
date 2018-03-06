var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial']);

myApp.controller('NavController', function($scope, $mdSidenav) {
  $scope.openRightMenu = function() {
    $mdSidenav('right').toggle();
  };
});

myApp.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('red', {
      'default': '500'
    })
    .accentPalette('grey', {
      'default': '900'
    });
});


/// Routes ///
myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  console.log('myApp -- config')
  $routeProvider
    .when('/', {
      redirectTo: 'login'
    })
    .when('/login', {
      templateUrl: '/views/templates/login.html',
      controller: 'LoginController as vm',
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as vm',
    })
    .when('/join-event', {
      templateUrl: '/views/templates/join-event.html',
      controller: 'UserController as vm',
      // resolve: {
      //   getuser : function(LinkedinService){
      //     return LinkedinService.getuser();
      //   }
      // }
    })
    .when('/event', {
      templateUrl: '/views/templates/event.html',
      controller: 'InfoController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/my-events', {
      templateUrl: '/views/templates/my-events.html',
      controller: 'InfoController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/event-cmarks', {
      templateUrl: '/views/templates/event-cmarks.html',
      controller: 'InfoController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/manage-events', {
      templateUrl: '/views/templates/manage-events.html',
      controller: 'InfoController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .otherwise({
      template: '<h1>404</h1>'
    });
}]);
