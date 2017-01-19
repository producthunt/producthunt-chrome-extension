jest.autoMockOff();

import call from '../sliceWithRest';

describe('groupByDay', function() {
  it('returns all items when their count is less than limit', function() {
    let result = call([1], 10);

    expect(result).toEqual([[1], []]);
  });

  it('returns all items when their count + 1 is the limit', function() {
    let result = call([1, 2], 1);

    expect(result).toEqual([[1, 2], []]);
  });

  it('splits items after a limit', function() {
    let result = call([1, 2, 3], 1);

    expect(result).toEqual([[1], [2, 3]]);
  });
});
