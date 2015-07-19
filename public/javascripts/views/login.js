'use strict';
var app = app || {};

(function () {

	app.LoginView = Backbone.View.extend({
		// generate a new element
		tagName: "div",
		id: "login-view",
		model: app.Authentication,
	    template: _.template( $('#login-template').html() ),
	
		events: {
		  'click .ok': 'login',
          'keypress #user-password': 'keypress',
  		   'click #login-as-ilya':  'login_as_ilya'
		},
		
		initialize: function() {
			this.render();
		},
		
		render: function() {
			console.log("LoginView render");
			this.$el.html( this.template() );
			return this;
		},
		
	    keypress: function( event ) {
			  if ( event.which !== ENTER_KEY )
				return;
			this.login();
		},

		login_as_ilya: function() {
			this.$('#user-name').val('Ilya');
			this.$('#user-password').val('deepblueland');
			this.login();
		},
		
		login: function() {
			var d = {userName: this.$('#user-name').val().trim(),	password: this.$('#user-password').val().trim()};
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
		},
		
		logout: function() {
			this.model.destroy(
					{
						success: function(model, response) {
							console.log('user logged out: ' + model.userName);
							console.log(response);
						},
						wait: true
					}
				);
			this.model.clear();
		}
		
  });
	
})();	

