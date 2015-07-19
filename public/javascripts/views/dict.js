'use strict';
var app = app || {};

(function() {

	// Word list. Main piece of UI.
	app.DictView = Backbone.View.extend({
		tagName : "section",
		id : "dict-view",

		template : _.template($('#dict-template').html()),

		events : {
			'keypress #new-word-backward' : 'createOnEnter',
			'click .delete' : 'drop'
		},

		initialize : function(options) {
			console.log('DictView initialize');
			this.model = options.dict;
			if (this.model == undefined) // dict list is not loaded
				this.model = new app.Dictionary();
			this.collection = options.words;
			this.listenTo(this.collection, 'add', this.addOne);
			this.listenTo(this.collection, 'reset', this.render);
		},

		render : function() {
			console.log('DictView render');
			this.$el.html(this.template(this.model.toJSON()));
			this.$inputForward = this.$('#new-word-forward');
			this.$inputBackward = this.$('#new-word-backward');
			this.$main = this.$('#main');

			this.collection.each(this.addOne, this);
			return this;
		},

		addOne : function(word) {
			console.log('DictView addOne');
			var view = new app.WordView({ model : word });
			this.$('#word-table').append(view.render().el);
		},

		// generate the attributes for a new word
		newAttributes : function() {
			return {
				forward : this.$inputForward.val().trim(),
				backward : this.$inputBackward.val().trim(),
				completed : false
			};
		},

		createOnEnter : function(event) {
			if (event.which !== ENTER_KEY)
				return;
			console.log(this.$inputForward.val() + this.$inputBackward.val());

			if (!this.$inputForward.val().trim()
					|| !this.$inputBackward.val().trim()) {
				alert('Word incomplete!');
				return;
			}

			var a = this.newAttributes();
			console.log('DictView createOnEnter, attrs ' + a);
			this.collection.create(a, {wait: true});
			this.$inputForward.val('');
			this.$inputBackward.val('');
		},

		drop : function() {
			console.log('DictView clear');
			if (confirm('Drop dictionary ' + this.model.get('name') + '?')) {
				this.model.destroy();
				console.log('dropped');
				app.DictionaryRouter.navigate("/", {
					trigger : true
				});
			} else {
				console.log('canceled');
			}
		}

	});

})();
