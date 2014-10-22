App.service('Cache', function() {

  /*
   * Service to access local storage
   */

  var Cache = {};


  /*
   * Check Cache
   */
  Cache.check = function (index) {
    var longEnoughTimeAgo = new Date().getTime() - (5*60*1000);

    if (!Cache.loadFromStorage(index)) return false;
    if (Cache.loadFromStorage(index).timestamp < longEnoughTimeAgo) return false;

    return true;
  };


  /*
   * Get Cache
   */
  Cache.get = function(index, cb) {
    if (! Cache.check() ) return cb(true);

    debug("Fetching from cache");
    cb(null, Cache.loadFromStorage(index).data);
  };

  /*
   * Set Cache
   */
  Cache.set = function (index, data) {
    debug("Saving to cache " + data);

    Cache.storeToStorage(index, data);
  };

  /*
   * Wrappers to hide JSON logic for load/store stringified cache content
   */

  Cache.loadFromStorage = function(index) {
    if (!localStorage.cache) localStorage.cache = JSON.stringify([]);
    var cache = JSON.parse(localStorage.cache);
    if (index === undefined) {
      return cache;
    }
    else {
      return cache[index];
    }
  };

  Cache.storeToStorage = function(index, data) {
    if (!localStorage.cache) localStorage.cache = JSON.stringify([]);
    var new_content = { timestamp: new Date().getTime(), data: data };

    var cache = Cache.loadFromStorage();
    cache[index] = new_content;
    localStorage.cache = JSON.stringify(cache);
  };

  return Cache;
});
