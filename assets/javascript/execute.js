$(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('#search').modal();

	//display title, description and photo from BustBuy.js
	$("#prod-title").html(""); //pass in title variable from BestBuy.js
	$("#prod-description").html(""); //pass in description variable from BestBuy.js
	$("prod-image").html(""); //pass in image variable from BestBuy.js

	//display ratings from WebHose.js
	$("#ratings").html(""); //pass in variable from Webhose.js

	//display videos from Youtube.js
 	$("#videos").html("") //pass in object variable from Youtube API


  });
