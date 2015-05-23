'use strict';
var app = app || {};

(function () {

  // The DOM element for a word...
  app.WordView = Backbone.View.extend({
    //... is a table row.
    tagName: 'tr',

    // cache the template function
    template: _.template( $('#word-template').html() ),

    // The DOM events specific to an item.
    events: {
		'click .toggle': 'togglecompleted', 
		'click .destroy': 'clear'
    },

    initialize: function() {
		console.log('WordView initialize');
        this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
		console.log('WordView render, ' + this.model.get('forward'));
        this.$el.html( this.template( this.model.toJSON() ) );
		this.$el.toggleClass('completed', this.model.get('completed'));
        return this;
	},

	clear: function() {
	  console.log('WordView clear called');
      this.model.destroy();
   }
  });
  
})();