function getReviews(str) {
    if (!str)
        return;
    

    //Trims the users search input    
    var searchTrim = str.trim();
    console.log(searchTrim);

    //Then encodes the trim to fit Webhose's URI structure
    var searchReviews = encodeURIComponent(searchTrim);
    console.log(searchReviews);


    //creates a timestamp using moment.js 30 days from the moment of the search to give us the max number of days of Webhose's scraped reviews 
    var timeStamp = moment().subtract(30, "days");


    const requestSite = "http://webhose.io/reviewFilter?token=6580ba1e-e42f-4c2c-88a2-3d7a98ef6ffd&format=json&ts=" + timeStamp + "&sort=rating&q=language%3Aenglish%20item.title:" + searchReviews + "";

    //stores our results
    // var result = { 
    //     title: "", 
    //     site: "",
    //     reviewText: "" 
    // };

    return $.ajax({
        url: requestSite,
        method: "GET"
    }).done((response) => {
        return  {
            title: response.reviews[0].item.title,
            site:  response.reviews[0].item.site_full,
            reviewText: response.reviews[0].text
        }
    });
}