jest.autoMockOff();

describe('Tracker', function() {
  let Tracker = require('../Tracker');
  let post = { id: '2', name: 'name' };
  let stubStorage = {
    get: function(keys, cb) {
      cb({ userId: '1' });
    }
  };

  describe('#clickPost', function() {
    it('tracks a post click event', function() {
      let analytics = { track: jest.genMockFn() };
      let tracker = new Tracker(analytics, stubStorage);

      tracker.clickPost(post);

      expect(analytics.track).toBeCalledWith({
        anonymousId: '1',
        event: 'click',
        properties: {
          type: 'post',
          link_location: 'index',
          platform: 'chrome extension',
          post_id: post.id,
          post_name: post.name
        }
      });
    });
  });

  describe('#clickBar', function() {
    it('tracks a post click event', function() {
      let analytics = { track: jest.genMockFn() };
      let tracker = new Tracker(analytics, stubStorage);

      tracker.clickBar(post);

      expect(analytics.track).toBeCalledWith({
        anonymousId: '1',
        event: 'click',
        properties: {
          type: 'post',
          link_location: 'top_bar',
          platform: 'chrome extension',
          post_id: post.id,
          post_name: post.name
        }
      });
    });
  });
});
