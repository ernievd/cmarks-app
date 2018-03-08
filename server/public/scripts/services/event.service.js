myApp.service('EventService', ['$http', '$location', function ($http, $location) {
    var self = this;

    self.generateCode = function () {
        $http.post(`/event/code`).then(function (response) {
            console.log('Code post success:', response);
        })
            .catch(function (error) {
                console.log('Error on post code:', error);
            })
    }

}]);