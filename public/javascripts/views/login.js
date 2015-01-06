 var app = app || {};

(function () {
	'use strict';

	app.LoginView = Backbone.View.extend({
		// generate a new element
		tagName: "div",
		id: "login-view",
		model: app.Authentication,
	    template: _.template( $('#login-template').html() ),
	
		events: {
		  'click .ok': 'login',
          'keypress #user-password': 'keypress',
		},
		
		initialize: function() {
			this.render();
		},
		
		render: function() {
			console.log("LoginView render")
			this.$el.html( this.template() );
		},
		
	    keypress: function( event ) {
			  if ( event.which !== ENTER_KEY ) {
				return;
			  }
			this.login();
		},

		login: function() {
			var d = {username: this.$('#user-name').val().trim(),	password: this.$('#user-password').val().trim()};
			console.log('login with data');
			console.log(d);
			this.model.save(d,
        			{
						success: function(model, data) {
							console.log("logged in as " + data.userName);
							app.dict_list.reset();
							Backbone.history.navigate("/", {trigger: true});
						},
						
						error: function(){
						  alert("login error");
						}
					}
			);
		}
		
  });
	
})();	

