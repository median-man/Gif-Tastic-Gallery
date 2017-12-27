// initial topics - must be lower case
const topics = ['flying circus', 'star wars', 'dune', 'willow', 'mad max'];

// store current topic
let currentTopic;

// html templates
const templates = {
  gifFigure: '<figure><div class="gif-container"><img></div><figcaption>Rating: <span class="rating"></span></figcaption></figure>',
};

// Giphy handles making requests to the Giphy API.
function Giphy() {
  this.apiKey = 'f3971dc19c6240feab39b26de85716d1';
  this.hostUrl = 'https://api.giphy.com';
  this.limit = 10;
  this.ratingLimit = 'pg-13';

  // Makes a get request to the Giphy API search endpoint and
  // returns a promise for the response data.
  this.search = function giphyApiSearchRequest(searchString) {
    let queryURL = 'https://api.giphy.com/v1/gifs/search?';

    // stop execution and return false if searchString is
    // invalid
    if (typeof searchString !== 'string'
      || searchString.length === 0) {
      return false;
    }

    // add query parameters to url
    queryURL += $.param({
      api_key: this.apiKey,
      q: searchString,
      limit: this.limit,
      rating: this.ratingLimit,
    });

    // return promise for the request
    return Promise.resolve($.ajax({
      url: queryURL,
      method: 'GET',
    }).done(response => response.data));
  };
}
const giphy = new Giphy();

function Gif(template, staticUrl, animatedUrl, rating) {
  this.$el = $(template);
  this.$img = this.$el.find('img');
  this.staticUrl = staticUrl;
  this.animatedUrl = animatedUrl;
  this.isAnimated = false;
  this.$el.find('.rating').text(rating);
  this.pause();

  // add event listener
  this.$img.on('click', this.toggle.bind(this));
}

// Sets the src attribute of the img element
Gif.prototype.setImage = function setImageSrcAttr(url) {
  this.$img.attr('src', url);
  return this;
};

// Sets the src attribute of img element to animated gif url
Gif.prototype.animate = function setImgSrcToAnimatedGif() {
  this.isAnimated = true;
  return this.setImage(this.animatedUrl);
};

// Sets the src attribute of img element to static image url
Gif.prototype.pause = function setImgSrcToStaticImage() {
  this.isAnimated = false;
  return this.setImage(this.staticUrl);
};

// Toggles the animate/pause state
Gif.prototype.toggle = function toggleGifAnimation() {
  if (this.isAnimated) return this.pause();
  return this.animate();
};

// Appends the component to the DOM as the last child of parent and
// sets listener for on click event
Gif.prototype.appendTo = function appendToParentElement(parent) {
  this.$el.hide();
  $(parent).append(this.$el.fadeIn());
  return this;
};

// Removes the component from the DOM
Gif.prototype.remove = function removeElementFromDOM() {
  this.$el.remove();
  return this;
};

// Constructor for Giffery object
function Giffery(selector) {
  this.selector = selector;
  this.gifs = [];
  
  this.$ = $(selector);
  // throw an error if selector does not match an element in the DOM
  if (this.$.length === 0) {
    throw new Error('Invalid selector');
  }
}
Giffery.prototype.addGif = function addGifToGiffery(gif) {
  this.gifs.push(gif);
  gif.appendTo(this.$);
  return gif;
};
Giffery.prototype.clear = function clearGiffery() {
  // do nothing if there are no gifs
  if (this.gifs.length === 0) {
    return Promise.resolve();
  }
  return Promise
    .resolve(this.$.fadeOut(200).promise())
    .then(() => {
      this.$.empty().show();
      this.gifs = [];
  });
};

/*
  topicButtons object
  ------------------------------------------------------------------

  Contains properties and methods for adding topics and interacting
  with the topic buttons.
*/
var topicButtons = {
  topics,
  addTopic(topic) {
    // Adds a new topic to topics

    // Parameters:
    // newTopic - string

    topic = topic.toLowerCase();

    // return false if topic has already been added or
    // topic is an empty string
    if (topic.length === 0 ||
      topics.indexOf(topic) > -1) {
      return false;
    }

    // add topic to topics and render the ubttons
    this.topics.unshift(topic);
    this.render();
  },
  getBtnTopic(btnElement) {
    // returns the topic of the btnElement
    return $(btnElement).attr('data-topic');
  },
  newButton(topic, isCurrent) {
    // Returns a jQuery object for a topic button
    // Paremeters:
    // topic - string for the topic of the button
    // isCurrent - boolean indicator for current topic

    let classes = 'u-full-width';
    const clsCurrentTopic = 'button-primary';

    // apply currentTopic class if topic is the current topic
    if (isCurrent) {
      classes += ` ${clsCurrentTopic}`;
    }

    // create button
    return $('<button>')
      .addClass(classes)
      .text(topic)
      .attr('data-topic', topic);
  },
  render() {
    // Renders topic buttons from topics array

    let classes;

    // clear buttons
    $('#buttonBox').empty();

    // add a button to #buttonBox for each topic
    this.topics.forEach((topic) => {
      // create button and add it to button box
      topicButtons.newButton(topic, topic === currentTopic)
        .appendTo('#buttonBox');
    });
  },
};

$(document).ready(() => {
  const giffery = new Giffery('#giffery');

  // display topic buttons
  topicButtons.render();

  // listen for click on #buttonBox
  $('#buttonBox').on('click', handleTopicSelection);

  // listen for click on #btnAddTopic
  $('#btnAddTopic').on('click', (event) => {
    event.preventDefault();

    // get the topic from the form and add it to the buttons
    topicButtons.addTopic($('#txtAddTopic').val());

    // clear input from form
    $('#txtAddTopic').val('');
  });

  // Sends request to giphy api for gifs and renders them
  function handleTopicSelection(event) {

    // get the topic of the button that was clicked
    const topic = topicButtons.getBtnTopic(event.target);

    // update currentTopic
    currentTopic = topic;

    // get gif data from giphy api and render the topic buttons
    giphy
      .search(topic)
      .then((giphyData) => {
        giffery
          .clear()
          .then(() => {
            giphyData.data.forEach((item) => {
              const gif = new Gif(
                templates.gifFigure,
                item.images.fixed_height_still.url,
                item.images.fixed_height.url,
                item.rating
              );
              giffery.addGif(gif);
            });
          });
    });
    topicButtons.render();
  }
});
