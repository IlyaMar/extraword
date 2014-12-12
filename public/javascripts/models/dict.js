 var app = app || {};

(function () {
	'use strict';

	app.Dictionary = Backbone.Model.extend({
		defaults: {
			name: 'dict1',
			description: '',
			language: 'en-ru'
		}
	});
  
})();