var App = angular.module('App', [
  // 'ngCookies',
  'ngRoute'
]);

/*
 * Angular changes urls to “unsafe:”
 *  Source: http://stackoverflow.com/questions/15606751/angular-changes-urls-to-unsafe-in-extension-page
 */
App.config(function( $compileProvider ) {
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|mailto|chrome-extension):/);
});

App.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl'
    });
});

var debug = function(args) {
  if (!localStorage || !localStorage.debug) return;
  console.log(args);
};
