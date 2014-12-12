 var app = app || {};

(function () {
	'use strict';

	app.LoginView = Backbone.View.extend({
		// generate a new element
		tagName: "div",
		id: "login-view",
		model: new app.Authentication(),
	    template: _.template( $('#login-template').html() ),
	
		events: {
		  'click .ok': 'login',
		},
		
		initialize: function() {
			this.render();
		},
		
		render: function() {
			console.log("LoginView render")
			this.$el.html( this.template() );
		},

		login: function() {
			var d = {username: this.$('#user-name').val().trim(),	password: this.$('#user-password').val().trim()};
			console.log('login with data');
			console.log(d);
			this.model.save(d,
        			{
						success: function(data) {
							alert("login success");
						},
						
						error: function(){
						  alert("login error");
						}
					}
			);
		}
		
  });
	
})();	

