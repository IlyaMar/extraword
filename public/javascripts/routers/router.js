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
			'*filter': 'setFilter'
		},
		
		initialize: function() {
			console.log('DictionaryRouter initialize')
		},
		
		listdicts : function () {
			var v = new app.DictionariesView();
			this.loadView(v);
			document.body.appendChild( this.view.el );
		},

		newdict : function () {
			var v = new app.NewDictionaryView();
			this.loadView(v);
			document.body.appendChild( this.view.el );
		},

		selectDict: function(id) {
			app.Words.resetUrl(id);
			this.loadView(new app.AppView());
			document.body.appendChild( this.view.el );
		},

		login: function(id) {
			this.loadView(new app.LoginView());
			document.body.appendChild( this.view.el );
		},
		
		setFilter: function( param ) {
			console.log('DictionaryRouter setFilter to ' + param)

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
			console.log('DictionaryRouter loadView, view el #' + view.el.id)
			this.view && (this.view.close ? this.view.close() : this.view.remove());
			this.view = view;
		}
		
	});

	app.DictionaryRouter = new DictionaryRouter();
	Backbone.history.start();

})();
