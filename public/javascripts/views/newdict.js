 var app = app || {};

(function () {
	'use strict';

	app.NewDictionaryView = Backbone.View.extend({
		// generate a new element
		tagName: "div",
		id: "new-dict-view",
		
	    template: _.template( $('#newdict-template').html() ),
		
		events: {
		  'click .ok': 'create',
		},
		
		initialize: function() {
			console.log("NewDictionaryView initialize");
			this.wordIndex = 0;		// iterate words from start
			this.wordsAsked = 1;	// current exercise statistics
			this.wordsCorrect = 0;
		},

		render: function() {
			console.log("NewDictionaryView render");
			this.$el.html(this.template({}));
			return this;
		},
		
		create: function() {
			var name = this.$('#newdict-name').val().trim();
			var description = this.$('#newdict-description').val().trim();
			console.log("NewDictView create, name " + name);
			if ( !name) {
				alert('Name is empty!');
				return;
			}
		
			var a = {'name' : name, 'description' : description};
			var d = app.dict_list.create(a, {wait: true});
			console.log("created dict " + d);
			
			//app.Words.resetUrl(d.id);
			//app.Words.reset();
			
			app.DictionaryRouter.navigate("/", {trigger: true});
		},
		
  });
	
})();	

