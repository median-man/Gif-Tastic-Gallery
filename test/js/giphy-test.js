/* global giphy */

  // describe('Gif object', () => {

  //   it('has an $el property that is a jQuery collection with one element', () => {
  //     expect(new Gif().$el).to.be.an.instanceof($);
  //   });
  //   describe('appendTo method', () => {
  //     it('appends the element to a parent element');
  //     it('returns the instance of the Gif');
  //   });

  //   describe('setImages method', () => {
  //     it('sets the stillUrl property to a string');
  //     it('sets the animateUrl property to a string');
  //     it('sets the src of the img element to equal stillUrl');
  //   });

  //   describe('destroy method', () => {
  //     it('removes the element from the dom and destroys the instance');
  //   });

  //   describe('animate method', () => {
  //     it('sets the src of the img element to equal animateUrl');
  //     it('displays a loading indicator over the image until until the animated gif finishes loading');
  //   });

  //   describe('pause method', () => {
  //     it('sets the src of the img element to equal pauseUrl');
  //   });
  // });

  describe('Giphy object', () => {
    it('has a search method', () => {
      expect(giphy).to.have.property('search');
    });
    describe('the search method', () => {
      let searchResult = giphy.search('star wars');
      let resultData = {};
      let data = {};

      it('returns a promise', () => {
        expect(searchResult).to.be.a('promise');
      });

      describe('the result from the search method', () => {
        before((done) => {
          searchResult
            .then((response) => {
              resultData = response;
              data = resultData.data;
            }).finally(done);
        });
        it('has a meta object with an ok response', () => {
          expect(resultData).to.have.property('meta');
          expect(resultData.meta.msg).to.equal('OK');
        });
        it('has a data key', () => {
          expect(resultData).to.have.property('data');
        });
        it('data is an array with 10 or less objects', () => {
          expect(data).to.be.an('array').that.has.a.lengthOf.at.most(10);
        });
        it('each image object has a "type" key with a value of "gif"', () => {
          data.forEach(imageObj => expect(imageObj.type).to.equal('gif'));
        });
        it('each image object has a rating of g, pg, or pg-13', () => {
          data.forEach(imageObj => expect(imageObj.rating).to.be.oneOf(['g', 'pg', 'pg-13']));
        });
        it('each image object has a url for a fixed height gif', () => {
          data.forEach((imageObj) => {
            expect(imageObj.images.fixed_height.url).to.include('http');
          });
        });
        it('each image object has a url for a fixed height still image', () => {
          data.forEach((imageObj) => {
            expect(imageObj.images.fixed_height_still.url).to.include('http');
          });
        });
      });
    });
  });

