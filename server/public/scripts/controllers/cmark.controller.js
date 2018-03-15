myApp.controller('CmarkController', ['UserService', 'CmarkService', 'AudioService', 'EventService', '$location', '$routeParams', '$mdDialog',
	function (UserService, CmarkService, AudioService, EventService, $location, $routeParams, $mdDialog) {
		var self = this;
		self.userService = UserService;

		//get all events audience member has attended
		self.getAudienceEvents = EventService.getAudienceEvents;
		self.audienceEvents = EventService.audienceEvents;

		self.cmarkService = CmarkService;
		self.audienceCmarks = CmarkService.audienceCmarks;
		//clear out the adjusted cmarks array on page load to prevent it from appending on each load
		CmarkService.adjustedCmarks = [];
		CmarkService.cmarkArr.list = [];

		self.adjustedCmarks = CmarkService.adjustedCmarks;
		self.cmarkArr = CmarkService.cmarkArr;
		//get one event
		self.getAudienceEvent = CmarkService.getAudienceEvent;

		self.redirectTo = function (event_id) {
			$location.path(`/my-events/${event_id}`);
		};

		if ($routeParams.id) {
			self.getAudienceEvent($routeParams.id);
		} else {
			self.getAudienceEvents();
		}

		self.showAddComment = function (cmark, ev) {
			$mdDialog.show({
				controller: AddCommentController,
				controllerAs: 'vm',
				templateUrl: '/../../views/templates/add-comment.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true,
				fullscreen: self.customFullscreen, // Only for -xs, -sm breakpoints.
				resolve: {
					cmark: function () {
						return cmark;
					}
				}
			});
		};

		function AddCommentController($mdDialog, cmark, CmarkService) {
			var self = this;
			self.addComment = CmarkService.addComment;
			
			self.singleCmark = { 
				id: cmark.id,
				comment: cmark.comment,
				event_id: cmark.event_id
			 }
			 

			self.hide = function () {
				$mdDialog.hide();
			};

			self.cancel = function () {
				$mdDialog.cancel();
			};

			self.insertComment = function (singleCmark) {

				// create cmark object with comment
				
				console.log('cmark to add:', singleCmark);

				//send cmark to the service to add to db
				CmarkService.insertComment(singleCmark);

				// close dialog
				$mdDialog.hide();
			}
		}

		self.cmarkService = CmarkService;

	}]);