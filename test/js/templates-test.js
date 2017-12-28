/* global templates */
describe('Templates object',() => {
  it('has a gifFigure property that is a string', () => {
    expect(templates).to.have.property('gifFigure');
    expect(templates.gifFigure).to.be.a('string');
  });
  it('has a topicButton property', () => {
    expect(templates).to.have.a.property('topicButton');
  });
  describe('gifFigure', () => {
    let $gifFigure = null;
    before(() => {
      $gifFigure = $(templates.gifFigure).appendTo($fixtures);
    });
    after(() => {
      $fixtures.empty();
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
  describe('topicButton', () => {
    it('is a button element', () => {
      expect($(templates.topicButton).is('button')).to.be.true;
    });
    // the primary-button class should only be applied when a topic button is selected
    it('does not have the primary-button class', () => {
      expect($(templates.topicButton).hasClass('primary-button')).to.be.false;
    });
  });
});
