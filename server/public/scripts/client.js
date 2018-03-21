var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMdIcons', 'angularMoment', 'moment-picker']);

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
      'default': '700'
    })
    .dark();
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
      controller: 'JoinEventController as vm',
    })
    .when('/join-event', {
      templateUrl: '/views/templates/join-event.html',
      controller: 'JoinEventController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/event', {
      templateUrl: '/views/templates/event.html',
      controller: 'EventController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser()
        }
      }
    })
    .when('/my-events', {
      templateUrl: '/views/templates/my-events.html',
      controller: 'CmarkController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/my-events/:id', {
      templateUrl: '/views/templates/cmarks.html',
      controller: 'CmarkController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/manage-events', {
      templateUrl: '/views/templates/manage-events.html',
      controller: 'ManageEventsController as vm',
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
