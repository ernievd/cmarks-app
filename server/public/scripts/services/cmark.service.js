myApp.service('CmarkService', ['$http', '$location', 'moment', '$routeParams', function ($http, $location, moment, $routeParams) {
	var self = this;

	self.postedTime;
	self.audienceCmarks = {list: []};

	self.adjustedCmarks = [];
	self.bufferAmount = 10;
	self.count = 0;
	self.displayCmark = [];
	self.cmarkArr = {list: []};

	var noSleep = new NoSleep;


	// getting time upon swipe and posting to the database
	self.timestampSwipe = function (event_id) {
		self.count += 1;
		var now = moment().format('h:mm:ss a');
		console.log('now', now);
		
		self.postedTime = {
			now,
			event_id
		};
		// posting to time to database.
		$http.post(`/cmark/swipe/`, self.postedTime)
			.then(function (response) {
				console.log('successful post on cmark', response);
			})
			.catch(function (error) {
				console.log('error on post of cmark', error);
			})
	}; // End self.timestampSwipe

	self.finishEvent = function () {
		$location.path('/my-events');
	}; // End self.finishEvent

	self.getAudienceEvent = function (event_id) {
		$http.get(`/event/audience/${event_id}`).then(function (response) {
			self.audienceCmarks.list = response.data;
			console.log('time', self.audienceCmarks.list);
			
			// Convert the time
			for (i = 0; i < self.audienceCmarks.list.length; i++) {
				let cmark = moment(self.audienceCmarks.list[i].timestamp, 'h:mm:ss');
				
				let mediaRealStartTime = moment(self.audienceCmarks.list[i].start_time, 'h:mm:ss');
				
				
				let cmarkAdjustedTime = moment.duration(cmark.diff(mediaRealStartTime));
				

				var seconds = moment.duration(cmarkAdjustedTime).seconds();
				
				if (seconds < 10) {
					seconds = '0' + seconds
				}
				var minutes = moment.duration(cmarkAdjustedTime).minutes();	
				if (minutes < 10) {
					minutes = '0' + minutes
				}
				let displayFriendly = minutes + ':' + seconds;
				
				var convertedCmark = moment.duration({
					seconds: parseInt(seconds),
					minutes: parseInt(minutes),
				});
				if (cmarkAdjustedTime._milliseconds > 0) {
					cmarkData = {
						displayCmark: displayFriendly,
						cmarkAdjustedTime: cmarkAdjustedTime,
						id: self.audienceCmarks.list[i].id,
						comment: self.audienceCmarks.list[i].comment,
						event_id: self.audienceCmarks.list[i].event_id
					}
					self.adjustedCmarks.push(cmarkAdjustedTime);
					self.cmarkArr.list.push(cmarkData);
				}
			}
		})
	}; // End self.getAudienceEvent

	self.playAudioSegment = function (mediaRealStartTime, cmark) {
		let audio = document.getElementById('sample');
		let playStartTime = (cmark._data.minutes * 60) + cmark._data.seconds;
		playStartTime = playStartTime - (self.bufferAmount / 2);
		let playEndTime = (cmark._data.minutes * 60) + cmark._data.seconds;
		playEndTime = playEndTime + (self.bufferAmount / 2);
		audio.currentTime = playStartTime;
		audio.addEventListener('timeupdate', function () {
			if (audio.currentTime >= playEndTime) {
				audio.pause();
				playEndTime = 1000000;
			}
		}, false);
		audio.play();
	}; //End self.playAudioSegment


	self.playSegment = function (PlayStartTime, PlayEndTime) {
		segmentEnd = playEndTime;
		audio.currentTime = playStartTime;
		audio.play();
	} //End self.playSegment

	self.insertComment = function (singleCmark) {
		$http.put(`/cmark/comment`, singleCmark).then((response) => {
				console.log('Successful comment put:', response);
				self.cmarkArr.list = [];
				self.getAudienceEvent(singleCmark.event_id);
			})
			.catch((error) => {
				console.log('Error on comment put:', error);
			})
	}

}]);