'use strict';
var app = app || {};

(function () {

	app.Word = Backbone.Model.extend({
		defaults: {
			forward: '',
			backward: '',
			right: 0,
			wrong: 0,
			completed: false		// marked as already learned
		},

		// toggle the `completed` state
		toggle: function() {
			console.log('Word toggle');
			this.save({ completed: !this.get('completed') });
		}
	});
  
})();