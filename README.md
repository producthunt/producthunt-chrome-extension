## Product Hunt Chrome Extension

### Note

This extension has been written as a little side project on a 2-3 afternoons and one plane flight. We decided to opensource it to enable more people to improve it and most importantly provide an example app for our [official Product Hunt API](http://api.producthunt.com/v1/docs).

* If you have ideas for improvements please feel free to submit pull-requests.
* If you have questions please open up issues.
* Also feel free to reach out on twitter to [@andreasklinger](http://twitter.com/andreasklinger)

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

* [ ] oauth2 user sign-in + voting
* [ ] clever caching
* [ ] switch to angular resources

### Feature ideas

#### "As seen on product hunt"

* show an alert if a url is on producthunt
* or even show an alert if a url is about a product on producthunt
    * eg a techcrunch article mentioning X
    * we can use related links for this
* show the post modal pane when this alert is clicked


## Contributions

1. Fork it
1. Create your feature branch (`git checkout -b my-new-feature`)
1. Commit your changes (`git commit -am 'Add some feature'`)
1. Push to the branch (`git push origin my-new-feature`)
1. Create new Pull Request
1. Don't forget to add yourself to the list below ;)

#### Contributors

* [@andreasklinger](http://github.com/andreasklinger)
