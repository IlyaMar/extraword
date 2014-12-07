package models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import play.db.ebean.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Dictionary extends Model {

	@Id
    Long id;
    String name;
    public String description;
    public boolean shared = false;		// visible to all users, including non-authenticated
    
    
	@ManyToOne
    @JsonIgnore	
	public User owner;
	
	@OneToMany(mappedBy = "dictionary")
    @JsonIgnore
	public List<Word> words = new ArrayList<Word>();

    public Dictionary(String name, String description, User owner) {
      this.name = name;
      this.description = description;
	  this.owner = owner;
    }

    public static Finder<Long,Dictionary> find = new Finder<Long,Dictionary>(
        Long.class, Dictionary.class
    );
	
	public static Dictionary create(String name, String description, String owner) {
        models.Dictionary d = new models.Dictionary(name, description, User.find.ref(owner));
        d.save();
        return d;
    }
	
	public static String rename(Long dictId, String newName, String newDescription) {
		Dictionary d = find.ref(dictId);
		d.name = newName;
		d.description = newDescription;
		d.update();
		return newName;
	}
	
	public boolean isVisible(User toUser) {
		if (shared)
			return true;
		if (toUser == null)
			return false;
		else
			return toUser.name.equals(owner.name);
	}

	public boolean isEditable(User toUser) {
		if (toUser == null)
			return false;
		else
			return toUser.name.equals(owner.name);
	}

	public static List<Dictionary> getOwnDictionaries(User owner) {
		return find.where().eq("owner", owner).findList();
	}

	public static List<Dictionary> getSharedDictionaries() {
		return find.where().eq("shared", true).findList();
	}

	public Long getId() {
		return id;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

    /*@JsonIgnore
	public User getOwner() {
		return owner;
	}

	public void setOwner(User owner) {
		this.owner = owner;
	}*/

	public String getOwnerName() {
		return owner.name;
	}

	
	public int getWordCount() {
		return words.size();
	}
	
}