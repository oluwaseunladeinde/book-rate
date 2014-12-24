'use strict';

app.controller('BookRatingController', function ($scope, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL);
  $scope.item = ref.child('books').child($scope.$parent.book.$id);
  
  $scope.rating = 5;
  $scope.selected = 1;
 
  $scope.rate = function(rating) {
    $scope.selected = rating;
    $scope.item.child('count').transaction(function(currentVal) {
       return (currentVal||0)+1;
    });

    $scope.item.child('rating').transaction(function(currentVal) {
       return (currentVal||0)+ parseInt(rating);
    });

    $scope.item.update({'average': Math.round($scope.book.rating / $scope.book.count)});

    discountedprice();
  };

  $scope.edit = function(){
  	
  };

  function discountedprice(){
    if($scope.book.price > 0 && $scope.book.discount > 0 ){
      $scope.book.discountedprice = $scope.book.price - (($scope.book.discount/ 100) * $scope.book.price);
    }
    else if($scope.book.price > 0 && $scope.book.discount == 0 ){
      $scope.book.discountedprice = $scope.book.price;
    }
  }
});