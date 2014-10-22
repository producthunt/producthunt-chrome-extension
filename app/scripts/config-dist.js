App.service('Config', function() {

  /*
   * Service to wrap Config variables
   */

  /*
   * Get your clientId and clientSecret from
   *    http://www.producthunt.com/v1/oauth/applications
   */

  var Config = {
    url: 'https://api.producthunt.com/v1',
    clientId: 'XXXXX',
    clientSecret: 'YYYYY'
  };

  return Config;
});
