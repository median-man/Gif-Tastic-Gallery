/* global giffery */
const gifferyId = '#giffery';
describe('Giffery', () => {
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
  describe('render method', () => {
    // add a giffery fixture to the page
    before(() => {
      expect(giffery.gifferyId).to.equal(gifferyId);
      $fixtures
        .empty()
        .hide()
        .append($('<div>').attr('id', gifferyId.replace('#', '')));
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
      $fixtures.empty().hide().append($('<div>').attr('id', gifferyId.replace('#', '')));
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
