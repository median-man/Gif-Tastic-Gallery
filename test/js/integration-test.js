/* global require */
const { expect } = require('chai');
const Nightmare = require('nightmare');

const url = 'http://localhost:3000/index.html';

describe('Gif-Tastic Gallery', function () {
  this.timeout('12s');
  it('take a screenshot', (done) => {
    const nightmare = new Nightmare();
    nightmare
      .goto(url)
      .screenshot(`test/screenshots/initial.png`)
      .end()
      .then(() => done())
      .catch((err) => {
        done(err);
      });
  });
  it('loads with five buttons in the #buttonBox element', (done) => {
    new Nightmare({ show: false })
      .goto(url)
      .wait('#buttonBox')
      .evaluate(() => {
        return document.querySelectorAll('#buttonBox button').length;
      })
      .end()
      .then(buttons => expect(buttons).to.equal(5))
      .then(() => done())
      .catch(done);
  });
  it('clicking a button in the button box adds up to 10 images in the #giffery element', (done) => {
    const nightmare = new Nightmare({ show: true });
    nightmare
      .goto(url)
      .wait('#giffery')
      .evaluate(() => document.querySelector('#giffery').childElementCount)
      .then((childCount) => {
        expect(childCount, '#giffery is not empty before click').to.equal(0);
      })
      .then(() => {
        return nightmare
          .click('#buttonBox button:first-child')
          .wait(2000)
          .screenshot(`test/screenshots/gifs-loaded.png`)
          .end()
          .evaluate(() => document.querySelectorAll('#giffery img').length);
      })
      .then((imageCount) => {
        expect(imageCount).to.be.at.least(1);
        expect(imageCount).to.be.at.most(10);
        done();
      })
      .catch(done);

      
  });
  it.skip('adds a button to the buttonBox when the form is submitted', () => {
    // create a new nightmare instance

    // get the number of buttons on the page

    // fill out the form to add a test button and submit it

    // there should be one more button than before
  });
  it('clicking an added button empties the #giffery element and adds ten new images to it');
  it('clicking an image in the giffery changes the src attribute');

  describe('Giphy Attribution', () => {
    it('has an image element', (done) => {
      new Nightmare({ show: false })
        .goto(url)
        .wait('#giphyAttribution img')
        .exists('#giphyAttribution img')
        .end()
        .then(imgExists => expect(imgExists).to.be.true)
        .then(() => done())
        .catch(done);
    });
    it('links to the Giphy web site', (done) => {
      const nightmare = new Nightmare({ show: false });
      nightmare
        .goto(url)
        .wait('#giphyAttribution img')
        .click('#giphyAttribution img')
        .evaluate(() => document.title)
        .then((title) => {
          expect(title, 'title did not match').to.equal('GIPHY | Search All the GIFs & Make Your Own Animated GIF');
          nightmare.end().then(); // .then must be called after end
          done();
        })
        .catch((err) => {
          nightmare
            .screenshot(`test/screenshots/giphy-failed-${Date.now()}.png`)
            .end()
            .then(() => done(err));
        });
    });
  });
});
