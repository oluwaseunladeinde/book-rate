'use strict';

app.controller('NavController', function ($scope, $location, Auth) {
  $scope.signedIn = Auth.signedIn;
  $scope.logout = Auth.logout;
});