describe('popup', function() {
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
     return browser.get(TEST.url + '/popup.html');
   });

   after(function() {
     return browser.quit();
   });

   it('has a proper title', function() {
     return browser
       .title().should.become('Product Hunt');
   });

   it('loads the specified URL', function() {
     return browser
       .elementByTagName('iframe')
       .getAttribute('src').should.eventually.include('example.com');
   });
});
