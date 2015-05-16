
 var app = app || {};

(function () {
	'use strict';

	var AuthClass = Backbone.Model.extend({
		defaults: {
			userName: "",
			password: "",
			rememberMe: false,
			loginFailed: false,
			loginAccepted: false
		},
		url: "login"
	});
	
	app.Authentication = new AuthClass();
})();

