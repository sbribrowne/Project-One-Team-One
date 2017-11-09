function getTitleUPC(searchQuery) {
    if (!searchQuery) 
        return; 

    const requestURL = `http://api.walmartlabs.com/v1/search?query=${searchQuery}&format=json&apiKey=rqwj3h4qjprfdnuzvsn3cz4m`; 
    var result = {title: "", UPC: "" };

    // ===============CORS CODE=========================================
    jQuery.ajaxPrefilter(function(options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });
    // =================================================================        

    $.ajax({
        url: requestURL,
        method: "GET"
    }).done(function(response) {
        result.title = response.items[0].name;
        result.UPC = response.items[0].upc;                    
    });

    return result;
}