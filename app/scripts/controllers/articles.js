'use strict';
var app = angular.module('app');

app.controller('ArticlesCtrl',['$scope', 'articleData', function ($scope, articleData) {
  $scope.submitSearch = function getStuff() {
    $scope.articles = [];
    articleData.getAllItems($scope.searchKeyword).then(function (data) {
      for(var key in data) {
        var parsedData = angular.fromJson(data[key]);
        $scope.articles.push(parsedData.response.docs);
      }
    },
    function (errorMessage) {
      $scope.error = errorMessage;
    });
  };
}]);

app.factory('articleData',['$http', '$q', function ($http, $q) {
  return {
    getAllItems: function (keyWord) {
      //Creating a deferred object
      var deferred = $q.defer();
      var key = 'fe13cd16cd36ea99efd55201e0e884a4:11:69144197';
      var apiUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + keyWord + '&api-key=' + key;
      var dataAggregate = {};
      for(var i = 0; i < 10; i++) {
        $.getJSON(apiUrl + '&page=' + i, function(data) {
          dataAggregate[i] = data;
        })
        .fail(function (error) {
          //Sending a friendly error message in case of failure
          deferred.reject('An error occured while fetching items' + error);
        });
      }

      deferred.resolve(dataAggregate);
      //Returning the promise object
      return deferred.promise;
    }
  };
}]);
