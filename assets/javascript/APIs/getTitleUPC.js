function getTitleUPC(searchQuery) {
    if (!searchQuery) 
        return; 

    const requestURL = `http://api.walmartlabs.com/v1/search?query=${searchQuery}&format=json&apiKey=rqwj3h4qjprfdnuzvsn3cz4m`; 

    // ===============CORS CODE=========================================
    jQuery.ajaxPrefilter(function(options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });
    // =================================================================        

    return $.ajax({
        url: requestURL,
        method: "GET"
    });
}