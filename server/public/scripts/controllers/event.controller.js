myApp.controller('EventController', ['UserService', 'EventService', 'CmarkService', '$location',
	function (UserService, EventService, CmarkService, $location) {
		var self = this;
		self.userService = UserService;
		self.userObject = UserService.userObject;
		self.eventInfo = EventService.eventInfo.list[0];
		self.count = CmarkService.count;

		//Disable the device from sleeping
		var noSleep = new NoSleep();
		noSleep.enable();

		// Allows user to use swipe functionality on mobile (difficult on desktop)
		self.onSwipeUp = function (ev, target) {
			self.count += 1;
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
						// self.finishEvent();//Disable the noSleep on the mobile device when we leave the page
						noSleep.disable();
						window.location.href = '#!/my-events';
					} else {
						swal.close();
					}
				});
		}
	}
]);