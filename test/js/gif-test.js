/* global Gif templates */
const htmlTemplate = templates.gifFigure;

describe('Gif', () => {
  const expectedElementType = 'figure';
  const testStaticUrl = 'https://media1.giphy.com/media/jd6TVgsph6w7e/200_s.gif';
  const testAnimatedUrl = 'https://media1.giphy.com/media/jd6TVgsph6w7e/200.gif';
  describe('the $el property', () => {
    let $el = null;
    before(() => {
      $el = new Gif(htmlTemplate, testStaticUrl, testAnimatedUrl).$el;
    });
    it('is a jQuery instance', () => {
      expect($el).to.be.an.instanceof($);
    });  
    it(`has an html element that is a ${expectedElementType}`, () => {
      expect($el.is('figure')).to.be.true;
    });
  });

  describe('appendTo method', () => {
    const gif = new Gif(htmlTemplate, testStaticUrl, testAnimatedUrl);
    afterEach(() => {
      $fixtures.empty();
    });
    it('appends the element to a parent element', () => {
      gif.appendTo($fixtures);
      expect($fixtures.children().is(gif.$el)).to.be.true;
    });
    it('returns the instance of the Gif', () => {
      expect(gif.appendTo($fixtures)).to.be.equal(gif);
    });
  });

  describe('remove method', () => {
    let id = 'testGif-remove';
    let gif = {};
    beforeEach(() => {
      gif = new Gif(htmlTemplate, testStaticUrl, testAnimatedUrl);
      gif.$el.attr('id', id);
      $fixtures.append(gif.$el);
    });
    afterEach(() => {
      // perform cleanup by removing the element in the event a test fails to remove it.
      $fixtures.empty();
    });
    it('removes the element from the dom', () => {
      // ensure the element is present on the dom
      expect($fixtures.find(`#${id}`).length, 'element not present in DOM before test').to.equal(1);
      gif.remove();
      expect($fixtures.children().length, 'element was not removed from the DOM').to.equal(0);
    });
    it('returns the instance of the Gif', () => {
      expect(gif.remove()).to.equal(gif);
    });
  });

  it('initialy displays the static/paused image', () => {
    const gif = new Gif(htmlTemplate, testStaticUrl, testAnimatedUrl);
    $fixtures.append(gif.$el);
    expect($fixtures.find('img').attr('src')).to.equal(testStaticUrl);
    $fixtures.empty();
  });

  it('has an isAnimated property that is initially set to false', () => {
    const gif = new Gif(htmlTemplate, testStaticUrl, testAnimatedUrl);
    $fixtures.append(gif.$el);
    expect(gif.isAnimated).to.be.false;    
    $fixtures.empty();
  });

  describe('animate method', () => {
    let gif = {};
    beforeEach(() => {
      gif = new Gif(htmlTemplate, testStaticUrl, testAnimatedUrl);
      $fixtures.append(gif.$el);
    });
    afterEach(() => {
      $fixtures.empty();
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
    it('displays a loading indicator over the image until the animated gif finishes loading');
  });

  describe('pause method', () => {
    let gif = {};
    beforeEach(() => {
      gif = new Gif(htmlTemplate, testStaticUrl, testAnimatedUrl);
      $fixtures.append(gif.$el);
      gif.animate();
    });
    afterEach(() => {
      $fixtures.empty();
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
  });

  describe('when the image is clicked and the image is in a paused state', () => {
    let gif = {};
    beforeEach(() => {
      gif = new Gif(htmlTemplate, testStaticUrl, testAnimatedUrl);
      $fixtures.append(gif.$el);
      gif.pause();
      $fixtures.find('img').trigger('click');
    });
    afterEach(() => {
      $fixtures.empty();
    });
    it('isAnimated is true', () => {
      expect(gif.isAnimated).to.be.true;
    });
    it('src attribute of the img element is set to animatedUrl', () => {
      expect(gif.$el.find('img').attr('src')).to.equal(gif.animatedUrl);
    });
  });
  describe('when the image is clicked and the image is in an animated state', () => {
    let gif = {};
    beforeEach(() => {
      gif = new Gif(htmlTemplate, testStaticUrl, testAnimatedUrl);
      $fixtures.append(gif.$el);
      gif.animate();
      gif.$img.trigger('click');
    });
    afterEach(() => {
      $fixtures.empty();
    });
    it('isAnimated is false', () => {
      expect(gif.isAnimated).to.be.false;
    });
    it('src attribute of the img element is set to staticUrl', () => {
      expect(gif.$el.find('img').attr('src')).to.equal(gif.staticUrl);
    });
  });
});
