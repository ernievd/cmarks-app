myApp.controller('EventController', ['UserService', 'EventService', 'CmarkService', '$location',
  function (UserService, EventService, CmarkService, $location) {
    console.log('EventController loaded');

    var self = this;

    self.userService = UserService;
    self.userObject = UserService.userObject;
    self.eventInfo = EventService.eventInfo.list[0];
    self.count = CmarkService.count;
    console.log('event', self.eventInfo);

    // Allows user to use swipe functionality on mobile (difficult on desktop)
    self.onSwipeUp = function (ev, target) {
      self.count += 1;
      swal('Succesful CMark', {
        buttons: false,
        timer: 1000,
        icon: "success",
      })
      CmarkService.timestampSwipe(self.eventInfo.id);
    };
  
	self.confirmFinish = function () {
		swal({
			title: "Are you sure?",
			buttons: ['No', 'Yes I want to leave.'],
			dangerMode: true,
		})
		.then((willDelete) => {
			if (willDelete) {
        // self.finishEvent();
        window.location.href = '#!/my-events';
			} else {
				swal.close();
			}
    });
  }
  
  // self.finishEvent = Cmark
  }]);
