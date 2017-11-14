//Sets a global object for storing Walmart API object returned from getTitle.js
var a = {}

$(document).ready(function () {


	//=========== On click function
	$(".search").click( function productSearch() {
		//Prevents page refresh on click
		event.preventDefault();

		//Empties the modal each time the user searches
		$("#prod-title").empty();
		$("#prod-description").empty();
		$("#webhose-reviews").empty();
		$("#walmart-ratings").empty();
		$("#videos-1").empty();
		$("#videos-2").empty();
		$("#videos-3").empty();


		//Stores the User's search
		var searchQuery = $(".product-input").val().trim();

		//Stores and then passes the User's search through the Walmart AJAX (getTitle.js) function
		var titleUPC = getTitle(searchQuery);

		titleUPC.done(function (response) {
			//Stores Walmart object from getTitle.js to a
			a = {
				title: response.items[0].name,
				rating: response.items[0].customerRating,
				description: response.items[0].longDescription,
				imageURL: response.items[0].largeImage
			}
			//Logs Walmart API object to console
			console.log(a);

			//Removes random html tags that may show up from Walmart descriptions
			function removeSpecialChars(str) {
				return str.replace(/(<([^>]+)>)/ig, "")
					.replace(/&lt;/g, "")
					.replace(/&gt;/g, "");
			};
			var trimmedDescript = removeSpecialChars(a.description);

			//Display title, description, and photo from Walmart AJAX (getTitle.js)
			$("#prod-title").html(`${a.title}`);
			$("#prod-description").html(`<p id="prod-image"><img src="${a.imageURL}" alt="${a.title}" /></p>`);
			$("#prod-description").append(`<p id="product-description">Product Description</p> <p id="description-paragraph">${trimmedDescript}</p>`);

			if (a.rating === undefined) {
				//Displays a message if there was no average rating from the API call
				$("#walmart-ratings").html(`<h5 class="avg-rating">Sorry, no average rating to show right now! #sad</h5>`);
			} else {
				//Displays the average rating if there is an average rating to display
				$("#walmart-ratings").html(`<h5 class="avg-rating">Total Avg Customer Rating: ${a.rating}</h5>`);
			};

			//============ Runs Webhose.js, displays results in DOM.
			var webhose = getReviews(searchQuery);
			webhose.done(function (response) {
				console.log(response);

				if (response.reviews.length > 0) { //Is there a result?
					var reviewSources = [];
					reviewSources[0] = response.reviews[0].item.site; // Assigning the first review site to first index
					var reviewTexts = [];
					reviewTexts[0] = response.reviews[0].text; //Assigning first review to first index
					var reviewRatings = [];
					reviewRatings[0] = response.reviews[0].rating; //Assigning first review rating to first index

					var placeholderSource = response.reviews[0].item.site; //Stores the first review site

					for (var i = 0; i < response.reviews.length; i++) {

						if (response.reviews[i].item.site !== placeholderSource) { //Checks that the current review is not the same source as the first review
							reviewSources.push(response.reviews[i].item.site);
							reviewTexts.push(response.reviews[i].text);
							reviewRatings.push(response.reviews[i].rating);

							placeholderSource = response.reviews[i].item.site; //Sets the "first" source to the current source
						}

						if (reviewSources.length >= 3) break; //Stops the loop after 3 sources
					}

					var counter = 0;
					for (var x = 0; x < reviewRatings.length; x++) {
						counter += reviewRatings[x];

						//DISPLAY RESULTS IN DOM
						$("#webhose-reviews").append("<h5 id='review-title'>Review #" + (x + 1) + "</h5 <br /> <p class='review-text'>Source: " + reviewSources[x] + " <br /><p class='review-text'>Customer Rating: " + reviewRatings[x] + " <br /><p class='review-text'>" + reviewTexts[x] + "");

					}

				} else { //Displays message if there are no results from Webhose.io
					console.log("webhose did not find nothin'.");
					$("#webhose-reviews").html("<h5 id='sorry-msg'>Sorry, there are no reviews for you right now! #sad</h5>");
				}
			});

			//=========== Runs YouTube.js, displays results in DOM
			var youtube = getVideo(searchQuery);
			youtube.done(function (response) {
				console.log(response);

				//Stores the first three videos from the API call
				var video1 = response.items[0].id.videoId;
				var video2 = response.items[1].id.videoId;
				var video3 = response.items[2].id.videoId;

				//Displays results in DOM
				$("#videos-1").html("<object data='https://www.youtube.com/embed/" + video1 + "' width='400' height='240'></object>");
				$("#videos-2").html("<object data='https://www.youtube.com/embed/" + video2 + "' width='400' height='240'></object>");
				$("#videos-3").html("<object data='https://www.youtube.com/embed/" + video3 + "' width='400' height='240'></object>")

			});

		});

	});

	//Trigger search if 'enter' is pressed instead of clicked
	$(document).on('keyup', function (e) {
    	if (e.keyCode == 13) {
    		$(".search").click();
	}
	});

});


