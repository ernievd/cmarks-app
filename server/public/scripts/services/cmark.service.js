myApp.service('CmarkService', ['$http', '$location', function ($http, $location) {
    var self = this;
    self.now;
    self.utcTimestamp;
    self.acutalTime;
    self.postedTime;

    // getting time upon swipe and posting to the database
    self.timestampSwipe = function () {
        self.now = new Date;
        
        self.utcTimestamp = Date.UTC(self.now.getUTCFullYear(), self.now.getUTCMonth(), self.now.getUTCDate(),
            self.now.getUTCHours(), self.now.getUTCMinutes(), self.now.getUTCSeconds(), self.now.getUTCMilliseconds());

        console.log('time', self.utcTimestamp);

        // converts milliseconds to time
        self.timeConversion(self.utcTimestamp);
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

        self.postedTime = {
            actualTime,

        }

        return self.postedTime;
    }

}]);