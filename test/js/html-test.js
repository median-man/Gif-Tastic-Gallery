/* global html */
describe('Html object',() => {
  it('has a gifFigure property that holds a valid html string', () => {
    expect(html).to.have.property('gifFigure');
    expect(html.gifFigure).to.be.a('string');
  });
  describe('The gifFigure property', () => {
    let $gifFigure = null;
    beforeEach(() => {
      $gifFigure = $(html.gifFigure);
    });
    it('has is a figure element', () => {
      expect($gifFigure.is('figure')).to.be.true;
    });
    it('has an img element in its decendents', () => {
      expect($gifFigure.find('img').is('img')).to.be.true;
    });
    it('has a span with the "rating" class', () => {
      const $span = $gifFigure.find('span.rating');
      expect($span.length).to.equal(1);
    });
    it('has a div with the "gif-container" class', () => {
      const $div = $gifFigure.find('div.gif-container');
      expect($div.length).to.equal(1);
    });
  });
});
