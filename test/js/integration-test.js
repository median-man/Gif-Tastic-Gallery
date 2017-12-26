/* global require */
const { expect } = require('chai');
const Nightmare = require('nightmare');

describe('Gif-Tastic Gallery', function () {
  this.timeout('5s');
  it('loads without error', (done) => {
    Nightmare({ show: true })
      .goto('http://localhost:3000/index.html')
      .end()
      .then(console.log)
      .then(done)
      .catch(done);
  });
});
