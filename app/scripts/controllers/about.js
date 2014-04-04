'use strict';
var app = angular.module('app');

app.controller('AboutCtrl',['$scope', 'wikiData', function ($scope, wikiData) {
  $scope.thumbSize = 'small';

  $scope.submitSearch = function getPhotos() {

    wikiData.getAllItems($scope.searchKeyword).then(function (data) {
      var parsedData = angular.fromJson(data);
      $scope.items = parsedData.extract;
    },
    function (errorMessage) {
      $scope.error = errorMessage;
    });
  };
}]);

app.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

app.factory('wikiData',['$http', '$q', function ($http, $q) {
  return {
    getAllItems: function (keyWord) {
      //Creating a deferred object
      var deferred = $q.defer();
      var apiUrl = 'http://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=' + keyWord + '&format=json&redirects&inprop=url&indexpageidsa';
      //Calling Web API to fetch pics
      $http({method: 'GET', url: apiUrl}).success(function (data) {
        //Passing data to deferred's resolve function on successful completion
        deferred.resolve(data);
      }).error(function (error) {
        //Sending a friendly error message in case of failure
        deferred.reject('An error occured while fetching items' + error);
      });
      //Returning the promise object
      return deferred.promise;
    }
  };
}]);
