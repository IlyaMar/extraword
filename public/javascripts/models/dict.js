'use strict';
 var app = app || {};

(function () {

	app.Dictionary = Backbone.Model.extend({
		defaults: {
			name: 'dict1',
			description: '',
			language: 'en-ru'
		}
	});
  
})();