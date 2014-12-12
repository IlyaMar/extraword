
 var app = app || {};

(function () {
	'use strict';

	app.Authentication = Backbone.Model.extend({
		defaults: {
			username: "",
			password: "",
			rememberMe: false,
			loginFailed: false,
			loginAccepted: false
		},
		url: "login"
	});
	
})();

