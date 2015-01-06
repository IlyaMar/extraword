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
			// collection is passed in constructor
			console.log("DictsView initialize, current length " + this.collection.length);
			//this.collection.bind('add', this.addDictItem, this);
			//this.collection.bind('reset', this.render, this);
			//this.collection.on('change', this.render, this);
			//app.dict_list.reset();

			this.listenTo(this.collection, 'reset', this.render);
			this.listenTo(this.collection, 'add', this.addDictItem);
			//this.collection.fetch();
			//this.$el.html( this.template() );
		},

		addDictItem: function(dict) {
			console.log("addDictItem");
			this.$('#dicts-table').append( this.templateDict( {d : dict}) );
		},
		
		render: function() {
			console.log("dict list render");
			this.$el.html( this.template() );
			this.collection.each(this.addDictItem, this);
			return this;
		},
		
  });
	
})();	

