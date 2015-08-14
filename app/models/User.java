package models;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;

import com.avaje.ebean.Model;

@Entity
@Table(name = "appuser")
public class User extends Model {

    @Id
    public String name;
    public String password;
    public String email;		// optional
    
    public User(String name, String password, String email) {
      this.name = name;
      this.password = password;
      this.email = email;
    }

    public static Finder<String,User> find = new Finder<String,User>(
        String.class, User.class
    );
	
	public static User authenticate(String name, String password) {
        return find.where().eq("name", name)
            .eq("password", password).findUnique();
    }
	
	public static String getUserName(User u) {
		if (u == null)
			return "anonimous";
		else
			return u.name;
	}

}