/* global app:true */
/* exported app */

'use strict';

/**
 * @ngdoc overview
 * @name bookRateApp
 * @description
 * # bookRateApp
 *
 * Main module of the application.
 */
var app = angular
  .module('bookRateApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/index.html',
        controller: 'IndexController',
      })
      .when('/books', {
        templateUrl: 'views/books.html',
        controller: 'BooksController'
      })
      .when('/books/:bookId', {
        templateUrl: 'views/book.html',
        controller: 'BookController'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthController',
        resolve: {
          user: function(Auth) {
            return Auth.resolveUser();
          }
        }
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthController',
        resolve: {
          user: function(Auth) {
            return Auth.resolveUser();
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .constant('FIREBASE_URL', 'https://resplendent-torch-4811.firebaseio.com/');
