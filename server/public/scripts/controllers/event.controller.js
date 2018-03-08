myApp.controller('EventController', ['UserService', 'EventService', 'CmarkService',
  function (UserService, EventService, CmarkService) {
    console.log('EventController loaded');
    
    var self = this;

    self.userService = UserService;
    self.userObject = UserService.userObject;

    // Allows user to use swipe functionality on mobile (difficult on desktop)
    self.onSwipeUp = function(ev, target) {
      alert('You swiped up!!');
      CmarkService.timestampSwipe();
      console.log('Event Target: ', ev.target);
      console.log('Event Current Target: ', ev.currentTarget);
      console.log('Original Current Target: ', target.current);
    };

  }]);
