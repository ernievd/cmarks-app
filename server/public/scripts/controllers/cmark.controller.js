myApp.controller('CmarkController', ['UserService', 'CmarkService', 'AudioService', 'EventService', '$location', '$routeParams',
	function (UserService, CmarkService, AudioService, EventService, $location, $routeParams) {
		var self = this;
		self.userService = UserService;

		//get all events audience member has attended
		self.getAudienceEvents = EventService.getAudienceEvents;
		self.audienceEvents = EventService.audienceEvents;

		self.cmarkService = CmarkService;
		self.audienceCmarks = CmarkService.audienceCmarks;
	    //clear out the adjusted cmarks array on page load to prevent it from appending on each load
		CmarkService.adjustedCmarks = [];
		self.adjustedCmarks = CmarkService.adjustedCmarks;
		console.log('self.adjustedCmarks is ', self.adjustedCmarks);

		//get one event
		self.getAudienceEvent = CmarkService.getAudienceEvent;

		self.redirectTo = function (event_id) {
			$location.path(`/my-events/${event_id}`);
		}

		if ($routeParams.id) {
			self.getAudienceEvent($routeParams.id);
		} else {
			self.getAudienceEvents();
		}


		self.cmarkService = CmarkService;

	}]);