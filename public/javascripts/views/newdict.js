'use strict';
var app = app || {};

(function () {

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
			if (!name) {
				alert('Name is empty!');
				return;
			}
		
			var d = {'name' : name, 'description' : description};
			var dict = app.dict_list.create(d, {wait: true});
			//console.log("dict created");
			
			app.DictionaryRouter.navigate("/", {trigger: true});
		},
		
  });
	
})();	

