/* Angular JS Implementation */

getBinary(inURL, config) {
    // Need to use the vanilla XMLHttpRequest instead of $http since $http does not seem to handle the binary data well
    let deferred = this.$q.defer();
    let xhr = new XMLHttpRequest();
    xhr.open('GET', inURL, true);
    xhr.responseType = 'arraybuffer';
    xhr.setRequestHeader('Authorization', config.headers.Authorization);
    if (!angular.isDefined(config.headers.BasicBypassBrowserHandling)) {
        config.headers.BasicBypassBrowserHandling = 'true';
    }
    xhr.setRequestHeader('BasicBypassBrowserHandling',
        config.headers.BasicBypassBrowserHandling);
    xhr.onload = function() {
        if (xhr.status == 200) {
            deferred.resolve(this.response);
        } else {
            deferred.reject(Error(this.statusText));
        }

    };
    xhr.send();
    return deferred.promise;
}

return getBinary(iconUrl, config)
    .then(function(successResponse) {
        var arrayBufferView = new Uint8Array(successResponse);
        var blob = new Blob([arrayBufferView], {type: 'image/png'});
        return window.URL.createObjectURL(blob);
    }
);
