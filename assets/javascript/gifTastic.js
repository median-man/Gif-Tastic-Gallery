var topics = ["monty python", "star wars", "fails", "cats", "aviation"];


$(document).ready( function() {

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

	function addTopic(event) {
	// Adds new topic button
		event.preventDefault();
	}

	function handleTopicSelection(event) {
	// Sends request to giphy api for gifs

		var queryURL = "http://api.giphy.com/v1/gifs/search?";

		// add query parameters to url
		queryURL += $.param({
			api_key: "f3971dc19c6240feab39b26de85716d1",
			q: $(event.target).attr("data-topic"),
			limit: 10
		});

		// change the status bar to loading gifs
		Window.status = "Loading gifs...";	

		console.log(queryURL);

		//send request
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			console.log(data);
			renderGifs(response.data);
		});
	}

	function renderGifs(data) {
	// when a response is received from giphy
	// clear #giffery
	// apend images in #giffery for each gif
	}

	function toggleImage(img) {
	// Toggles the state of img--animated/static

	// get the clicked image
	// if the image is static
		// animate the image
	// if the image is animated
		// make the img static
	}
	

});

