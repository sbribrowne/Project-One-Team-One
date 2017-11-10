function getVideo(title) {
    if (!title) 
        return; 

    const videoReview = title + " review";        
    const requestURL = `https://www.googleapis.com/youtube/v3/search?&order=relevance&part=snippet&q=${videoReview}&key=AIzaSyDRYhEcoUXij_i30idvqakBVEEPSlkXKrk`;

    var result = {title: "", videoId: "" };


    return $.ajax({
        url: requestURL,
        method: "GET"
    })
}
