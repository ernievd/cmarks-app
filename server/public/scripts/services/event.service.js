myApp.service('EventService', ['$http', '$location', 'moment', function ($http, $location) {
    var self = this;

    // variables for conrollers
    self.upcomingEvents = {
        list: []
    };
    self.pastEvents = {
        list: []
    };
    self.eventInfo = {
        list: []
    };
    self.wrongCode = {
        code: '',
        check: false
    };
    self.audienceEvents = {
        list: []
    };

    // get speaker's upcoming events
    self.getUpcomingEvents = function () {
        $http.get(`/event/upcoming/`)
            .then(function (response) {
                //set the response to the upcomingEvents list
                self.upcomingEvents.list = response.data;
            })
            .catch(function (error) {
                console.error('Error getting upcoming events:', error);
            })
    }; // end getUpcomingEvents

    //on load
    self.getUpcomingEvents();

    // get speaker's past events
    self.getPastEvents = function () {
        $http.get(`/event/past/`)
            .then(function (response) {
                //set response from server to pastEvents list
                self.pastEvents.list = response.data;
            })
            .catch(function (error) {
                console.error('Error getting past events:', error);
            })
    }; // end getPastEvents

    //on load
    self.getPastEvents();

    // change an event's status to complete
    self.completeEvent = function (event_id) {
        $http.put(`/event/complete/${event_id}`).then(function (response) {
                // get past and upcoming events to have most recent info
                self.getPastEvents();
                self.getUpcomingEvents();

                // delete join code
                self.deleteCode(event_id);
            })
            .catch(function (error) {
                console.error('Error completing event', error);
            })
    }; //end completeEvent

    // add event
    self.addEvent = function (newEvent) {
        $http.post('/event', newEvent).then(function (response) {
                //get events to keep DOM updated
                self.getUpcomingEvents();
            })
            .catch(function (error) {
                console.error('Error adding event:', error);
            })
    }; // end addEvent


    // edit event
    self.editEvent = function (editedEvent) {
        $http.put(`/event/edit`, editedEvent).then(function (response) {
                //get events from database to ensure they are updated on DOM
                self.getUpcomingEvents();
                self.getPastEvents();
            })
            .catch(function (error) {
                console.error('Error editing event:', error);
            })
    }; //end editEvent

    // get all events audience member has attended
    self.getAudienceEvents = function () {
        $http.get('/event/audience/all').then(function (response) {
                self.audienceEvents.list = response.data;
            })
            .catch(function (error) {
                console.error('Error getting audience events:', error);
            })
    }; //end getAudienceEvents

    // join event
    self.joinEvent = function (code) {
        $http.put(`/event/join/${code}`).then(function (response) {
                console.log('got join info', response.data);
                self.eventInfo.list = response.data;
                if (self.eventInfo.list[0] != undefined) {
                    self.wrongCode.check = false;
                    $location.path(`/event`);
                } else {
                    console.log('Not correct code', code);
                    self.wrongCode.code = `${code} is not a valid event code, please try again`;
                    self.wrongCode.check = true;
                }
            })
            .catch(function (error) {
                console.log('Error on get join info', error);

            })
    };

    //delete used code
    self.deleteCode = function (eventId) {
        $http.delete(`/event/delete/${eventId}`).then(function (response) {
                console.log('Code Deleted');
            })
            .catch(function (error) {
                console.log('Error on deleting code');
            })
    }
}]);