myApp.service('CmarkService', ['$http', '$location', 'moment', function ($http, $location, moment) {
    var self = this;
    self.now;
    self.utcTimestamp;
    self.acutalTime;
    self.swipeInfo;
    self.eventInfo = EventService.eventInfo.list

    // getting time upon swipe and posting to the database
    self.timestampSwipe = function () {
        
        //this is what ian posts to the db for a cmark
        var now = moment().format('h:mm:ss a');
       
        //parsing what we get from the database back into a moment object
        var parseNow = moment(now, 'h:mm:ss a');

        // this is the parsed start time from what amy will post to db
        var start = moment('11:20:00 AM', 'h:mm:ss a');
        
        //this is how to find the duration between the 2
        var duration = moment.duration(parseNow.diff(start));
        console.log('duration:', duration._data.minutes + ':' + duration._data.seconds);

        
        // self.now = new Date;

        
        // self.utcTimestamp = Date.UTC(self.now.getUTCFullYear(), self.now.getUTCMonth(), self.now.getUTCDate(),
        //     self.now.getUTCHours(), self.now.getUTCMinutes(), self.now.getUTCSeconds(), self.now.getUTCMilliseconds());

        // console.log('time', self.utcTimestamp);

        // // converts milliseconds to time
        // self.timeConversion(self.utcTimestamp);
        // console.log('posted time', self.postedTime);

        // // posting to time to database. 
        // $http.post(`/cmark/swipe/`, self.postedTime )
        // .then(function(response) {
        //     console.log('successful post on cmark', response);
        // })
        // .catch(function (error) {
        //     console.log('error on post of cmark', error);
        // })
    }

    // converts milliseconds to hours, minutes, seconds to store in SQL Database
    self.timeConversion = function (milliseconds) {
        let time = parseInt((milliseconds%1000)/100);
        let seconds = parseInt((milliseconds/1000)%60);
        let minutes = parseInt((milliseconds/(1000*60))%60);
        let hours = parseInt((milliseconds/(1000*60*60))%24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        let actualTime = hours + ":" + minutes + ":" + seconds + "." + milliseconds;

        self.swipeInfo = {
            actualTime,
            event_id: self.eventInfo[0].id
        }

        return self.swipeInfo;
    }

    self.finishEvent = function () {
        $location.path('/my-events');
    }

}]);