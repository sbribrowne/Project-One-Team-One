function getReviews(searchQuery) {
    if (!searchQuery)
        return;
    

    //Trims the users search input    
    var searchTrim = searchQuery.trim();
    console.log(searchTrim);


    //Then encodes the trim to fit Webhose's URI structure
    var searchReviews = encodeURIComponent(searchTrim);
    console.log("search reviews: " + searchReviews);


    //Creates a timestamp using moment.js 30 days from the moment of the search to give us the max number of days of Webhose's scraped reviews 
    const timeStamp = moment().subtract(30, "days");


    const requestURLWebhose = "http://webhose.io/reviewFilter?token=6580ba1e-e42f-4c2c-88a2-3d7a98ef6ffd&format=json&ts=" + timeStamp + "&sort=rating&q=language%3Aenglish%20item.title:" + searchReviews + "";
    console.log(requestURLWebhose);


    $.ajax({
        url: requestURLWebhose,
        method: "GET"
    }).done(function (response) {
        console.log(response);
        if(response.reviews.length > 0){ //Is there a result?
            var reviewSources = [];
                reviewSources[0] = response.reviews[0].item.site; // Assigning the first review site to first index
            var reviewTexts = [];
                reviewTexts[0] = response.reviews[0].text; //Assigning first review to first index
            var reviewRatings = [];
                reviewRatings[0] = response.reviews[0].rating; //Assigning first review rating to first index

            var placeholderSource = response.reviews[0].item.site; //Stores the first review site

            for(var i=0; i < response.reviews.length; i++){
                console.log( response.reviews[i].item.title + " " + response.reviews[i].item.site );

                if(response.reviews[i].item.site !== placeholderSource){ //Checks that the current review is not the same source as the first review
                    reviewSources.push(response.reviews[i].item.site);
                    reviewTexts.push(response.reviews[i].text);
                    reviewRatings.push(response.reviews[i].rating);

                    placeholderSource = response.reviews[i].item.site; //Sets the "first" source to the current source
                }

                if(reviewSources.length >= 3 ) break; //Stops the loop after 3 sources
            }

            console.log("Sources array: " + reviewSources);
            console.log(reviewTexts);
            console.log(reviewRatings);
            
            var counter=0;
            for(var x=0; x<reviewRatings.length; x++){
                counter += reviewRatings[x];

            //DISPLAY RESULTS IN DOM
                var p = $("<p>");
                p.append("Source " + (x +1) + ": " + reviewSources[x] + " <br />");
                p.append("Rating: " + reviewRatings[x] + " <br />");
                p.append(reviewTexts[x] + " ");
                $("#ratings").append(p);
            
            }
            var ratingsAverage = counter / reviewRatings.length;
            
            console.log("avg: " + ratingsAverage);
        }else{ //no result
            console.log("webhose did not find nothin'.");
            alert("webhose did not find nothin'.");
        }
    });
}

