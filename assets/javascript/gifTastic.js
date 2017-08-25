// api key f3971dc19c6240feab39b26de85716d1


// create array of topics
var arrTopics = [];

// array of gifs returned from giphy api
var arrGiphys = [];

/* Pseudocode
--------------------------------------------------------------------*/

// render buttons for each topic in arrTopics
// set a click listener on the buttons in #buttonBox

// when a button in #buttonBox is clicked
// get the topic of the button
// get 10 static gif images from giphy
// renderGifs()
// add a click event listener to the images
// add a click event listener to #btnAddTopic

// when an image is clicked
// check if the image is static or animated
// if the image is static
	// change to animated gif
// else ( the image is animated )
	// change to static gif

// when #btnAddTopic is clicked
	// add topic to arrTopics
	// get 10 gifs
	// renderGifs()
	// give clicked button a different style from the others

/*	getGifs function
	----------------
	paremters:
		topic 	string	topic to search for

	giphy api search endpoint doc:
	https://developers.giphy.com/docs/#operation--gifs-search-get

	example request from giphy docs:
		var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+
			gosling&api_key=YOUR_API_KEY&limit=5");
		xhr.done(function(data) { console.log("success got data", data); });

	generate request url to return 10 gifs using topic as the search
		parameter
	when response is received
	renderGifs(response)

*/

/* 	renderGifs function
	-------------------
	parameters:
		response 	object	response from giphy api

	view example response: https://developers.giphy.com/docs/#sample-responses

	giphy api schema definitions:
	https://developers.giphy.com/docs/#schema-definitions

	clear #giffery
	add each object to #giffery
	example html:
		<figure>
			<img src="https://media3.giphy.com/media/3o7TKxJRKk8uPOOdgY/200w.gif" alt="">
			<figcaption class="rating">Rating: PG</figcaption>
	    </figure>
*/

/* end pseudocode
--------------------------------------------------------------------*/