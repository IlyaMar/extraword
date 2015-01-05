
 var app = app || {};

(function () {
	'use strict';

	var AuthClass = Backbone.Model.extend({
		defaults: {
			username: "",
			password: "",
			rememberMe: false,
			loginFailed: false,
			loginAccepted: false
		},
		url: "login"
	});
	
	app.Authentication = new AuthClass();
})();

