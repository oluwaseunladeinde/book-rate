'use strict';

app.controller('IndexController', function ($scope, $location, Book, Auth) {
  $scope.signedIn = Auth.signedIn;
  $scope.logout = Auth.logout;
  $scope.openAdd = true;
  $scope.books = Book.all;
  $scope.categories = Book.categories;

  $scope.book = {title: '', author: '',publisher: '', discount: 0.00, language: 'English', year: '', price: 0.00,
	category: '', summary: '', rating: 0,average: 0,
	count: 0, isbn: '', removable: false,added: Firebase.ServerValue.TIMESTAMP
  };

  $scope.category = {name: '', default:false};

  $scope.showAddForm = function(){
  	$scope.openAdd = !$scope.openAdd;
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
    Book.create($scope.book).then(function (ref) {
      //$location.path('/books/' + ref.name());
      console.log('ref ', ref.name());
      $scope.book = {
		title: '', 
		author: '',
		publisher: '',
		discount: 0.00,
		language: 'English',
		year: '',
		price: 0.00,
		category: '',
		summary: 'A very good book. A must read.',
		rating: 0,
		average: 0,
		count: 0,
		isbn: '',
		removable: false,
		added: Firebase.ServerValue.TIMESTAMP
	  };
    });
  };

  function generatedumpdata(){
  	Book.create({
	  	title: 'Mirage Clouds', 
		author: 'Nathan Judenon',
		publisher: 'Manning Publishers',
		discount: 12.5,
		image : 'images/covers/cover-1.jpg',
		language: 'English',
		year: '2011',
		price: 28.95,
		category: 'Lietrature',
		summary: 'This book inspires you to want to just sit back a wish that life could be a bed of roses. Its a must read for thriller lovers.',
		rating: 0,
		average: 0,
		count: 0,
		isbn: '',
		removable: false,
		added: Firebase.ServerValue.TIMESTAMP,
		discountedprice: 0
	});

	Book.create({
	  	title: 'Economic Boom', 
		author: 'Lucy McDowell',
		publisher: 'Manning Publishers',
		discount: 0.00,
		language: 'English',
		image : 'images/covers/cover-1.jpg',
		year: '2012',
		price: 18.99,
		category: 'Lietrature',
		summary: 'Sounds lik ethe beginning of the end when you go through some journals but there is something interesting about Economic disasters. Read this book.',
		rating: 0,
		average: 0,
		count: 0,
		isbn: '',
		removable: false,
		added: Firebase.ServerValue.TIMESTAMP,
		discountedprice: 0.00
	});

  }

  //generatedumpdata();

  /**$scope.createCat = function(){
  	
  	var category = [
  			{name:'History', default:true},
  			{name:'Medicine', default:true},
  			{name:'Kids', default:true},
  			{name:'Politics', default:true},
  			{name:'Finance', default:true},
  			{name:'Economics', default:true},
  			{name:'Science', default:true},
  			{name:'Technology', default:true},
  			{name:'Fantasy', default:true},
  			{name:'Fiction', default:true},
  			{name:'Entertainment', default:true},
  			{name:'Architecture', default:true},
  			{name:'Health', default:true},
  			{name:'Sports', default:true},
  			{name:'Religion', default:true},
  			];

  };**/

});