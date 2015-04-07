jest.autoMockOff();

describe('groupByDay', function() {
  let groupByDay = require('../groupByDay');

  it('returns the items grouped by day', function() {
    let item1 = { foo: 'bar', day: '1' };
    let item2 = { foo: 'bar', day: '2' };
    let items = [item1, item2];
    let expected = { '1': [item1], '2': [item2] };

    expect(groupByDay(items)).toEqual(expected);
  });
});
