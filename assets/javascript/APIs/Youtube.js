function getVideo(str) {
    if (!str) 
        return; 

    var videoReview = searchQuery + " review";        
    const requestURL = `https://www.googleapis.com/youtube/v3/search?&order=relevance&part=snippet&q=${videoReview}&key=AIzaSyDRYhEcoUXij_i30idvqakBVEEPSlkXKrk`;
        
    var result = {title: "", videoId: "" };


    $.ajax({
        url: requestURL,
        method: "GET"
    }).done(function(response) {
        result.title = response.items[0].snippet.title;
        result.videoId = response.items[0].id.videoId;                    
    });

    return result;
}