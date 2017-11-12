var a = {}
var result = {}

$(document).ready(function(){


	// the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('#search').modal();

    $("#search").on("click", function () {
    	event.preventDefault();
    
		var searchQuery = $("#product-input").val().trim();
		//console.log(searchQuery);

    	//display title from getTitleUPC
    	

    	var titleUPC = getTitleUPC(searchQuery);

    	titleUPC.done(function(response) {
        	a = {
				title: response.items[0].name,
				UPC:  response.items[0].upc,
				description: response.items[0].longDescription,
				imageURL: response.items[0].largeImage
	        }  

	        //display description and photo from BestBuy.js
			$("#prod-title").html(`${a.title} - ${a.UPC}`);
			$("#prod-description").html(`<p id="prod-image"><img src="${a.imageURL}" alt="${a.title}" /></p>`);
			$("#prod-description").append(`<p>${a.description}</p>`);
	        // console.log(a);
	        console.log(a.UPC);
			console.log(a.title);
			console.log(a.description);
			console.log(a.imageURL);

			getReviews(searchQuery); //Runs Webhose.js, displays results in DOM.
			
		/*
			var BestBuyResponse = searchBestBuy(a.UPC);
            var BestBuyObject = {};

            BestBuyResponse.done(function(response) {
                BestBuyObject = {
                    name: response.products[0].name,
                    imageURL:  response.products[0].image,
                    description: response.products[0].longDescription
                }  

                console.log(BestBuyObject.name);
                console.log(BestBuyObject.description);
				console.log(BestBuyObject.imageURL);

				$("#prod-description").html(`<p id="prod-image"><img src="${BestBuyObject.imageURL}" alt="${BestBuyObject.name}" /></p>`);
				$("#prod-description").append(`<p>${BestBuyObject.description}</p>`);
			
			});
		*/

        	var youtube = getVideo(a.title);
			youtube.done(function(response) {
		
			var video = response.items[0].id.videoId;
			console.log(video); 

			$("#videos").html("<object data='http://www.youtube.com/embed/" + video + "' width='500' height='300'></object>")

			//var prodtitle = JSON.stringify(a.title);
			//console.log(prodtitle);
			//var webhose = getReviews(searchQuery);
			//webhose.done(function (response) {

				//result = { 
       //  			title: response.reviews[0].item.title, 
       //  			site: response.reviews[0].item.site_full,
       //  			reviewText: response.reviews[0].text
    			// }

        	console.log(response);
        	console.log(result); 

        });

		});

		});

	}); 
    	
    	
		//display description and photo from BustBuy.js
		//$("#prod-title").html(""); //pass in title variable from BestBuy.js
		//$("#prod-description").html(""); //pass in description variable from BestBuy.js
		//$("#prod-image").html(""); //pass in image variable from BestBuy.js

		//display ratings from WebHose.js
		//$("#ratings").html(""); //pass in variable from Webhose.js

		//display videos from Youtube.js
 		//$("#videos").html("") //pass in object variable from Youtube API
