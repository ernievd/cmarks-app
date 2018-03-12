myApp.service('CmarkService', ['$http', '$location', 'moment', function ($http, $location, moment) {
    var self = this;

    self.utcTimestamp;
    self.acutalTime;
    self.postedTime;
    self.audienceCmarks = { list: []};

    self.count = 0;

    // getting time upon swipe and posting to the database
    self.timestampSwipe = function (event_id) {

        //this is what ian posts to the db for a cmark
        var now = moment().format('h:mm:ss a');

        self.postedTime = {
            now, 
            event_id
        }
        // converts milliseconds to time

        console.log('posted time', self.postedTime);

        // posting to time to database. 
        $http.post(`/cmark/swipe/`, self.postedTime )
        .then(function(response) {
            console.log('successful post on cmark', response);
        })
        .catch(function (error) {
            console.log('error on post of cmark', error);
        })
        
    }
    
    self.finishEvent = function () {
        $location.path('/my-events');
    }

    self.getAudienceEvent = function(event_id) {
        console.log('getting audience event', event_id);

        $http.get(`/event/audience/${event_id}`).then(function(response){
            // console.log('got the event!', response);
            self.audienceCmarks.list = response.data;
            console.log(self.audienceCmarks);

        })
    }
	self.bufferAmount = 10;

	// This is an object I created here just for test purposes
    //    I assume that I will be passed in an object like this from the database
	self.testCmarkObject = {
		mediaStartTime: "12:34:24 pm",
		mediaFileName: "../assets/Spaghetti.mp3",
		cmarkArray: [ "12:34:44 pm", "12:34:54 pm","12:35:44 pm"]
	};// END self.testCmarkObject

	// self.filestackAudioFile = "https://cdn.filestackcontent.com/CktcazQzRqmuBC9GblZh";
	// self.localAudioFile = "../assets/Spaghetti.mp3";

	self.playAudioSegment = function (mediaRealStartTime, cmark) {
		let audio = document.getElementById('sample');
		cmark = moment(cmark, 'h:mm:ss');
		mediaRealStartTime = moment(mediaRealStartTime, 'h:mm:ss');


		// let cmarkAdjustedTime = moment.duration(moment(cmark).diff(mediaRealStartTime));
		let cmarkAdjustedTime = moment.duration(cmark.diff(mediaRealStartTime));
		//self.cmarkToSeconds = cmarkAdjustedTime;
		let playStartTime = cmarkAdjustedTime.subtract(self.bufferAmount/2, 'seconds');
		playStartTime = (playStartTime._data.minutes * 60) + playStartTime._data.seconds;

		//Why can I not do this twice without it resetting - had to move the set???!!!???!!!!!!???!!
		//let playEndTime = cmarkAdjustedTime.add(self.bufferAmount/2, 'seconds');
		let playEndTime = cmarkAdjustedTime.add(self.bufferAmount, 'seconds');
		playEndTime = (playEndTime._data.minutes * 60) + playEndTime._data.seconds;

		let end = playEndTime;

		let segmentEnd;

		// playStartTime = (playStartTime._data.minutes * 60) + playStartTime._data.seconds;
		// playEndTime = (playEndTime._data.minutes * 60) + playEndTime._data.seconds;


		audio.currentTime = playStartTime;

		audio.addEventListener('timeupdate', function () {
			// if (playEndTime && audio.currentTime >= playEndTime) {
			if (audio.currentTime >= playEndTime) {
				audio.pause();
				playEndTime = 1000000;
			}
			// if (segmentEnd && audio.currentTime >= segmentEnd) {
			// 	audio.pause();
			// }
		}, false);

		audio.play();

		self.playSegment = function (PlayStartTime, PlayEndTime){
		segmentEnd = playEndTime;
		audio.currentTime = playStartTime;
		audio.play();
		}
	};

	self.playSegment = function (PlayStartTime, PlayEndTime){
		segmentEnd = playEndTime;
		audio.currentTime = playStartTime;
		audio.play();
	}


}]);