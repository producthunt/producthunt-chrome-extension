App.service('API', function(Cache, Config, OAuth, $http) {

  var API = {};
  var alreadyTried = false;

  /*
   * Check if valid cache is available
   *  If not go and fetch something new
   */
  API.fetchPosts = function(daysAgo, cb) {
    if (Cache.check(daysAgo)) {
      Cache.get(daysAgo, cb);
    }
    else {
      API.fetchJSON(daysAgo, cb);
    }
  };


  /*
   * Fetch JSON from server
   */
  API.fetchJSON = function (daysAgo, cb) {
    OAuth.request('GET', '/posts', { days_ago: daysAgo }, function(err, data){
      if (err) return cb(err);
      if (!data || !data.posts || !data.posts.length) return cb('No result received');

      var postGroup = { day: data.posts[0].day, posts: data.posts };
      Cache.set(daysAgo, postGroup);
      cb(null, postGroup);
    });
  };

  return API;
});
