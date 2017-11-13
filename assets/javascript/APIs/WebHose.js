function getReviews(searchQuery) {
    if (!searchQuery)
        return;

    //Encodes the trimmed searchQuery to fit Webhose's URI structure
    var searchReviews = encodeURIComponent(searchQuery);


    //Creates a timestamp using moment.js 30 days from the moment of the search to give us the max number of days of Webhose's scraped reviews 
    const timeStamp = moment().subtract(30, "days");


    const requestURLWebhose = "http://webhose.io/reviewFilter?token=6580ba1e-e42f-4c2c-88a2-3d7a98ef6ffd&format=json&ts=" + timeStamp + "&sort=rating&q=language%3Aenglish%20item.title:" + searchReviews + "";


    return $.ajax({
        url: requestURLWebhose,
        method: "GET"
    })
}

