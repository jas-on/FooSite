'use strict';
var app = angular.module('app');

app.controller('AboutCtrl',['$scope', 'wikiData', function ($scope, wikiData) {
  $scope.submitSearch = function getStuff() {

    wikiData.getAllItems($scope.searchKeyword).then(function (data) {
      var parsedData = angular.fromJson(data);
      var key = Object.keys(parsedData.query.pages)[0];
      $scope.info = parsedData.query.pages[key].extract;
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
      var apiUrl = 'http://en.wikipedia.org/w/api.php?action=query&prop=extracts&converttitles&redirects&titles='+keyWord+'&format=json&callback=?';
      $.getJSON(apiUrl, function(data) {
        deferred.resolve(data);
      })
      .fail(function (error) {
        //Sending a friendly error message in case of failure
        deferred.reject('An error occured while fetching items' + error);
      });
      //Returning the promise object
      return deferred.promise;
    }
  };
}]);
