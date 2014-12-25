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

  $scope.category = {name: '', default:false};
  
  $scope.showAddForm = function(){
  	$scope.openAdd = !$scope.openAdd;
  }

  $scope.filter = function(cat){
    console.log("filtering by cat ", cat.name);
  }

  $scope.addCategory = function(){
  	Book.createCategory($scope.category).then(function (ref) {
  		console.log('added ', ref.name());
  		$scope.category = {name: '', default:false};
  	});
  }

  $scope.deleteBook = function (book) {
     Book.delete(book);
  };

  $scope.submitBook = function () {
    // creating random pix for the book
    //var imgpath = 'http://lorempixel.com/g/280/' + (~~(Math.random() * 500) + 100) + '/?' + (~~(Math.random() * 10000));
    var imgpath = 'http://lorempixel.com/100/100/?' + (~~(Math.random() * 10000));
  	$scope.book.image = imgpath;
    if($scope.summary = "") {$scope.summary = 'A good book to read this wonderful holiday season. Sit back and enjoy.'};
    if($scope.book.price > 0 && $scope.book.discount > 0 ){
      $scope.book.discountedprice = $scope.book.price - (($scope.book.discount/ 100) * $scope.book.price);
    }
    else if($scope.book.price > 0 && $scope.book.discount == 0 ){
      $scope.book.discountedprice = $scope.book.price;
    }

    Book.create($scope.book).then(function (ref) {
      $scope.book = {
        title: '', author: '', publisher: '', discount: '',
		    discountedprice: '', language: 'English', year: '', price: '', category: '', 
		    summary: 'A very good book. A must read.',rating: 0, average: 0, count: 0, isbn: '', 
		    removable: false, added: new Date()
      }; //Firebase.ServerValue.TIMESTAMP};
    });

    //reset form data model
    $scope.book = {
        title:'',
        author: '',
        publisher: '',
        discount: 0.00,
        language: '',
        image : '',
        year: '',
        price: 0.00,
        summary: '',
        category: '',
        
        rating: 0,
        average: 0,
        count: 0,
        discountedprice: 0.00,
        isbn: '',
        removable: false,
        added: null
    };


  };

  $scope.removeCategory = function(category){
  	 console.log("removing category ", category);
  	 Book.removeCategory(category).then(function (ref) {
  		console.log('removed ', ref.name());
  	});
  }

});