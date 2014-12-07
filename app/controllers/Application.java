package controllers;

import play.*;
import play.mvc.*;

import views.html.*;

public class Application extends Controller {

    public static Result index() {
    	System.out.println("Application.index");
        return ok(index.render("Your new application is ready."));
    }

	public static Result javascriptRoutes() {
		response().setContentType("text/javascript");
		return ok(
			Routes.javascriptRouter("jsRoutes",
				controllers.routes.javascript.Dictionaries.listAll(),
				controllers.routes.javascript.Dictionaries.view(),
				controllers.routes.javascript.Dictionaries.add(),
				controllers.routes.javascript.Dictionaries.addWord()
				/*controllers.routes.javascript.Words.add()*/
			)
		);
	} 
}
