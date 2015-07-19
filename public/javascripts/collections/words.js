'use strict';
var app = app || {};

(function () {

  var WordList = Backbone.Collection.extend({
    model: app.Word,
	url: 'dictionaries/1/words',
    
	resetUrl: function(dictId) {
		this.url = 'dictionaries/' + dictId + '/words';
		this.reset();		// clear all
	},
	
    completed: function() {
      return this.filter(function( word ) {
        return word.get('completed');
      });
    },
    
    remaining: function() {
    // apply allows us to define the context of this within our function scope
      return this.without.apply( this, this.completed() );
    },
  });
  // global collection of words.
  app.word_list = new WordList();
  
})();