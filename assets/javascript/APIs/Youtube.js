function getVideo(searchQuery) {
    if (!searchQuery) 
        return; 

    //Takes the user's search and plugs it into YouTube's API URL
    const videoReview = searchQuery + " review";        
    const requestURL = `https://www.googleapis.com/youtube/v3/search?&order=relevance&part=snippet&q=${videoReview}&key=AIzaSyDRYhEcoUXij_i30idvqakBVEEPSlkXKrk`;

    return $.ajax({
        url: requestURL,
        method: "GET"
    })
}