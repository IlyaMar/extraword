package models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.avaje.ebean.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Word extends Model {

    @Id
	public Long id;
	
    public String forward;		// english text
    public String backward;		// russian translation
    public String context;		// optional 
 
    @ManyToOne
    @JsonIgnore
    public Dictionary dictionary;

    public Word(String forward, String backward, String context, Dictionary dictionary) {
      this.forward = forward;
      this.backward = backward;
      this.context = context;
      this.dictionary = dictionary;
    }

    public String toString() {
    	return "" + id + " " + forward;
    }
    
	public static Word create(String forward, String backward, String context, Long dictId) {
        Word w = new Word(forward, backward, context, models.Dictionary.find.ref(dictId));
        w.save();
        return w;
    }
	
    public static Finder<Long,Word> find = new Finder<Long,Word>(
        Long.class, Word.class
    );
}