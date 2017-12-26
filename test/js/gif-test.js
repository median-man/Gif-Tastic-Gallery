/* global Gif html */
const htmlTemplate = html.gifFigure;

describe('Gif', () => {
  const expectedElementType = 'figure';
  const testStaticUrl = 'https://media1.giphy.com/media/jd6TVgsph6w7e/200_s.gif';
  const testAnimatedUrl = 'https://media1.giphy.com/media/jd6TVgsph6w7e/200.gif';
  describe('the $el property', () => {
    const $el = new Gif(htmlTemplate, testStaticUrl, testAnimatedUrl).$el;
    it('is a jQuery instance', () => {
      expect($el).to.be.an.instanceof($);
    });  
    it(`has an html element that is a ${expectedElementType}`, () => {
      expect($el.is('figure')).to.be.true;
    });
  });

  describe('appendTo method', () => {
    const $parent = $('<div>').appendTo('body');
    const gif = new Gif(htmlTemplate, testStaticUrl, testAnimatedUrl);
    it('appends the element to a parent element', () => {
      gif.appendTo($parent);
      expect($parent.children().is(gif.$el)).to.be.true;
    });
    it('returns the instance of the Gif', () => {
      expect(gif.appendTo($parent)).to.be.equal(gif);
    });
    after(() => {
      $parent.remove();
    });
  });

  describe('remove method', () => {
    let id = 'testGif-remove';
    let gif = {};
    beforeEach(() => {
      gif = new Gif(htmlTemplate, testStaticUrl, testAnimatedUrl).$el.attr('id', id);
    });
    afterEach(() => {
      $(`#${id}`).remove();
    });
    it('removes the element from the dom', () => {
      gif.appendTo('body');
      expect($(`#${id}`).length, 'gif.appendTo() failed to add element to DOM').to.equal(1);
      gif.remove();
      expect($(`#${id}`).length, 'element was not removed from the DOM').to.equal(0);
    });
    it('returns the instance of the Gif', () => {
      expect(gif.remove()).to.equal(gif);
    });
  });

  it('initialy displays the static/paused image', () => {
    const gif = new Gif(htmlTemplate, testStaticUrl, testAnimatedUrl).appendTo('body');
    expect(gif.$el.find('img').attr('src')).to.equal(testStaticUrl);
    gif.remove();
  });

  it('has an isAnimated property that is initially set to false', () => {
    const gif = new Gif(htmlTemplate, testStaticUrl, testAnimatedUrl).appendTo('body');
    expect(gif.isAnimated).to.be.false;
    gif.remove();
  });

  describe('animate method', () => {
    let gif = {};
    beforeEach(() => {
      gif = new Gif(htmlTemplate, testStaticUrl, testAnimatedUrl);
      gif.appendTo('body');
    });
    it('returns the instance of the Gif', () => {
      expect(gif.animate()).to.equal(gif);
    });
    it('sets the src of the img element to equal animateUrl', () => {
      gif.animate();
      expect(gif.$el.find('img').attr('src')).to.equal(testAnimatedUrl);
    });
    it('sets the isAnimated property to true', () => {
      gif.animate();
      expect(gif.isAnimated).to.be.true;
    });
    it('displays a loading indicator over the image until until the animated gif finishes loading');
    afterEach(() => {
      gif.remove();
    });
  });

  describe('pause method', () => {
    let gif = {};
    beforeEach(() => {
      gif = new Gif(htmlTemplate, testStaticUrl, testAnimatedUrl);
      gif.appendTo('body').animate();
    });
    it('returns the instance of the Gif', () => {
      expect(gif.pause()).to.equal(gif);
    });
    it('sets the src of the img element to equal pauseUrl', () => {
      gif.pause();
      expect(gif.$el.find('img').attr('src')).to.equal(testStaticUrl);
    });
    it('sets the isAnimated property to false', () => {
      gif.pause();
      expect(gif.isAnimated).to.be.false;
    });
    afterEach(() => {
      gif.remove();
    });
  });

  describe('when the image is clicked and the image is in a paused state', () => {
    let gif = {};
    beforeEach(() => {
      gif = new Gif(htmlTemplate, testStaticUrl, testAnimatedUrl).appendTo('body').pause();
      gif.$img.trigger('click');
    });
    it('isAnimated is true', () => {
      expect(gif.isAnimated).to.be.true;
    });
    it('src attribute of the img element is set to animatedUrl', () => {
      expect(gif.$el.find('img').attr('src')).to.equal(gif.animatedUrl);
    });
    afterEach(() => {
      gif.remove();
    });
  });
  describe('when the image is clicked and the image is in an animated state', () => {
    let gif = {};
    beforeEach(() => {
      gif = new Gif(htmlTemplate, testStaticUrl, testAnimatedUrl).appendTo('body').animate();
      gif.$img.trigger('click');
    });
    afterEach(() => {
      gif.remove();
    });
    it('isAnimated is false', () => {
      expect(gif.isAnimated).to.be.false;
    });
    it('src attribute of the img element is set to staticUrl', () => {
      expect(gif.$el.find('img').attr('src')).to.equal(gif.staticUrl);
    });
  });
});
