package com.book;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.NotPersistent;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.gmr.web.multipart.GMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import com.google.appengine.api.datastore.Blob;
import com.google.appengine.datanucleus.annotations.Unowned;

@JsonIgnoreProperties(ignoreUnknown=true)
@PersistenceCapable
public class Contact {
	
	@PrimaryKey
	@Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
	private Long id;
	
	
	@Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
	private String email;

	@Persistent
	private String  number, name, user;

	@Persistent(dependent = "true")
    @Unowned
	private ContactImage userimage;

	public void setID(Long id) {
		this.id = id;
	}

	public Long getID() {
		return id;
	}
	
	

	public void setEmail(String email) {
		this.email = email;
	}

	public String getEmail() {
		return email;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public String getNumber() {
		return number;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getUser() {
		return user;
	}

	public void setUserimage(ContactImage userimage) {
		this.userimage = userimage;
	}

	public ContactImage getUserimage() {
		return userimage;
	}
 	    
}
