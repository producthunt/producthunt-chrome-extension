jest.autoMockOff();

describe('getDay', function() {
  let moment = require('moment');
  let getDay = require('../getDay');

  it('returns today if the supplied date is today', function() {
    let date = moment();
    expect(getDay(date)).toEqual('Today');
  });

  it('returns yesterday if the supplied date is yesetday', function() {
    let date = moment().subtract(1, 'day');
    expect(getDay(date)).toEqual('Yesterday');
  });

  it('returns the actual day of the week if the date is not yesterday or tomorrow', function() {
    let date = moment(new Date('2015-03-01'));
    expect(getDay(date)).toEqual('Sunday');
  });
});
