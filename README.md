# Product Hunt Chrome Extension

[![Product Hunt Chrome Extension](http://f.cl.ly/items/1T0u1V0Q0715072v4643/ph-chrome.png)](https://chrome.google.com/webstore/detail/product-hunt/likjafohlgffamccflcidmedfongmkee)

> This is the official [Product Hunt](http://www.producthunt.com) extension.

Product Hunt is a place for product-loving enthusiasts to share and geek out
about the latest mobile apps, websites, hardware projects, and technology. With
our shiny new Chrome extension, you can:

- View a gallery of the top products of the day in every new tab
- Search for products, collections, and people directly from the Chrome menu bar
- Open the discussion and product details from the product page itself by clicking the PH Bar
- Hunt products and curate collections in a few keystrokes

Explore more ways to use Product Hunt at [http://producthunt.com/apps](http://producthunt.com/apps).

## Chrome App Store

You can get this extension frome the [Google Chrome Webstore](https://chrome.google.com/webstore/detail/product-hunt/likjafohlgffamccflcidmedfongmkee)

## Development

### Development Dependencies

| Name                | Version | Installation                                                                       |
| --------------------|---------|------------------------------------------------------------------------------------|
| Node.js             | 0.10.x  | [Instructions](http://nodejs.org/download/)                                        |
| Gulp                | 3.8.x   | [Instructions](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) |

### Setup

* Clone the repository:

```
$ git clone git@github.com:producthunt/producthunt-chrome-extension.git
$ cd producthunt-chrome-extension
```

* Edit the config file:

```
$ cp .env.example .env
$ $EDITOR .env
```

* Install yarn dependencies:

```
$ yarn install
```

* Create the initial build

```
$ gulp build
```

* Load the extension:

1. Open Google Chrome and type `chrome://extensions` inside the address bar
1. Click on `developer mode`
1. Click on `Load unpacked extension`
1. Select the `/build` folder
1. You are good to go

### Configurations (.env)

See the [example .env file](.env.example).

### Gulp Tasks

| Task                | Description                                   |
| --------------------|-----------------------------------------------|
| build               | Compile, minify and copy the extension files  |
| build --watch       | Rebuild on file change                        |
| clean               | Clean the build directory                     |
| test                | Run all tests                                 |
| test-acceptance     | Run the acceptance tests                      |
| test-unit           | Run the unit tests                            |
| pack                | Create an archive for publishing              |

Example usage:

```
$ gulp clean
$ gulp build
```

### Tests

* Install the selenium server and Chromedriver:

```
$ node_modules/.bin/install_selenium
$ node_modules/.bin/install_chromedriver
```

* Start selenium with chromedriver:

```
$ node_modules/.bin/start_selenium_with_chromedriver
```

* Run the tests:

```
$ NODE_ENV=test gulp test
```

### Debug

To enable the debug output in the console:

```
localStorage.debug = '*';
```

### Publishing the extension

```
$ NODE_ENV=production EXT_ENV={production,staging} gulp build
$ gulp pack
$ open dist/
```

Then upload the archive to the Chrome Web Store.

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md)

## Contributors

See all [contributors](https://github.com/producthunt/producthunt-chrome-extension/graphs/contributors)

## Changes

See [CHANGELOG](CHANGELOG.md)

## License

See [LICENSE](LICENSE)
