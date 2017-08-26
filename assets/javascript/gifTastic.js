var topics = ["monty python", "star wars", "fails", "cats", "aviation"];


$(document).ready( function() {

	// image state enumeration
	var imgState = {
		still: 0,
		animated: 1
	};

	// render topic buttons for each topic in topics
	// adding them to #buttonBox
	topics.forEach(function(topic) {
		$("<button>")
			.addClass("u-full-width")
			.text(topic)
			.attr("data-topic", topic)
			.appendTo("#buttonBox");
	});

	// listen for click on #buttonBox
	$("#buttonBox").on("click", handleTopicSelection);

	// listen for click on #giffery
	$("#giffery").on("click", toggleImage);

	// listen for click on #btnAddTopic
	$("#btnAddTopic").on("click", addTopic)

// TODO
	function addTopic(event) {
	// Adds new topic button
		event.preventDefault();
	}

	function getFigure(images, rating) {
	// Returns jquery figure element containing an image with rating
	// Parameters: images object and rating string

		// return a new html figure element
		return $("<figure>")

			// append new image
			.append(
				$("<img>").attr( {
					'src': images.fixed_height_still.url,
					'data-state': imgState.still,
					'data-static': images.fixed_height_still.url,
					'data-animate': images.fixed_height.url
					} ) )

			// append rating to figure
			.append($("<figcaption>")
				.text("Rating: " + rating) );
	}

	function handleTopicSelection(event) {
	// Sends request to giphy api for gifs

		var queryURL = "http://api.giphy.com/v1/gifs/search?";

		// add query parameters to url
		queryURL += $.param({
			api_key: "f3971dc19c6240feab39b26de85716d1",
			q: $(event.target).attr("data-topic"),
			limit: 10,
			rating: "pg-13"
		});

		// change the status bar to loading gifs
		Window.status = "Loading gifs...";	

		//send request
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			renderGifs(response);
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

// TODO
	function toggleImage(img) {
	// Toggles the state of img--animated/static

	// get the clicked image
	// if the image is static
		// animate the image
	// if the image is animated
		// make the img static
	}
	

});

