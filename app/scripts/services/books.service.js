'use strict';

app.factory('Book', function ($firebase, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL);
  var bookref = ref.child('data/books');
  var categorybooksref = ref.child('data/categorybooks');
  var categoriesref = ref.child('data/categories');

  var books = $firebase(bookref).$asArray();
  var categories = $firebase(categoriesref).$asArray();
  var categorybooks = $firebase(categorybooksref);
  console.log('calling service...');

  var Book = {
    all: books,
    categories : categories,

    create: function (book) {
      return books.$add(book);
    },
    createCategory: function(category){
      return categories.$add(category);
    },
    addBookToCategory: function(bookMap){
      var data = {}; data[bookMap.name] = true;
      var cat = bookMap.category.toLowerCase();
      categorybooksref.child(cat + '/books/' + bookMap.name).set(true, function(error){ // categories/philosophy/books/bookId
        if (error) {console.log("Data could not be saved." + error);} 
        else {console.log("Data saved successfully.");}
      });
    },
    filter: function(category){
      if(category !== undefined || category !== null){
        var itemCategoryBooksRef = categorybooksref.child(category.filter).child("books");
        itemCategoryBooksRef.on("child_added", function(snap) {
          bookref.child(snap.name()).once("value", function() {
            // Render the comment on the link page.
          });
        });
        return $firebase(itemCategoryBooksRef).$asArray();
      }
    },
    get: function (bookId) {
      return $firebase(ref.child('books').child(bookId)).$asObject();
    },
    delete: function (book) {
      return books.$remove(book);
    },
    removeCategory: function(category){
      return categories.$remove(category);
    },
    getBooks: function(catId){
      return $firebase(ref.child('categorybooks').child(catId)).$asArray();
    }

  };

  return Book;
});