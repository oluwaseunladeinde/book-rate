'use strict';

app.controller('BookController', function ($scope) {
  //$scope.book = Book.get($routeParams.bookId);

  var vm = this;

  activate();
  discountedprice();
  
  function activate(){
    
  }

  function discountedprice(){
    if($scope.book.price > 0 && $scope.book.discount > 0 ){
      $scope.book.discountedprice = $scope.book.price - (($scope.book.discount/ 100) * $scope.book.price);
    }
    else if($scope.book.price > 0 && $scope.book.discount == 0 ){
      $scope.book.discountedprice = $scope.book.price;
    }
  }

  vm.edit = function(){
  	
  };
});