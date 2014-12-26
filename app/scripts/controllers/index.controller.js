'use strict';

app.controller('IndexController', function ($scope, $location, Book, Auth) {
  $scope.signedIn = Auth.signedIn;
  $scope.logout = Auth.logout;
  $scope.openAdd = false;
  $scope.selectedCat = '';
  $scope.books = Book.all;
  $scope.categories = Book.categories;
  //$scope.usercategories = Book.usercategories;

  $scope.book = {title: '', author: '',publisher: '', discount: '', language: 'English', year: '', price: '',
	   category: '', summary: '', rating: 0,average: 0, discountedprice: '',
	   count: 0, isbn: '', removable: false,added: Firebase.ServerValue.TIMESTAMP
  };

  $scope.category = {name: '', attached:false, filter:''};
  
  $scope.showAddForm = function(){
  	$scope.openAdd = !$scope.openAdd;
  }

  $scope.addCategory = function(){
  	Book.createCategory({name: $scope.category.name, attached: false, filter: $scope.category.name.toLowerCase()}).then(function (ref) {
  		console.log('added ', ref.name());
  		$scope.category = {name: '', attached:false, filter: ''};
  	});
  }

  $scope.filter = function(category){
    var filteredbooks = Book.filter(category);
    if(filteredbooks.length > 0){
      $scope.books = filteredbooks;
    }
    else{
      $scope.books = [];
    }

  }

  $scope.deleteBook = function (book) {
     Book.delete(book);
  };

  $scope.submitBook = function () {
    // creating random pix for the book
    //var imgpath = 'http://lorempixel.com/g/280/' + (~~(Math.random() * 500) + 100) + '/?' + (~~(Math.random() * 10000));
    parseBookData();

    Book.create($scope.book).then(function (ref) {
      var bookMap = {name:ref.name(), category:$scope.book.category};
      Book.createCategory({filter:bookMap.category.toLowerCase(), attached: true, name:bookMap.category}).then(function(ref){
        Book.addBookToCategory(bookMap);
      });
      
      $scope.book = {
        title: '', author: '', publisher: '', discount: '',
		    discountedprice: '', language: '', year: '', price: '', category: '', 
		    summary: '',rating: 0, average: 0, count: 0, isbn: '', 
		    removable: false, added: new Date()
      }; //Firebase.ServerValue.TIMESTAMP};
    });
  };

  function parseBookData(){
     var imgpath = 'http://lorempixel.com/100/100/?' + (~~(Math.random() * 10000));
      $scope.book.image = imgpath;
      if($scope.summary = "") {$scope.summary = 'A good book to read this wonderful holiday season. Sit back and enjoy.'};
      if($scope.book.price > 0 && $scope.book.discount > 0 ){
        $scope.book.discountedprice = $scope.book.price - (($scope.book.discount/ 100) * $scope.book.price);
      }
      else if($scope.book.price > 0 && $scope.book.discount == 0 ){
        $scope.book.discountedprice = $scope.book.price;
      }
  }

  $scope.removeCategory = function(category){
  	 console.log("removing category ", category);
  	 Book.removeCategory(category).then(function (ref) {
  		console.log('removed ', ref.name());
  	});
  }

});