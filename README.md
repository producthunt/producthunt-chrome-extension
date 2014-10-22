## Product Hunt Chrome Extension


### Setup Dev

* Copypaste `config-dist.js` to `config.js`
  * update the client id/secret with values from an oauth app on either producthunt.com or your local development system
* `npm install`
* `bower install`
* Go to `chrome://extensions`
   * click on `developer mode`
   * click on `Load unpacked extension`
   * select the `/app` folder


### Publish the extension

* `grunt build`
* Go to https://chrome.google.com/webstore/developer/dashboard
  * (you might need to be added to the app as admin for this - or create your own app)
  * Update the app with the zip in `/package`


### Dev Todo

[ ] oauth2 user sign-in + voting
[ ] clever caching
[ ] switch to angular resources

### Feature ideas

#### "As seen on product hunt"

* show an alert if a url is on producthunt
* or even show an alert if a url is about a product on producthunt
    * eg a techcrunch article mentioning X
    * we can use related links for this
* show the post modal pane when this alert is clicked
