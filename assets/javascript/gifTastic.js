var topics = ["monty python", "star wars", "fails", "cats", "aviation"];


$(document).ready( function() {

	// render topic buttons for each topic in topics
	// adding them to #buttonBox
	topics.forEach(function(topic) {
		$("<button>")
			.addClass("u-full-width")
			.text(topic)
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

	function handleTopicSelection() {
	// Sends request to giphy api for gifs

	// change the status bar to loading gifs
	// get the topic of the button
	// request 10 gifs from giphy api for topic
	}

	function renderGifs() {
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

