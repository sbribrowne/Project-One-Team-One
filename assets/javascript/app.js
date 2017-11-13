var a = {}

$(document).ready(function () {


	// the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
	$("#search").modal();

	$("#search").on("click", function () {
		event.preventDefault();
		$("#prod-title").empty();
		$("#prod-description").empty();
		$("#webhose-reviews").empty();
		$("#walmart-ratings").empty();
		$("#videos").empty();


		var searchQuery = $("#product-input").val().trim();

		//console.log(searchQuery);

		//display title from getTitle


		var titleUPC = getTitle(searchQuery);

		titleUPC.done(function (response) {
			a = {
				title: response.items[0].name,
				rating: response.items[0].customerRating,
				description: response.items[0].longDescription,
				imageURL: response.items[0].largeImage
			}

			function removeSpecialChars(str) {
				return str.replace(/&lt;/g, "")
					.replace(/&gt;/g, "")
					
			};

			var trimmedDescript = removeSpecialChars(a.description);
			alert(trimmedDescript);

			//display description and photo from BestBuy.js
			$("#prod-title").html(`${a.title}`);
			$("#prod-description").html(`<p id="prod-image"><img src="${a.imageURL}" alt="${a.title}" /></p>`);
			$("#prod-description").append(`<h5>Product Description:</h5> <p>${trimmedDescript}</p>`);

			if (a.rating === undefined) {
				$("#walmart-ratings").html(`<h5>No average rating to show, sorry!</h5>`);
			} else {
				$("#walmart-ratings").html(`<h5>Total Avg Customer Rating: ${a.rating}</h5>`);
			};



			// console.log(a);
			console.log(a.title);
			console.log(a.rating);
			console.log(a.description);
			console.log(a.imageURL);




			var webhose = getReviews(searchQuery); //Runs Webhose.js, displays results in DOM.

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
						console.log(response.reviews[i].item.title + " " + response.reviews[i].item.site);

						if (response.reviews[i].item.site !== placeholderSource) { //Checks that the current review is not the same source as the first review
							reviewSources.push(response.reviews[i].item.site);
							reviewTexts.push(response.reviews[i].text);
							reviewRatings.push(response.reviews[i].rating);

							placeholderSource = response.reviews[i].item.site; //Sets the "first" source to the current source
						}

						if (reviewSources.length >= 3) break; //Stops the loop after 3 sources
					}

					console.log("Sources array: " + reviewSources);
					console.log(reviewTexts);
					console.log(reviewRatings);

					var counter = 0;
					for (var x = 0; x < reviewRatings.length; x++) {
						counter += reviewRatings[x];

						//DISPLAY RESULTS IN DOM
						$("#webhose-reviews").append("<h5>Review #" + (x + 1) + "</h5 <br /> <p>Source: " + reviewSources[x] + " <br /><p>Customer Rating: " + reviewRatings[x] + " <br /><p>" + reviewTexts + "");

						/*var p = $("<p>")
						p.append("Source: " + reviewSources[x] + " <br />");
						p.append("Customer Rating: " + reviewRatings[x] + " <br />");
						p.append(reviewTexts[x]);
						$("#webhose-reviews").append(p);

						var p = $("<p>")*/
					}

				} else { //no result
					console.log("webhose did not find nothin'.");
					alert("webhose did not find nothin'.");
				}
			});

			var youtube = getVideo(searchQuery);
			youtube.done(function (response) {

				console.log(response);

				var video1 = response.items[0].id.videoId;
				var video2 = response.items[1].id.videoId;
				var video3 = response.items[2].id.videoId;
				console.log(video1);
				console.log(video2);
				console.log(video3);

				$("#videos-1").html("<object data='http://www.youtube.com/embed/" + video1 + "' width='500' height='300'></object>");
				$("#videos-2").html("<object data='http://www.youtube.com/embed/" + video2 + "' width='500' height='300'></object>");
				$("#videos-3").html("<object data='http://www.youtube.com/embed/" + video3 + "' width='500' height='300'></object>")


				console.log(response);

			});

		});

	});

});
