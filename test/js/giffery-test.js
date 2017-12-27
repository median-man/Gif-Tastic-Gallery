/* global Gif giffery templates */
const gifferyId = '#giffery';
const gifferyDiv = () => {
  const div = document.createElement('div');
  div.id = 'giffery';
  return div;
};
describe('Giffery', function () {
  this.timeout(4000);
  it('has a gifferyId property', () => {
    expect(giffery).to.have.property('gifferyId');
  });
  it('has a handleClick method', () => {
    expect(giffery).to.have.property('handleClick');
    expect(giffery.handleClick).to.be.a('function');
  });
  it('has a render method', () => {
    expect(giffery).to.have.property('render');
    expect(giffery.render).to.be.a('function');
  });
  it('has a toggleGif method', () => {
    expect(giffery).to.have.property('toggleGif');
    expect(giffery.toggleGif).to.be.a('function');
  });
  it('has a gifs property that is an array', () => {
    expect(giffery).to.have.a.property('gifs');
    expect(giffery.gifs).to.be.an('array');
  });
  describe('addGif method', () => {
    let gif = null;
    const staticImg = mockResponse.data[0].images.fixed_height_still.url;
    const animatedImg = mockResponse.data[0].images.fixed_height.url;
    const rating = mockResponse.data[0].rating;

    // reset fixtures and get a new gif before each test
    beforeEach(() => {
      $fixtures.empty().hide().append(gifferyDiv);
      expect($fixtures.children().length).to.equal(1);
      gif = new Gif(templates.gifFigure, staticImg, animatedImg, rating);
      giffery.gifs = [];
    });

    it('adds a new Gif instance to the gifs array', () => {
      giffery.addGif(gif);
      expect(giffery.gifs).to.include(gif);
    });
    it('returns the new Gif instance', () => {
      expect(giffery.addGif(gif)).to.equal(gif);
    });
    it('appends the new Gif to the #giffery element', () => {
      giffery.addGif(gif);
      expect($fixtures.find(gif.$el).length).to.equal(1);
    });
  });
  describe('render method', () => {
    // add a giffery fixture to the page
    before(() => {
      expect(giffery.gifferyId).to.equal(gifferyId);
      $fixtures
        .empty()
        .hide()
        .append(gifferyDiv());
      expect($fixtures.has(gifferyId).length).to.equal(1);
    });
    after(() => {
      $fixtures.empty().show();
    });
    it('adds images for Giphy API response to #giffery element', (done) => {
      // render the mock
      expect(() => giffery.render(mockResponse)).to.not.throw();
      // wait for animations to finish
      setTimeout(() => {
        // compare count of images in giffery to images in mock
        expect($(gifferyId).find('img').length).to.equal(mockResponse.data.length);
        done();
      }, 300);
    });
  });
  describe('toggleGif method', () => {
    before((done) => {
      // render mock images and ensure they are present
      $fixtures.empty().hide().append(gifferyDiv());
      giffery.render(mockResponse);
      setTimeout(() => {
        expect($fixtures.find('img').size()).to.be.at.least(1);
        done();
      }, 250);
    });
    // after(() => $fixtures.empty().show());
    it('toggles the src attribute on an image', () => {
      const imgEl = $fixtures.find('img').get(0);
      const startingSrc = imgEl.src;
      expect(() => giffery.toggleGif(imgEl)).to.not.throw();
      expect(imgEl.src).to.not.be.empty;
      expect(imgEl.src).to.not.be.undefined;
      expect(imgEl.src).to.not.be.equal(startingSrc); 
    });
  });
});
