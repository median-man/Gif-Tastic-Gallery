// initial topics - must be lower case
const topics = ['flying circus', 'star wars', 'dune', 'willow', 'mad max'];

// html templates
const templates = {
  gifFigure: '<figure><div class="gif-container"><img></div><figcaption>Rating: <span class="rating"></span></figcaption></figure>',
  topicButton: '<button class="u-full-width button-primary"></button>',
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

function TopicButton(topic, html) {
  this.topic = topic;
  this.$ = $(html).text(topic);
  this.$.on('click', () => {
    if (this.onClick) this.onClick(this.topic);
  });
  this.isSelected = false;  
}
TopicButton.prototype.selected = function isTopicButtonSelected(value) {
  if (typeof value === 'undefined') {
    return this.isSelected;
  }
  this.isSelected = value;
  if (this.isSelected) {
    this.$.addClass('button-primary');
  } else {
    this.$.removeClass('button-primary');
  }
  return this.isSelected;
};

function TopicButtons(selector, topicArr) {
  this.$ = $(selector);
  this.buttons = [];
  topicArr.forEach((element) => {
    this.add(element);
  });
  this.onTopicChange = false;
}
TopicButtons.prototype.add = function addTopicButton(topicButton) {
  this.$.append(topicButton.$);
  this.buttons.push(topicButton);
};
TopicButtons.prototype.setTopic = function setTopic(topic) {
  // get the button for the topic
  // deselect all buttons and select the button for the topic
  this.buttons.forEach((item) => {
    item.topic === topic ? item.selected(true) : item.selected(false);
  });
  // call onTopicChange if its set
  if (this.onTopicChange) this.onTopicChange(topic);
};

$(document).ready(() => {
  const giffery = new Giffery('#giffery');

  // add buttons for initial topics
  const topicButtons = topics.map((item) => {
    return new TopicButton(item, templates.topicButton);
  });
  topicButtons.onClick(handleTopicSelection);

  // add a new button when add topic clicked
  $('#btnAddTopic').on('click', () => {
    topicButtons.add(new TopicButton($('#txtAddTopic').val().trim(), templates.topicButton));
    $('#txtAddTopic').val('');
  });

  // Sends request to giphy api for gifs and renders them
  function handleTopicSelection(topic) {
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
  }
});
