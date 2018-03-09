myApp.service('CmarkService', ['$http', '$location', 'moment', function ($http, $location, moment) {
    var self = this;

    self.utcTimestamp;
    self.acutalTime;
    self.postedTime;

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

}]);