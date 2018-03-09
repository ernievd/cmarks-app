myApp.service('CmarkService', ['$http', '$location', function($http, $location) {
	var self = this;
	self.bufferAmount = moment('10', 'ss');

	var start = moment('11:20:00 AM', 'h:mm:ss a');
	// This is an object I created here just for test purposes
    //    I assume that I will be passed in an object like this from the database
	self.testCmarkObject = {
		mediaStartTime: "12:34:24 pm",
		mediaFileName: "../assets/Spaghetti.mp3",
		cmarkArray: [ "12:34:44 pm", "12:34:54 pm","12:35:44 pm"]
	};

	// self.filestackAudioFile = "https://cdn.filestackcontent.com/CktcazQzRqmuBC9GblZh";
	// self.localAudioFile = "../assets/Spaghetti.mp3";

	self.playAudioSegment = function (mediaRealStartTime, cmark) {
		let audio = document.getElementById('sample');
		// cmark = new Date(cmark).getTime();
		cmark = moment(cmark, 'h:mm:ss');
		//mediaRealStartTime = new Date(mediaRealStartTime).getTime();
		mediaRealStartTime = moment(mediaRealStartTime, 'h:mm:ss');

		//let cmarkAdjustedTime = new Date(cmark - mediaRealStartTime).getSeconds();


		var cmarkAdjustedTime = moment.duration(moment(cmark).diff(mediaRealStartTime));

		console.log('cmarkAdjustedTime :', cmarkAdjustedTime._data.minutes + ':' + cmarkAdjustedTime._data.seconds);


		// var __duration = moment.duration(moment(__endTime).diff(__startTime));
		// var __hours = __duration.asHours();
		// console.log(__hours);
		self.bufferAmount
		let playStartTime = cmarkAdjustedTime - (self.bufferAmount / 2);
		let playEndTime = cmarkAdjustedTime + (self.bufferAmount / 2);

		let segmentEnd;
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

		//***  DO I NEED TO ADD THIS BACK AS A FUNCTION?
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



