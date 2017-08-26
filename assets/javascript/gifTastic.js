var topics = ["flying circus", "star wars", "dune", "willow", "mad max"];



$(document).ready( function() {

	// image state enumeration
	var imgState = {
		still: "still",
		animated: "animated"
	};

	renderButtons();

	// listen for click on #buttonBox
	$("#buttonBox").on("click", handleTopicSelection);

	// listen for click on #giffery
	$("#giffery").on("click", function(event, imgState) {

		// if element clicked is an image
		if ( event.target.tagName === "IMG" ) {
			// animate if static. make static if animated.
			toggleImage(event.target);
		}
	});

	// listen for click on #btnAddTopic
	$("#btnAddTopic").on("click", function(event) { 
		event.preventDefault();

		// get the topic from the form and add it to the buttons
		addTopic($("#txtAddTopic").val());

		// clear input from form
		$("#txtAddTopic").val("");
	});

	function addTopic(newTopic) {
	// Adds a new topic button

		// Parameters:
		// newTopic - string

		// add topic from the form to beginning of topics array
		topics.unshift( newTopic );

		// render topic buttons
		renderButtons();
	}

	function getFigure(images, rating) {
	// Returns jquery figure element containing an image with rating

		// Parameters: 	
		// images - object returned from giphy api
		// rating - string for image rating

		// return a new html figure element
		return $("<figure>")

			// append new image
			.append(
				$("<img>").attr( {
					'src': images.fixed_height_still.url,
					'alt': $("#giffery").attr("data-topic"),
					'data-state': imgState.still,
					'data-still': images.fixed_height_still.url,
					'data-animate': images.fixed_height.url
				} ))

			// append rating to figure
			.append( 
				$("<figcaption>")
					.html("Rating: <span class='rating'>" + rating 
						+ "</span>")
					);
	}

	function handleTopicSelection(event) {
	// Sends request to giphy api for gifs


		var queryURL = "http://api.giphy.com/v1/gifs/search?";
		var topic = $(event.target).attr("data-topic");

		// update the style of selected topic button
		$("#buttonBox").children().removeClass("button-primary");
		$(event.target).addClass("button-primary");


		// add query parameters to url
		queryURL += $.param({
			api_key: "f3971dc19c6240feab39b26de85716d1",
			q: topic,
			limit: 10,
			rating: "pg-13"
		});

		// update data-topic of #giffery
		$("#giffery").attr("data-topic", topic);

		//send request
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {

			renderGifs(response);
		});
	}

	function renderButtons() {
	// Renders topic buttons from topics array

		// clear buttons
		$("#buttonBox").empty();

		// add a button to #buttonBox for each topic
		topics.forEach(function(topic) {
			$("<button>")
				.addClass("u-full-width")
				.text(topic)
				.attr("data-topic", topic)
				.appendTo("#buttonBox");
		});
	}

	function renderGifs(giphyData) {
	// Renders images in data

		var data = giphyData.data;
		
		// clear #giffery
		$("#giffery").empty()

		// apend images in #giffery for each gif with image in a
		// static (as opposed to animated) state
		for ( var i = 0; i < data.length; i++ ) {

			// append figure to the giffery
			var gifRating = giphyData.data[i].rating;
			getFigure(data[i].images, gifRating).appendTo("#giffery");
		}					
	}

	function toggleImage(img) {
	// Toggles the state of img--animated/static

		// Parameters: 	
		// img: html img element to toggle

		// get the state of the image
		var state = $(img).attr("data-state");

		// if the image is static
		if ( state === imgState.still ) {
			// animate the image and update state
			$(img).attr({
				'src': $(img).attr('data-animate'),
				'data-state': imgState.animated
			});			

		// if the image is animated
		} else if ( state === imgState.animated ) {
			// make the img static
			$(img).attr({
				'src': $(img).attr('data-still'),
				'data-state': imgState.still
			});	
		}
	}
});

