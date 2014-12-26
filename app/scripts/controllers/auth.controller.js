'use strict';

app.controller('AuthController', function ($scope, $location, Auth, user) {
  
  //$scope.user = user;
  if (user && Auth.signedIn()) {
    $location.path('/');
  }

  $scope.login = function () {
	  Auth.login($scope.user).then(function () {
	    $location.path('/');
	  }, function (error) {
	      $scope.error = error.toString();
	  });
  };

  $scope.register = function () {
    Auth.register($scope.user).then(function() {
      return Auth.login($scope.user).then(function() {
        $location.path('/');
      });
    }, function(error) {
      	$scope.error = error.toString();
    });
  };
});