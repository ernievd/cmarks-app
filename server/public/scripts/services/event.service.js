myApp.service('EventService', ['$http', '$location', function($http, $location){
    var self = this;

    // add event
    self.addEvent = function(newEvent) {
        //hard code for now, later take in from input on DOM
        let event = {
            speaker_id: 1,
            speaker_name: 'Amy Richardson',
            title: 'Intro to Being Awesome',
            location: 'Prime Digital Academy',
            date: '03/14/2018',
            start_time: '01:00 PM',
            join_code: 'BOOM'
        } // end newEvent
        $http.post('/event', event).then(function(response) {
            console.log('event added!');
            //get events   
        })
        .catch(function(error) {
            console.log('uh oh, event did not add successfully');
        })
    } // end addEvent


    // edit event

    // get speaker's events

    // get audience member's events

    //generate code


}]);