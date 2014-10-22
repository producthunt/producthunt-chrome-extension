App.service('OAuth', function(Config, $http, $rootScope) {

  /*
   * Service to wrap OAuth logic
   */

  var OAuth = {};
  var alreadyTried = false;

  var clientAuthUrl = Config.url + '/oauth/token';
  var clientParams = {
    client_id: Config.clientId,
    client_secret: Config.clientSecret,
    grant_type: "client_credentials"
  };


  /*
   * loads a client Token if needed
   */
  OAuth.loadClientToken = function(cb) {
    if (accessToken()) return cb(null);

    OAuth.getClientToken(function(err, token) {
      if (err) return cb(err);

      accessToken(token);
      cb(null);
    });
  };


  /*
   * Requests a client only token from the server
   */
  OAuth.getClientToken = function (cb) {
    $http({ method: 'POST', url: clientAuthUrl, data: clientParams }).
      success(function(data, status, headers, config) {
        cb(null, data.access_token);
      })
      .error(function(data, status, headers, config) {
        cb(data);
      });
  };


  /*
   * Wrapper for $http request
   */
  OAuth.request = function(method, endpoint, params, cb) {
    OAuth.loadClientToken(function(err) {
      if (err) return cb(err);

      if (method == 'GET') {
        endpoint = OAuth.addQueryParams(endpoint, params);
        params = undefined;
      }

      var options = {
        method: method,
        url: OAuth.url(endpoint),
        headers: OAuth.tokenHeader(),
        data: params
      };

      debug("Fetching from " + options.url);

      $http(options).
        success(function(data, status, headers, config) {
          cb(null, data);
        })
        .error(function(data, status, headers, config) {
          // TODO(andreasklinger): Find a way to differ between normal unauthorized requests
          //   and "expired token". For now we only try once to avoid infinite error loops.
          if (status == 401 && !alreadyTried) {
            alreadyTried = true;
            OAuth.clearToken();
            OAuth.request(method, endpoint, params, cb);
          }
          else {
            cb(data);
          }
        }
      );
    });

  };


  /*
   * Add params as query parameter for get requests
   */
  OAuth.addQueryParams = function(endpoint, params) {
    var postFix = '?';
    for(var key in params) {
      postFix += key + '=' + params[key] + '&';
    }

    return endpoint + postFix;
  };


  /*
   * Url wrapper
   */
  OAuth.url = function(endpoint) {
    return Config.url + endpoint;
  };


  /*
   * Add accesstokens to headers if available
   */
  OAuth.tokenHeader = function() {
    if (!accessToken()) return {};
    return { 'Authorization': 'Bearer ' + accessToken() };
  };



  /*
   * Clear Token - eg if expired
   */
  OAuth.clearToken = function() {
    delete localStorage.accessToken;
  };


  var accessToken = function(token) {
    if (!token) {
      if (!localStorage.accessToken) return;
      debug('Loading access token from localstorage', localStorage.accessToken);
      return JSON.parse(localStorage.accessToken);
    }
    else {
      localStorage.accessToken = JSON.stringify(token);
      debug('Stored access token to localstorage', localStorage.accessToken);
    }
  };

  return OAuth;
});
