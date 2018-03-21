myApp.controller('CmarkController', ['UserService', 'CmarkService', 'AudioService', 'EventService', '$location', '$routeParams', '$mdDialog',
	function (UserService, CmarkService, AudioService, EventService, $location, $routeParams, $mdDialog) {
		let self = this;
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
		self.getAudienceEvent = CmarkService.getAudienceEvent;

		self.redirectTo = function (event_id) {
			$location.path(`/my-events/${event_id}`);
		};

		if ($routeParams.id) {
			self.getAudienceEvent($routeParams.id);
		} else {
			self.getAudienceEvents();
		}

		// Brings up Modal when pressing add comment icon.
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

		// Dialog Controller for Adding Comments for CMarks. 
		function AddCommentController($mdDialog, cmark, CmarkService) {
			let self = this;
			self.addComment = CmarkService.addComment;

			self.singleCmark = {
				id: cmark.id,
				comment: cmark.comment,
				event_id: cmark.event_id
			};


			self.hide = function () {
				$mdDialog.hide();
			};

			self.cancel = function () {
				$mdDialog.cancel();
			};

			self.insertComment = function (singleCmark) {
				//send cmark to the service to add to db
				CmarkService.insertComment(singleCmark);
				// close dialog
				$mdDialog.hide();
			}
		}

	}]);