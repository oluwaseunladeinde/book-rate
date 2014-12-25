'use strict';

app.controller('BookRatingController', function ($scope, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL);
  $scope.item = ref.child('books').child($scope.$parent.book.$id);
  
  $scope.rating = 5;
  $scope.selected = 1;
  $scope.trans = {};
 
  $scope.rate = function(rating) {
    $scope.selected = rating;
    $scope.item.child('count').transaction(function(currentVal) {
    	var val = (currentVal||0)+1;
    	$scope.trans["count"] = val;
       return val;
    });
    $scope.item.child('rating').transaction(function(currentVal) {
    	var val = (currentVal||0)+ parseInt(rating);
    	$scope.trans["rating"] = val;

       return val;
    });
    $scope.item.update({'average': Math.round($scope.trans["rating"] / $scope.trans["count"])});
  };
});