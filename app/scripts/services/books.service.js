'use strict';

app.factory('Book', function ($firebase, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL);
  var books = $firebase(ref.child('books')).$asArray();
  var categories = $firebase(ref.child('categories')).$asArray();

  var Book = {
    all: books,
    categories : categories,
    create: function (book) {
      return books.$add(book);
    },
    get: function (bookId) {
      return $firebase(ref.child('books').child(bookId)).$asObject();
    },
    delete: function (book) {
      return books.$remove(book);
    },
    createCategory: function(category){
      return categories.$add(category);
    }
  };

  return Book;
});