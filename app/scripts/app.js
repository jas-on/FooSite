'use strict';

angular
  .module('app', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/links', {
        templateUrl: 'views/links.html',
        controller: 'LinksCtrl'
      })
      .when('/photos', {
        templateUrl: 'views/photos.html',
        controller: 'PhotosCtrl'
      })
      .when('/videos', {
        templateUrl: 'views/videos.html',
        controller: 'VideosCtrl'
      })
      .when('/articles', {
        templateUrl: 'views/articles.html',
        controller: 'ArticlesCtrl'
      })
      .otherwise({
        redirectTo: '/home'
      });
  }]);

