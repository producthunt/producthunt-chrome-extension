jest.autoMockOff();

describe('Detector', function() {
  let Detector = require('../detector');

  it('returns true if search qs contains ref=producthunt', function() {
    let detector = new Detector;
    expect(detector.enable('ref=producthunt')).toBe(true);
  });

  it('returns false if search qs does not contain ref=producthunt', function() {
    let detector = new Detector;
    expect(detector.enable('ref=xyz')).toBe(false);
  });
});
