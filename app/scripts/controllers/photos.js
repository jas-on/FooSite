'use strict';
var app = angular.module('app');

app.controller('PhotosCtrl',['$scope', 'photoData', function ($scope, photoData) {
  $scope.thumbSize = 'small';

  $scope.submitSearch = function getPhotos() {
    $scope.photos = [];
    $scope.photosOriginal = [];
    $scope.items = [];

    photoData.getAllItems($scope.searchKeyword).then(function (data) {
      var parsedData = angular.fromJson(data);
      $scope.items = parsedData.photos.photo;

      for (var i = 0; i < $scope.items.length; i++) {
        var photo = $scope.items[i];
        $scope.photos.push({ title: photo.title, thumbUrl: ' http://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_m.jpg' });
        $scope.photosOriginal.push({ title: photo.title, thumbUrl: ' http://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg' });
      }
    },
    function (errorMessage) {
      $scope.error = errorMessage;
    });
  };

  $scope.$watch('photos', function() {
    $scope.$eval(angular.element('.least-gallery').least()
      );
    console.log('switched searchKeyword');
  });
}]);

app.config(['$httpProvider', function ($httpProvider) {
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

app.factory('photoData',['$http', '$q', function ($http, $q) {
  return {
    getAllItems: function (keyWord) {
      //Creating a deferred object
      var deferred = $q.defer();
      var apiUrl = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=84ad829261f6347dbfc4bf23fc1afdbd&tags=' + keyWord + '&format=json&nojsoncallback=1&sort=relevance&per_page=40&safe_search=1';
      //Calling Web API to fetch pics
      $http.get(apiUrl).success(function (data) {
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
