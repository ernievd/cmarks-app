myApp.service('EventService', ['$http', '$location', function ($http, $location) {
    var self = this;

    self.upcomingEvents = { list: [] };
    self.pastEvents = { list: [] };
    self.eventInfo = { list: [] };
    self.wrongCode = {code:'', check: false};
    self.audienceEvents = { list: []};

    // get speaker's upcoming events
    self.getUpcomingEvents = function () {
        $http.get(`/event/upcoming/`)
            .then(function (response) {
                self.upcomingEvents.list = response.data;
                console.log(self.upcomingEvents.list);
            })
            .catch(function (error) {
                console.log('error getting events:', error);
            })
    } // end getUpcomingEvents

    //on load
    self.getUpcomingEvents();

    // get speaker's past events
    self.getPastEvents = function () {
        //hard code for now, later take in speaker id
        $http.get(`/event/past/`)
            .then(function (response) {
                self.pastEvents.list = response.data;
                console.log(self.pastEvents.list);
            })
            .catch(function (error) {
                console.log('error getting events:', error);
            })
    } // end getPastEvents

    //on load
    self.getPastEvents();

    // change an event's status to complete
    self.completeEvent = function (event_id) {
        console.log('event id:', event_id);

        $http.put(`/event/complete/${event_id}`).then(function (response) {
            console.log('event completed!');
            self.getPastEvents();
            self.getUpcomingEvents();
            self.deleteCode(event_id);
        })
            .catch(function (error) {
                console.log('error completing event');
            })
    } //end completeEvent

    // add event
    self.addEvent = function (newEvent) {
        //hard code for now, later take in from input on DOM
        console.log('new event: ', newEvent);
        
        $http.post('/event', newEvent).then(function (response) {
            console.log('event added!', response);
            //get events   
            self.getUpcomingEvents();
        })
            .catch(function (error) {
                //tell user something
                console.log('uh oh, event did not add successfully');
            })
    } // end addEvent


    // edit event


    // get audience member's events
    self.getAudienceEvents = function() {
        $http.get('/event/audience/all').then(function(response){
            // console.log('got events!', response);
            self.audienceEvents.list = response.data;
            console.log('events:', self.audienceEvents.list);
            
        })
    }

    //get event info to edit
    self.getEventInfo = function() {
        $http.get()
    }

    // join event
    self.joinEvent = function(code){
        $http.put(`/event/join/${code}`).then(function(response){
            console.log('got join info', response.data);
            self.eventInfo.list = response.data;
            if(self.eventInfo.list[0] != undefined){
                self.wrongCode.check = false;
                $location.path(`/event`);
            } else {
                console.log('Not correct code', code);
                self.wrongCode.code = `${code} is not a valid event code, please try again`;
                self.wrongCode.check = true;
            }
        })
        .catch(function(error){
            console.log('Error on get join info', error);
            
        })
    }
    
    //delete used code
    self.deleteCode = function(eventId){
        $http.delete(`/event/delete/${eventId}`).then(function(response){
            console.log('Code Deleted');
        })
        .catch(function(error){
            console.log('Error on deleting code');
        })
    }
}]);