'use strict';

app.controller('IndexController', function ($scope, $location, Book, Auth) {
  $scope.signedIn = Auth.signedIn;
  $scope.logout = Auth.logout;
  $scope.openAdd = false;
  $scope.selectedCat = '';
  $scope.books = Book.all;
  $scope.categories = Book.categories;
  $scope.usercategories = Book.usercategories;

  $scope.book = {title: '', author: '',publisher: '', discount: '', language: 'English', year: '', price: '',
	category: '', summary: '', rating: 0,average: 0, discountedprice: '',
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

  $scope.selectAction = function() {
    console.log($scope.selectedCat);
  };

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
      //$location.path('/books/' + ref.name());
      //console.log('ref ', ref.name());
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

  function generatedumpdata(){

  	Book.create({
  	  	title: 'Reposition Yourself', 
  		author: 'T.D Jakes',
  		publisher: 'Pocket Books',
  		discount: 10,
  		language: 'English',
  		image : 'images/covers/cover-5.jpg',
  		year: '2012',
  		price: 15.95,
  		category: 'Motivation',
  		summary: 'How tos and necessary steps to maximize the limitless potential that comes from making minor adjustments to your thinking and plans.',
  		rating: 0,
  		average: 0,
  		count: 0,
  		discountedprice: 14.36,
  		isbn: '',
  		removable: false,
  		added: Firebase.ServerValue.TIMESTAMP,
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

  function genBrick() {
	    var height = ~~(Math.random() * 500) + 100;
	    var id = ~~(Math.random() * 10000);
      var prop = {src: 'http://lorempixel.com/g/280/' + height + '/?' + id, height: height, id: id};
      console.log("id ", id, " src ", prop['src'], " height ", height);
	    return prop;
	};
    $scope.booksss = [
            {
              title:'Box 1',
              img:'http://lorempixel.com/g/280/' + (~~(Math.random() * 500) + 100) + '/?' + (~~(Math.random() * 10000)),
              author: 'T.D Jakes',
              publisher: 'Pocket Books',
              discount: 10,
              language: 'English',
              image : 'images/covers/cover-5.jpg',
              year: '2012',
              price: 15.95,
              category: 'Motivation',
              summary: 'How tos and necessary steps to maximize the limitless potential that comes from making minor adjustments to your thinking and plans.',
              rating: 0,
              average: 0,
              count: 0,
              discountedprice: 14.36,
              isbn: '',
              removable: false,
              added: new Date()
            },
            {
              title:'Box 2',
              img:'http://lorempixel.com/g/280/' + (~~(Math.random() * 500) + 100) + '/?' + (~~(Math.random() * 10000)),
              summary:'This is a box with a very small description. This is a box with a very small description.',
              author: 'Lisa Phantom',
              publisher: 'Pocket Books',
              discount: 10,
              language: 'English',
              image : 'images/covers/cover-5.jpg',
              year: '2012',
              price: 15.95,
              category: 'Motivation',
              rating: 0,
              average: 0,
              count: 0,
              discountedprice: 14.36,
              isbn: '',
              removable: false,
              added: new Date()
            },
            {
              title:'Box 3',
              img:'http://lorempixel.com/g/280/' + (~~(Math.random() * 500) + 100) + '/?' + (~~(Math.random() * 10000)),
              summary:'This is a box with a very small description. This is a box with a very small description. This is a box with a very small description.',
              added: new Date()
            },
            {
              title:'Box 4',
              img:'http://lorempixel.com/g/280/' + (~~(Math.random() * 500) + 100) + '/?' + (~~(Math.random() * 10000)),
              summary:'This is a box with a very small description. This is a box with a very...',
              added: new Date()
            },
            {
              title:'Box 5',
              img:'http://lorempixel.com/g/280/' + (~~(Math.random() * 500) + 100) + '/?' + (~~(Math.random() * 10000)),
              summary:'This is a box with a very small description. This is a box with a very small description. This is a box with a very small description. This is a box with a very small description. This is a box with a very small description.',
              added: new Date()
            },
            {
              title:'Box 6',
              img:'http://lorempixel.com/g/280/' + (~~(Math.random() * 500) + 100) + '/?' + (~~(Math.random() * 10000)),
              summary:'This is a box with a very small description. This is a box.',
              added: new Date()
            },
            {
              title:'Box 7',
              img:'http://lorempixel.com/g/280/' + (~~(Math.random() * 500) + 100) + '/?' + (~~(Math.random() * 10000)),
              summary:'This is a box with a very small description. This is a box with a very small description. This is a box.'
              ,
              added: new Date()
            },
            {
              title:'Philosophy Science',
              img:'http://lorempixel.com/g/280/' + (~~(Math.random() * 500) + 100) + '/?' + (~~(Math.random() * 10000)),
              summary:'This is a box.',
              added: new Date()
            },
            {
              title:'Faith & Faith',
              img:'http://lorempixel.com/g/280/' + (~~(Math.random() * 500) + 100) + '/?' + (~~(Math.random() * 10000)),
              summary:'This is a box with a very small description. This is a.',
              added: new Date()
            },
            {
              title:'Box 10',
              img:'http://lorempixel.com/g/280/' + (~~(Math.random() * 500) + 100) + '/?' + (~~(Math.random() * 10000)),
              summary:'This is a box with a very small description.',
              added: new Date()
            }
    ];




	/**$scope.brickso = [
	    genBrick(),
	    genBrick(),
	    genBrick(),
	    genBrick(),
	    genBrick(),
      genBrick(),
      genBrick(),
      genBrick(),
      genBrick()
	];**/

	$scope.add = function add() {
	    $scope.bricks.push(genBrick());
	};

	$scope.remove = function remove() {
	    $scope.bricks.splice( ~~(Math.random() * $scope.bricks.length),1)
	};

});