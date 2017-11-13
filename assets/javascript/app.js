var a = {}

$(document).ready(function() {


	// the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
	$('#search').modal();

	$("#search").on("click", function () {
		event.preventDefault();
		$("#prod-title").empty();
		$("#prod-description").empty();
		$("#webhose-ratings").empty();
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

			//display description and photo from BestBuy.js
			$("#prod-title").html(`${a.title}`);
			$("#prod-description").html(`<p id="prod-image"><img src="${a.imageURL}" alt="${a.title}" /></p>`);
			$("#prod-description").append(`<h5>Product Description:</h5> <p>${a.description}</p>`);

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

			getReviews(searchQuery); //Runs Webhose.js, displays results in DOM.

			

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
