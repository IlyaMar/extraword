'use strict';
var app = app || {};

(function () {

	// possible states
	// #/ (all - default)
	// #/active
	// #/completed
	var DictionaryRouter = Backbone.Router.extend({
		routes: {
			'' : 'listdicts',
			'exercise' : 'exercise',
			'newdict': 'newdict',
			'dict/:id':  'selectDict',
			'login':   'login',
			'logout':   'logout',
		},
		
		initialize: function() {
			console.log('DictionaryRouter initialize');
		},
		
		listdicts : function () {
			var v = new app.DictionariesView({collection : app.dict_list});
			app.dict_list.fetch();
			this.loadView(v);
		},

		newdict : function () {
			var v = new app.NewDictionaryView();
			this.loadView(v);
		},

		selectDict: function(id) {
			var dict = app.dict_list.get(id);
			app.word_list.resetUrl(id);
			app.word_list.fetch();
			this.loadView(new app.DictView({dict: dict, words: app.word_list}));
		},

		login: function() {
			this.loadView(new app.LoginView());
		},

		logout: function() {
			var v = new app.LoginView();
			v.logout();
			this.loadView(v);
		},
		
		exercise : function () {
			var v = new app.ExerciseView({collection : app.word_list});
			this.loadView(v);
		},
		
		loadView : function(view) {
			console.log('DictionaryRouter loadView, #' + view.id);
			this.view && (this.view.close ? this.view.close() : this.view.remove());
			this.view = view;
			document.body.appendChild( this.view.render().el );
		}
		
	});

	app.DictionaryRouter = new DictionaryRouter();
	Backbone.history.start();

})();
