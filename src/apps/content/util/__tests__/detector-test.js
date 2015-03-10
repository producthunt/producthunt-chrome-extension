jest.autoMockOff();

describe('Detector', function() {
  let Detector = require('../detector');

  it('returns true if force is set to true', function() {
    let detector = new Detector(null, null, null, true);
    expect(detector.enable()).toBe(true);
  });

  it('returns false if there is no referrer', function() {
    let detector = new Detector('host1', 'host2', null);
    expect(detector.enable()).toBe(false);
  });

  it('returns false if host is equal to the current host', function() {
    let detector = new Detector('host', 'host', 'foo');
    expect(detector.enable()).toBe(false);
  });

  it('returns false if host is different from the referrer', function() {
    let detector = new Detector('host1', 'host2', 'foo');
    expect(detector.enable()).toBe(false);
  });

  it('returns true if the referrer is the same with the host', function() {
    let detector = new Detector('host1', 'host2', 'host1');
    expect(detector.enable()).toBe(true);
  });
});
