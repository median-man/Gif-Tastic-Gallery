/* global TopicButtons TopicButton */
const btnHtml = '<button class="u-full-width button-primary"></button>';
describe('TopicButton', () => {
  it('has a topic property that is a string', () => {
    expect(new TopicButton('pubg', btnHtml)).to.have.a.property('topic');
    expect(new TopicButton('pubg', btnHtml).topic).to.be.a.string;
  });
  describe('constructor', () => {
    it('initializes the $ property from the html argument', () => {
      const topicBtn = new TopicButton('', btnHtml);
      expect(topicBtn.$.is('button')).to.be.true;
    });
    it('initializes isSelected as false', () => {
      expect(new TopicButton('', btnHtml).isSelected).to.be.false;
    });
  });
  describe('$', () => {
    it('is a jQuery collection containing a single button element', () => {
      const topicBtn = new TopicButton('', btnHtml);
      expect(topicBtn.$.length).to.equal(1);
    });
    it('the element has text that is the same as the topic', () => {
      const topicBtn = new TopicButton('', btnHtml);
      expect(topicBtn.$.text()).to.equal(topicBtn.topic);
    });
  });
  describe('selected', () => {
    let topicBtn = null;
    beforeEach(() => {
      topicBtn = new TopicButton('', btnHtml);
    });
    it('returns the value of isSelected when no parameters are passed', () => {
      topicBtn.isSelected = true;
      expect(topicBtn.selected()).to.be.true;
      topicBtn.isSelected = false;
      expect(topicBtn.selected()).to.be.false;
    });
    it('sets the value of isSelected when a parameter is passed', () => {
      topicBtn.isSelected = false;
      topicBtn.selected(true);
      expect(topicBtn.isSelected).to.be.true;
      topicBtn.selected(false);
      expect(topicBtn.isSelected).to.be.false;
    });
    it('adds the button-primary class when passed true', () => {
      topicBtn.$.removeClass('button-primary');
      topicBtn.selected(true);
      expect(topicBtn.$.hasClass('button-primary')).to.be.true;
    });
    it('removes the button-primary class when passed true', () => {
      topicBtn.isSelected = false;
      topicBtn.$.addClass('button-primary');
      topicBtn.selected(false);
      expect(topicBtn.$.hasClass('button-primary')).to.be.false;
    });
  });
  describe('when the button is clicked', () => {
    let topicBtn = null;
    before(() => {
      topicBtn = new TopicButton('pubg', btnHtml);
      $fixtures.append(topicBtn.$);
    });
    after(() => topicBtn.$.remove());
    it('calls onClick', () => {
      let testCalled = false;
      topicBtn.onClick = () => { testCalled = true; };
      topicBtn.$.trigger('click');
      expect(testCalled).to.be.true;
    });
  });
});
describe('TopicButtons', () => {
  const id = 'buttonBox';
  const methods = ['add', 'setTopic'];
  methods.forEach((method) => {
    it(`responds to ${method}`, () => {
      expect(new TopicButtons(`#${id}`, [])).to.respondTo(method);
    });
  });
  describe('constructor', () => {
  });
  describe('$', () => {
    before(() => {
      $fixtures.append($('<div>').attr('id', id));
    });
    it('is an instance of a jQuery collection', () => {
      expect(new TopicButtons(`#${id}`, []).$).is.an.instanceof($);
    });
    it('has a length of 1', () => {
      expect(document.getElementById(id)).to.exist;
      expect(new TopicButtons(`#${id}`, []).$.length).to.equal(1);
    });
  });
  describe('add', () => {
    let topicBtn = null;
    let topicButtons = null;
    beforeEach(() => {
      $(`#${id}`).empty();
      topicBtn = new TopicButton('test', btnHtml);
      topicButtons = new TopicButtons(`#${id}`, []);
    });
    it('adds a TopicButton to array of buttons', () => {
      expect(() => topicButtons.add(topicBtn)).to.increase(() => topicButtons.buttons.length).by(1);
    });
    it('adds a button to the DOM element', () => {
      expect(() => topicButtons.add(topicBtn)).to.increase(() => $(`#${id}`).children().length).by(1);
    });
  });
  describe('buttons', () => {
    it('is an array of TopicButtons', () => {
      const buttons = new TopicButtons(`#${id}`, [new TopicButton('test', btnHtml)]).buttons;
      expect(buttons)
        .to.be.an('array')
        .which.satisfies(buttons => buttons.every(item => item instanceof TopicButton));
    });
  });
  describe('setTopic', () => {
    let topicButtons = null;
    beforeEach(() => {
      $(`#${id}`).empty();
      topicButtons = new TopicButtons(`#${id}`, [new TopicButton('test', btnHtml)]);
      expect(topicButtons.buttons[0].isSelected).to.be.false;
    });
    it('calls onTopicChange if it is a function', () => {
      const spy = sinon.spy();
      topicButtons.onTopicChange = spy;
      topicButtons.setTopic('test');
      expect(spy.calledOnce).to.be.true;
    });
    it('it sets the selects the button with the matching topic', () => {
      topicButtons.setTopic('test');
      expect(topicButtons.buttons[0].isSelected).to.be.true;
      topicButtons.setTopic('no match');
      expect(topicButtons.buttons[0].isSelected).to.be.false;
    });
  });
});
