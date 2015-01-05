package controllers;

import java.util.List;

import models.Dictionary;
import models.User;
import models.Word;
import play.libs.Json;
import play.mvc.BodyParser;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;

import com.fasterxml.jackson.databind.JsonNode;


public class Dictionaries extends Controller {
	
	public static Result listAll() {
    	System.out.println("Dictionaries.listAll");
    	//List<Dictionary> dicts = models.Dictionary.getSharedDictionaries();
    	String userName = Http.Context.current().session().get("userName");
		//User u = User.find.byId(userName);
		List<Dictionary> dicts = models.Dictionary.getVisibleDictionaries(userName);
		//List<models.Dictionary> dl = models.Dictionary.find.all();
		JsonNode j = Json.toJson(dicts); 
		return ok(j);		
	}
	
	public static Result view(Long dictId) {
    	System.out.println("Dictionaries.view");
		models.Dictionary d = models.Dictionary.find.ref(dictId);
		return ok(Json.toJson(d.words));		
	}

	@BodyParser.Of(BodyParser.Json.class)
	public static Result add() {
    	System.out.println("Dictionaries.add");
		JsonNode json = request().body().asJson();
		String userName = "Bob"; //Http.Context.current().session().get("userName");
		/*User u = User.find.byId(userName);*/

		if (true/*d.isEditable(u)*/) {
			  String n = json.findPath("name").textValue();
			  String d = json.findPath("description").textValue();
			  if(n == null || n.isEmpty()) {
			    return badRequest("Missing parameters");
			  }
			
			  Dictionary newDict = Dictionary.create(n, d, userName);
			System.out.println("created dict " + newDict.getId());
			/*return redirect(
				routes.Dictionaries.view(dictId)
			);*/
            return ok();
		} else {
			return forbidden();
		}
	}

	
	@BodyParser.Of(BodyParser.Json.class)
	public static Result addWord(Long dictId) {
    	System.out.println("Dictionaries.add, dict " + dictId);
		
		 JsonNode json = request().body().asJson();
		
		models.Dictionary d = models.Dictionary.find.ref(dictId);
		String userName = Http.Context.current().session().get("userName");
		/*User u = User.find.byId(userName);*/

		if (true/*d.isEditable(u)*/) {
			  String f = json.findPath("forward").textValue();
			  String b = json.findPath("backward").textValue();
			  if(f == null || b == null) {
			    return badRequest("Missing parameters");
			  }
			  if(f.isEmpty() || b.isEmpty()) {
				    return badRequest("Empty parameters");
			  }
			
			Word newWord = models.Word.create(f, b,	null, dictId);
			System.out.println("created word " + newWord.id);
			/*return redirect(
				routes.Dictionaries.view(dictId)
			);*/
            return ok();
		} else {
			return forbidden();
		}
	}

	public static Result delete(Long wordId) {
		return ok();
	}

}