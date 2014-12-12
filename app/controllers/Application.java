package controllers;

import models.User;
import play.Routes;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import views.html.index;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class Application extends Controller {

    public static Result index() {
    	System.out.println("Application.index");
        return ok(index.render("Your new application is ready."));
    }

	public static Result login() {
		JsonNode json = request().body().asJson();
		String un = json.findPath("username").textValue();
		String p = json.findPath("password").textValue();
    	System.out.println("Application.login, as " + un);

		User u = User.authenticate(un, p);
		if ( u == null)
			return badRequest();
		
		session().clear();
		session("userName", un);
		
		ObjectNode result = Json.newObject();
		result.put("userName", un);
		return ok(result);
	}

	public static Result logout() {
	    session().clear();
	    return ok();
	}
    
	public static Result javascriptRoutes() {
		response().setContentType("text/javascript");
		return ok(
			Routes.javascriptRouter("jsRoutes",
				controllers.routes.javascript.Dictionaries.listAll(),
				controllers.routes.javascript.Dictionaries.view(),
				controllers.routes.javascript.Dictionaries.add(),
				controllers.routes.javascript.Dictionaries.addWord(),
				controllers.routes.javascript.Application.login(),
				controllers.routes.javascript.Application.logout()
				/*controllers.routes.javascript.Words.add()*/
			)
		);
	} 
}
