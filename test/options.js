describe('Options App', function() {
  var browser = null;

  before(function() {
    browser = wd.promiseChainRemote();

    return browser.init({
      browserName: 'chrome',
      chromeOptions: {
        args: ['--load-extension=' + TEST.path]
      }
    });
  });

   beforeEach(function() {
     return browser.get(TEST.url + '/apps/options/main.html');
   });

   after(function() {
     return browser.quit();
   });

   it('renders the options page', function() {
     return browser
       .source().should.eventually.include('Settings');
   });

   it('allows the product bar to be disabled', function() {
     return browser
       .elementByCss('#bar').click()
       .elementByCss('.flash').isDisplayed().should.eventually.become(true);
   });

   it('allows the default tab to be disabled', function() {
     return browser
       .elementByCss('#tab').click()
       .elementByCss('.flash').isDisplayed().should.eventually.become(true);
   });
});
