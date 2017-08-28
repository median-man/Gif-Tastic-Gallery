// initial topics - must be lower case
var topics = ["flying circus", "star wars", "dune", "willow", "mad max"];

// store current topic
var currentTopic;

/* 
	giphy object
	------------------------------------------------------------------

	Contains properties and methods for accessing the giphy api
*/
var giphy = {
	// --- giphy properties --- //

	// giphy search api parameters
	apiKey: "f3971dc19c6240feab39b26de85716d1",
	hostUrl: "https://api.giphy.com",
	limit: 10,
	ratingLimit: "pg-13",

	// --- giphy methods --- //

	search: function(searchString) {
	// Returns $.ajax() call to giphy search api. Returns
	// false if searchString is invalid or undefined.
		// Paremeters:
		// searchString - word or phrase to search for

		var searchPath = "/v1/gifs/search?";
		var queryURL = "https://api.giphy.com/v1/gifs/search?";

		// stop execution and return false if searchString is
		// invalid
		if ( typeof searchString !== 'string'
			|| searchString.length === 0 ) {
			return false;
		}

		// add query parameters to url
		queryURL += $.param({
			api_key: this.apiKey,
			q: searchString,
			limit: this.limit,
			rating: this.ratingLimit
		});

		//send ajax request and return it
		return $.ajax({
			url: queryURL,
			method: "GET"
		});
	}
};
/* 
	topicButtons object
	------------------------------------------------------------------

	Contains properties and methods for adding topics and interacting
	with the topic buttons.
*/
var topicButtons = {
	topics: topics,
	addTopic: function(topic) {
	// Adds a new topic to topics

		// Parameters:
		// newTopic - string

		topic = topic.toLowerCase();

		// return false if topic has already been added or
		// topic is an empty string
		if ( topic.length === 0 ||
			topics.indexOf(topic) > -1 ) {
			return false;
		}

		// add topic to topics and render the ubttons
		this.topics.unshift( topic );
		this.render();	
	},
	getBtnTopic: function(btnElement) {
	// returns the topic of the btnElement
		return $(btnElement).attr("data-topic");
	},
	newButton: function(topic, isCurrent) {
	// Returns a jQuery object for a topic button
		// Paremeters:
		// topic - string for the topic of the button
		// isCurrent - boolean indicator for current topic

		var classes = "u-full-width";
		var clsCurrentTopic = "button-primary";

		// apply currentTopic class if topic is the current topic
		if ( isCurrent ) {
			classes += " " + clsCurrentTopic;
		}

		// create button
		return $("<button>")
				.addClass(classes)
				.text(topic)
				.attr("data-topic", topic);	
	},
	render: function() {
	// Renders topic buttons from topics array

		var classes;

		// clear buttons
		$("#buttonBox").empty();

		// add a button to #buttonBox for each topic
		this.topics.forEach(function(topic) {

			// create button and add it to button box
			topicButtons.newButton(topic, topic === currentTopic)
				.appendTo("#buttonBox");
		});
	}
};

/* 
	giffery object
	------------------------------------------------------------------

	Contains properties and methods for displaying and interacting
	with gifs.
*/
var giffery = {
	// --- properties --- //

	// image states
	still: 'still',
	animated: 'animated',

	gifferyId: "#giffery",

	// --- methods --- //
	handleClick: function(event) {},
	newFigure: function(images, rating) {
	// Returns jquery figure element containing an image with rating

		// Parameters: 	
		// images - object returned from giphy api
		// rating - string for image rating

		var animatedUrl = images.fixed_height.url;
		var stillUrl = images.fixed_height_still.url;

		// return a new html figure element
		return $("<figure>")
			// append new image inside a div
			.append($("<div class='gif-container'>").append(
				$("<img>").attr( {
					'src': stillUrl,
					'alt': $("#giffery").attr("data-topic"),
					'data-state': this.still,
					'data-still': stillUrl,
					'data-animate': animatedUrl
				} )))
			// append rating to figure
			.append( 
				$("<figcaption>")
					.html("Rating: <span class='rating'>" + rating 
						+ "</span>")
					);
	},
	render: function(giphyData) {
	// Renders images in giphyData and scrolls to giffery on small screens
		// Parameters:
		// giphyData - object returned by giphy search api

		var data = giphyData.data;
		var $giffery = $(giffery.gifferyId);

		// clear #giffery
		$giffery.fadeTo(200, 0, function() {			
			$giffery.empty().css("opacity",1);

			// apend images in #giffery for each gif with image in a
			// static (as opposed to animated) state
			for ( var i = 0; i < data.length; i++ ) {
				// append figure to the giffery and fade in the image
				var gifRating = giphyData.data[i].rating;
				giffery.newFigure(data[i].images, gifRating)
					.hide()	
					.appendTo(giffery.gifferyId)
					.css("opacity",0)
					.fadeTo(800,1);
			}
		});

		// scroll window to giffery if page is displayed as a single
		// column (viewport width < 449px)
		if ( window.innerWidth < 550 ) {
		    $('body').animate({
		        scrollTop: $giffery.offset().top
		    });
	    }
	},
	toggleGif: function(img) {}
};

$(document).ready( function() {

	// image state enumeration
	var imgState = {
		still: "still",
		animated: "animated"
	};

	// display topic buttons
	topicButtons.render();

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
		topicButtons.addTopic($("#txtAddTopic").val());

		// clear input from form
		$("#txtAddTopic").val("");
	});

	function handleTopicSelection(event) {
	// Sends request to giphy api for gifs and renders them

		// get the topic of the button that was clicked
		var topic = topicButtons.getBtnTopic(event.target);

		// update #giffery topic attribute
		$("#giffery").attr("data-topic", topic);

		// update currentTopic
		currentTopic = topic;

		// get gif data from giphy api
		giphy.search(topic).done(giffery.render);

		topicButtons.render();
	}

	function toggleImage(img) {
	// Toggles the state of img--animated/static

		// Parameters: 	
		// img: html img element to toggle

		var $img = $(img);

		// get the state of the image
		var state = $img.attr("data-state");

		// if the image is static
		if ( state === imgState.still ) {
			// animate the image and update state
			$img.attr({
				'src': $img.attr('data-animate'),
				'data-state': imgState.animated
			});			

		// if the image is animated
		} else if ( state === imgState.animated ) {
			// make the img static
			$img.attr({
				'src': $img.attr('data-still'),
				'data-state': imgState.still
			});	
		}
	}
});