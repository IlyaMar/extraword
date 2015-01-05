 var app = app || {};

(function () {
	'use strict';

	app.DictionariesView = Backbone.View.extend({
		// generate a new element
		tagName: "div",
		id: "dicts-view",
		
	    template: _.template( $('#dicts-template').html() ),
	    templateDict: _.template( $('#dictrow-template').html() ),
	
		events: {
		  'keypress #new-word-backward': 'createOnEnter',
		  'click .correct': 'correct',
		  'click .check': 'check',
		  'click .next': 'nextWord'
		},
		
		initialize: function() {
			console.log("DictsView initialize, current length " + app.Dicts.length);
			this.$el.html( this.template() );
			//app.Dicts.reset();

			app.Dicts.each(this.addOne, this)			
			this.listenTo(app.Dicts, 'add', this.addOne);
			app.Dicts.fetch();
		},

		addOne: function(dict) {
			console.log(dict)
			this.$('#dicts-table').append( this.templateDict( {d : dict}) );
		},
		
		render: function() {
			//app.Dicts.each(this.addOne, this);

		},
		
  });
	
})();	

