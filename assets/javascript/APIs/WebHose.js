function getReviews(str) {
    if (!str)
        return;
    

    //Trims the users search input    
    var searchTrim = searchQuery.trim();
    console.log(searchTrim);

    //Then encodes the trim to fit Webhose's URI structure
    var searchReviews = encodeURIComponent(searchTrim);
    console.log(searchReviews);


    //creates a timestamp using moment.js 30 days from the moment of the search to give us the max number of days of Webhose's scraped reviews 
    var timeStamp = moment().subtract(30, "days");


    const requestURL = "http://webhose.io/reviewFilter?token=6580ba1e-e42f-4c2c-88a2-3d7a98ef6ffd&format=json&ts=" + timeStamp + "&sort=rating&q=language%3Aenglish%20item.title:" + searchReviews + "";

    //stores our results
    var result = { 
        title: "", 
        site: "",
        reviewText: "" 
    };

    $.ajax({
        url: requestURL,
        method: "GET"
    }).done(function (response) {
        console.log(response);
        result.title = response.reviews[0].item.title;
        result.site = response.reviews[0].item.site_full;
        result.reviewText = response.reviews[0].text;

        var reviewSources = [];
        var reviewTexts = [];
        var placeholderSource = response.reviews[0].item.site; //FIrst source

        for(var i=0; i < response.reviews.length; i++){
            console.log( response.reviews[i].item.title + " " + response.reviews[i].item.site );

            if(response.reviews[i].item.site !== placeholderSource){ //check that current review is not same source as first review
                reviewSources[i] = response.reviews[i].item.site;
                reviewTexts[i] = response.reviews[i].text;

                placeholderSource = response.reviews[i].item.site; //sets "first" source to current source
            }

            if(reviewSources.length >= 3 ) break; //quit after 3 sources
        }

        console.log(reviewSources);
        console.log(reviewTexts);
    });

    return result;
    console.log(result);
}