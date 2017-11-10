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
    const timeStamp = moment().subtract(30, "days");


    const requestURL = "http://webhose.io/reviewFilter?token=6580ba1e-e42f-4c2c-88a2-3d7a98ef6ffd&format=json&ts=" + timeStamp + "&sort=rating&q=language%3Aenglish%20item.title:" + searchReviews + "";

    //stores our results
    var result = [];

    $.ajax({
        url: requestURL,
        method: "GET"
    }).done(function (response) {
        console.log(response);


       /* var reviewMap = new Map(source, reviews);

        foreach (var source in response);

        reviewMap.set(source, response.reviews.item[0].site_full)
        console.log(reviewMap);
        */

       /*
        reviewDict.firstSite.push(response.reviews[0].item.site_full);
        reviewDict.secondSite.push(response.reviews[1].item.site_full);
        reviewDict.thirdSite.push(response.reviews[2].item.site_full);

        reviewDict.firstSite.push(response.reviews[0].text);
        reviewDict.secondSite.push(response.reviews[1].text);
        reviewDict.thirdSite.push(response.reviews[2].text);
        */
    });

    return result;
    console.log(result);

}
