myApp.controller('EventController', ['UserService', 'EventService', 'CmarkService',
  function (UserService, EventService, CmarkService) {
    console.log('EventController loaded');
    
    var self = this;

    self.userService = UserService;
    self.userObject = UserService.userObject;
    self.eventInfo = EventService.eventInfo.list[0];
    console.log('event', self.eventInfo);
    
    // Allows user to use swipe functionality on mobile (difficult on desktop)
    self.onSwipeUp = function(ev, target) {
      swal('Succesful CMark', {
        buttons: false,
        timer: 1000,
        icon: "success",
      })
      CmarkService.timestampSwipe(self.eventInfo.id);
    };

    self.finishEvent = function () {
      CmarkService.finishEvent();
    }

  }]);
