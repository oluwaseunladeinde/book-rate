
'use strict';

app.directive('books', function(){
	var directive = {
		controller : 'BooksController',
		controllerAs : 'vm',
		restrict : 'E',
		scope : {
			books : '='
		},
		templateUrl : '/views/directives/books.html'
	};

	return directive;
});

app.directive('book', function(){
	var directive = {
		controller : 'BookController',
		controllerAs : 'vm',
		restrict : 'E',
		scope : {
			book : '='
		},
		templateUrl : '/views/directives/book.html'
	};

	return directive;
});

app.directive('starRating', function(){
	
	var directive = {
	    restrict : 'A',
	    templateUrl : '/views/directives/ratings.html',
	    scope : {
	      ratingValue : '=',
	      max : '=',
	      onRatingSelected : '&'
	    },
	    link : function(scope, elem, attrs) {
	      var updateStars = function() {
	        scope.stars = [];
	        for ( var i = 0; i < scope.max; i++) {
	          scope.stars.push({
	            filled : i < scope.ratingValue
	          });
	        }
	      };
	      scope.toggle = function(index) {
	        scope.ratingValue = index + 1;
	        scope.onRatingSelected({
	          rating : index + 1
	        });
	      };
	      scope.$watch('ratingValue', function(oldVal, newVal) {
	        if (newVal) { updateStars(); }
	      });
    	}
    };
	return directive;
});

app.directive('timeago', function($timeout, $log){
	
	var directive = {
		restrict: 'A',
	    scope: {
	        title: '@'
	    },
	    link: function (scope, elem, attrs) {
	        attrs.title = new Date(attrs.title*1000);
	        console.log('title ', moment(attrs.title).format('X'));
	        var updateTime = function () {
	            if (attrs.title) {
	                elem.text(moment(new Date(attrs.title)).fromNow());
	                $timeout(updateTime, 15000);
	            }
	        };
	        scope.$watch(attrs.title, updateTime);
	    }
	};
	return directive;
});