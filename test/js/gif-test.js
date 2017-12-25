/* global Gif */

describe('Gif', () => {
  const expectedElementType = 'figure';
  describe('the $el property', () => {
    const $el = new Gif().$el;
    it('is a jQuery instance', () => {
      expect($el).to.be.an.instanceof($);
    });  
    it(`has an html element that is a ${expectedElementType}`, () => {
      expect($el.is('figure')).to.be.true;
    });
  });

  describe('appendTo method', () => {
    const $parent = $('<div>').appendTo('body');
    const gif = new Gif();
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
      gif = new Gif().$el.attr('id', id);
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

  describe('setImages method', () => {
    it('returns the instance of the Gif', () => {
      const gif = new Gif();
      expect(gif)
    });
    it('sets the stillUrl property to a string');
    it('sets the animateUrl property to a string');
    it('sets the src of the img element to equal stillUrl');
  });

  describe('animate method', () => {
    it('sets the src of the img element to equal animateUrl');
    it('displays a loading indicator over the image until until the animated gif finishes loading');
  });

  describe('pause method', () => {
    it('sets the src of the img element to equal pauseUrl');
  });
});
