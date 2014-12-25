'use strict';

app.controller('BooksController', function ($scope) {
	var vm = this;
	vm.columns = [];

	vm.activate = function() {
		$scope.$watchCollection(function() {
			return $scope.books;
		}, render);
		/*$scope.$watch(function() {
			return $(window).width();
		}, render);*/
	};

	vm.activate();


	/**
	 * @name calculateNumberOfColumns
	 * @desc Calculate number of columns based on screen width
	 * @returns {Number} The number of columns containing Posts
	 * @memberOf booklife.books.controllers.BooksController
	 */
	function calculateNumberOfColumns() {
		//var width = $(window).width();
		var width = $('.books-box').width(); // get the width of the conatiner for the books
		var colCount = 0;
		if (width >= 1200) {
			colCount=4;
		} else if (width >= 992) {
			colCount=3;
		} else if (width >= 768) {
			colCount=2;
		} else {
			colCount= 1;
		}
		return colCount;
	}
	/**
	 * @name columnMapFn
	 * @desc A map function for scoring column heights
	 * @returns The approximately normalized height of a given column
	 */
	function columnMapFn(column) {
		var lengths = column.map(function(element) {
			return element.summary.length;
		});

		return lengths.reduce(sum, 0) * column.length;
	}

	/**
	 * @name sum
	 * @desc Sums two numbers
	 * @params {Number} m The first number to be summed
	 * @params {Number} n The second number to be summed
	 * @returns The sum of two numbers
	 */
	function sum(m, n) {
		return m + n;
	}


	/**
	 * @name approximateShortestColumn
	 * @desc An algorithm for approximating which column is shortest
	 * @returns The index of the shortest column
	 * @memberOf BooksController
	 */
	function approximateShortestColumn() {
		var scores = vm.columns.map(columnMapFn);
		return scores.indexOf(Math.min.apply(this, scores));
	}

	/**
	 * @name render
	 * @desc Renders Books into columns of approximately equal height
	 * @param {Array} current The current value of `vm.posts`
	 * @param {Array} original The value of `vm.books` before it was updated
	 * @memberOf BooksController
	 */
	function render(current, original) {
		/**if (current !== original) {
			vm.columns = [];
			for (var i = 0; i < calculateNumberOfColumns(); ++i) {
				vm.columns.push([]);
			}

			for (var k = 0; k < current.length; ++k) {
				var column = approximateShortestColumn();
				vm.columns[column].push(current[k]);
			}	
		}*/
		vm.books = $scope.books;
	}
});