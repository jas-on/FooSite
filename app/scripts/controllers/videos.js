'use strict';
var app = angular.module('app');

app.controller('VideosCtrl',['$scope', '$http', function ($scope, $http) {

  $scope.submitSearch = function search() {
    var q = $scope.query;
    $.getJSON('https://gdata.youtube.com/feeds/api/videos?q=' + q + '&max-results=5&v=2&alt=jsonc&orderby=published', function(data) {
      //$('#videoholder').tubular({videoId: data.data.items[0].id}); // where idOfYourVideo is the YouTube ID.
      var html = '';
      for(var i=0; i<data.data.items.length; i++) {
        html += '<a href="http://www.youtube.com/watch?v='+ data.data.items[i].id + 'rel="prettyPhoto" title=""><img src="' + data.data.items[i].thumbnail.hqDefault + '"/></a>';
      }

      $("#videoholder").html(html);
      $("a[rel^='prettyPhoto']").prettyPhoto();
    });
  };
}]);

app.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);
