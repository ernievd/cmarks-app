myApp.controller('EventController', ['UserService', 'EventService', 'CmarkService',
  function (UserService, EventService, CmarkService) {
    console.log('EventController loaded');

    var self = this;

    self.userService = UserService;
    self.userObject = UserService.userObject;
    self.eventInfo = EventService.eventInfo.list;
    self.count = CmarkService.count;

    self.count = 0;
    // Allows user to use swipe functionality on mobile (difficult on desktop)
    self.onSwipeUp = function (ev, target) {

      swal("CMark Succesful!", {
        buttons: false,
        icon: "success",
        timer: 1000,
      });

      // Counts Cmarks
      self.count += 1;

      // Records time every time cmark is made
      CmarkService.timestampSwipe(self.eventInfo[0].id);
    };

    // Re-routes user to the "my cmarks" page.
    self.finishEvent = function () {
      CmarkService.finishEvent();
    }



  }]);
