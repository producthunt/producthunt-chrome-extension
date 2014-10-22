App.controller('HomeCtrl', function($rootScope, $scope, API) {
  $rootScope.redirect = function(url) {
    if (!url) {
      url = "https://www.producthunt.com";
      $rootScope.goToPH = true;
    }

    chrome.tabs.getSelected(null, function(tab){
      chrome.tabs.update(tab.id, { url: url });
    });
  };

  $scope.postGroups = [];
  var daysAgo = 0;

  $scope.fetchPosts = function() {
    API.fetchPosts(daysAgo, function(err, postGroup) {
      if (err || !postGroup) {
        return showError(err);
      }

      $scope.postGroups.push(postGroup);
      $scope.fetchingPosts = false;
    });
  };

  var showError = function(error) {
    debug('Error while loading the posts.', error);
    $scope.errorText = "Damn! There has been an error connecting to the Producht Hunt API...";
  };

  $(window).on('scroll', function(event) {
    if ($scope.fetchingPosts) { return; }

    if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
      $scope.fetchingPosts = true;
      daysAgo += 1;
      $scope.fetchPosts();
    }
  });
});
