package models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.avaje.ebean.Expr;

import com.avaje.ebean.Model;

@Entity
public class Learned extends Model {

    @Id
	public Long id;
	 
    @OneToOne
    public Word word;
    
    @OneToOne
    public User user;

    public long correct;
    public long wrong;

    
    public Learned(Word w, User u) {
    	word = w;
    	user = u;
    	correct = 0;
    	wrong = 0;
    }

	public static Learned create(Word w, User u) {
        Learned l = new Learned(w, u);
        l.save();
        return l;
    }
	
    public static Finder<Long,Learned> find = new Finder<Long,Learned>(
        Long.class, Learned.class
    ); 

	public static Learned getOne(Word w, User u) {
		return find.where().and(Expr.eq("word", w), Expr.eq("user", u)).findUnique();
	}

	public static List<Learned> getRelated(Dictionary d, User u) {
		return find.where().and(Expr.eq("word.dictionary", d), Expr.eq("user", u)).findList();
	}

}