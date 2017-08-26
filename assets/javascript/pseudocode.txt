// api key f3971dc19c6240feab39b26de85716d1


// create array of topics
var arrTopics = [];

// array of gifs returned from giphy api
var arrGiphys = [];

/* Pseudocode
--------------------------------------------------------------------*/

// initialize topicButtons

// when a button in #buttonBox is clicked
// get the topic of the button
// change status bar to say loading gifs
// call getGiffs(topic)


// when an image is clicked
// check if the image is static or animated
// if the image is static
	// change to animated gif
// else ( the image is animated )
	// change to static gif

// when #btnAddTopic is clicked
	// add topic to arrTopics
	// renderButtons(arrTopics)
	// give clicked button a different style from the others


/* 	topicButtons object
	------------------------------------------------------------------
	properties:
		-container	html element	container for buttons
		-topics 	array			topic strings
	
	methods:
		+init			adds click event listener to container
		+render 		renders a button for each topic in topics
		+addTopic 		adds topic top topics array

	topicButtons.init method
	------------------------
	Initializes properties and sets event listener for button clicks
		parameters:
		arrTopics	array	topic strings

		add topics from arrTopics
		set event listener

	topicButtons.addTopic method
	----------------------------
	Adds topic or topics to topicButtons object
		parameters:
		topics 	array || string 	string or array of strings


		// if topics is a string
			// this.topics.push(topic)
		// else
			// join topics and this.topics
		// render topic buttons

	topicButtons.render method
	--------------------------
	Renders the topic buttons

		// clear #buttonBox
			// for each topic in arrTopics
				// add a new button element to #buttonBox
					// ex. html: <button class="u-full-width">One</button>
				// add data-topic to the button

*/



/*	getGifs function
	----------------
	parameters:
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
		data 	object	response from giphy api

	view example response: https://developers.giphy.com/docs/#sample-responses

	giphy api schema definitions:
	https://developers.giphy.com/docs/#schema-definitions

	clear #giffery
	add html for object to #giffery
		example html:
			<figure>
				<img src="https://media3.giphy.com/media/3o7TKxJRKk8uPOOdgY/200w.gif" alt="">
				<figcaption class="rating">Rating: PG</figcaption>
		    </figure>
    // add a click event listener to the images
    // clear loading message from status bar
	
*/

/* end pseudocode
--------------------------------------------------------------------*/