myApp.service('CmarkService', ['$http', '$location', 'moment', function ($http, $location, moment) {
	var self = this;

	self.postedTime;
	self.audienceCmarks = { list: [] };
	self.adjustedCmarks = [];
	self.bufferAmount = 10;
	self.count = 0;
	self.displayCmark = [];
	self.cmarkArr = {list: []};


	// getting time upon swipe and posting to the database
	self.timestampSwipe = function (event_id) {
		self.count += 1;

		//this is what ian posts to the db for a cmark
		var now = moment().format('h:mm:ss a');

		self.postedTime = {
			now,
			event_id
		};
		// converts milliseconds to time

		console.log('posted time', self.postedTime);

		// posting to time to database.
		$http.post(`/cmark/swipe/`, self.postedTime)
			.then(function (response) {
				console.log('successful post on cmark', response);
			})
			.catch(function (error) {
				console.log('error on post of cmark', error);
			})

	};// End self.timestampSwipe

	self.finishEvent = function () {
		$location.path('/my-events');
	};// End self.finishEvent

	self.getAudienceEvent = function (event_id) {
		//console.log('getting audience event', event_id);

		$http.get(`/event/audience/${event_id}`).then(function (response) {
			self.audienceCmarks.list = response.data;
			//console.log(self.audienceCmarks);
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
					minutes = ' ' + minutes
				}
				displayFriendly = minutes + ':' + seconds;

				var convertedCmark = moment.duration({
					seconds: parseInt(seconds),
					minutes: parseInt(minutes),
				});

				if (cmarkAdjustedTime._milliseconds > 0) {
					cmarkData = {displayCmark: displayFriendly, cmarkAdjustedTime: cmarkAdjustedTime}
					self.adjustedCmarks.push(cmarkAdjustedTime);
					self.cmarkArr.list.push(cmarkData);
				}

			}
		})
	}; // End self.getAudienceEvent

	// This is an object I created here just for test purposes
	//    I assume that I will be passed in an object like this from the database
	self.testCmarkObject = {
		mediaStartTime: "12:34:24 pm",
		mediaFileName: "../assets/Spaghetti.mp3",
		cmarkArray: ["12:34:44 pm", "12:34:54 pm", "12:35:44 pm"]
	};// END self.testCmarkObject

	// self.filestackAudioFile = "https://cdn.filestackcontent.com/CktcazQzRqmuBC9GblZh";
	// self.localAudioFile = "../assets/Spaghetti.mp3";

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

}]);