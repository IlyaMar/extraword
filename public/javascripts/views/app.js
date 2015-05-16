'use strict';
var app = app || {};

(function () {
 
  // Word list. Main piece of UI.
  app.AppView = Backbone.View.extend({
	tagName: "section",
	id: "dictionary-app",
	 
    template: _.template( $('#dict-template').html() ),
	
    events: {
      'keypress #new-word-backward': 'createOnEnter',
    },
	
    initialize: function() {
	  console.log('AppView initialize');
	  this.listenTo(this.collection, 'add', this.addOne);
	  this.listenTo(this.collection, 'reset', this.render);	  
    },
    
    render: function() {
	  console.log('AppView render');
	  this.$el.html( this.template() );
      this.$inputForward = this.$('#new-word-forward');
      this.$inputBackward = this.$('#new-word-backward');
      this.$main = this.$('#main');
      
	  this.collection.each(this.addOne, this);
	  return this;
    },
	
    addOne: function( word ) {
	  console.log('AppView addOne');
      var view = new app.WordView({ model: word });
      this.$('#word-table').append( view.render().el );
    },
    	
	// generate the attributes for a new word
    newAttributes: function() {
      return {
        forward: this.$inputForward.val().trim(),
        backward: this.$inputBackward.val().trim(),
        completed: false
      };
    },
	
    createOnEnter: function( event ) {
      if ( event.which !== ENTER_KEY )
        return;
      console.log(this.$inputForward.val() + this.$inputBackward.val());
      
		if ( !this.$inputForward.val().trim() || !this.$inputBackward.val().trim()) {
			alert('Word incomplete!');
			return;
		}
		
	   var a = this.newAttributes();
 	   console.log('AppView createOnEnter, attrs ' + a);
      app.Words.create(a);
      this.$inputForward.val('');
      this.$inputBackward.val('');
    },

  });
	
})();	
