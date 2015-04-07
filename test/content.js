describe('Content App', function() {
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
     return browser.get('http://www.producthunt.com/apps/chrome?ref=producthunt');
   });

   after(function() {
     return browser.quit();
   });

   it('renders the product bar', function() {
     return browser
       .waitForElementByCss('#__phc-bar', 5000)
       .elementByCss('#__phc-bar').isDisplayed().should.eventually.become(true);
   });
});
