myApp.service('AudioService', ['$http', '$location', function ($http, $location) {
    var self = this;

    // filestack api
    var fsClient = filestack.init('AdBSk5gzuSiiQo0vc5eMOz');

    // filestack audio upload
    self.openPicker = function (event_id, speaker_id) {
        fsClient.pick({
            fromSources: ["local_file_system", "imagesearch", "facebook", "instagram", "dropbox"],
            accept: ["audio/*"]
        }).then(function (response) {

            // addAudio handles openPicker response
            self.addAudio(response, event_id, speaker_id);
        });
    }

    // Requests an update for the Audio URL 
    self.addAudio = function (response, event_id, speaker_id) {
        let audio_url = response.filesUploaded[0].url;
        
        let audioPost = {
            audio_url,
            event_id,
        };

        $http.put(`/audio/audioUpload/${speaker_id}`, audioPost)
        .then((result) => {
            console.log('succesful put on audio post', result);
        })
        .catch((error) => {
            console.log('error on put of audio post', error);
        })
    }
}]);