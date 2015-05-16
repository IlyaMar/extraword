var app = app || {};

(function () {
	'use strict';

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
			'*filter': 'setFilter'
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
			app.Words.resetUrl(id);
			app.Words.fetch();
			this.loadView(new app.AppView({collection : app.Words}));
		},

		login: function() {
			this.loadView(new app.LoginView());
		},

		logout: function() {
			var v = new app.LoginView();
			v.logout();
			this.loadView(v);
		},
		
		setFilter: function( param ) {
			console.log('DictionaryRouter setFilter to ' + param);

			// Set the current filter to be used
			app.WordFilter = param || '';
			
			// Trigger a collection filter event, causing hiding/unhiding of Todo view items
			app.Words.trigger('filter');
		},
		
		exercise : function () {
			var v = new app.ExerciseView();
			this.loadView(v);
			document.body.appendChild( this.view.el );
		},


		
		loadView : function(view) {
			console.log('DictionaryRouter loadView, view el #' + view.el.id);
			this.view && (this.view.close ? this.view.close() : this.view.remove());
			this.view = view;
			document.body.appendChild( this.view.render().el );
		}
		
	});

	app.DictionaryRouter = new DictionaryRouter();
	Backbone.history.start();

})();
