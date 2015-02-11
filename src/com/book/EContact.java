package com.book;

import java.util.ArrayList;
import java.util.List;

import javax.jdo.annotations.Element;
import javax.jdo.annotations.Embedded;
import javax.jdo.annotations.EmbeddedOnly;
import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.NotPersistent;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.gmr.web.multipart.GMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import com.google.appengine.api.datastore.Blob;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.datanucleus.annotations.Owned;
import com.google.appengine.datanucleus.annotations.Unowned;


@JsonIgnoreProperties(ignoreUnknown=true)
@PersistenceCapable(detachable="true", identityType=IdentityType.APPLICATION)
public class EContact {
	
	@PrimaryKey
	@Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
	private Long id;
	
	
	

	@Persistent
	private String  user,address,name;
	
	@Persistent
	private boolean deleted;
	
	

	@Persistent(defaultFetchGroup="true",dependent="true")
	private ContactImage userimage;
	
	

	@Persistent(defaultFetchGroup="true")
	@Element(dependent = "true") 
	private List<Maps> emails;
	
	@Persistent(defaultFetchGroup="true")
	@Element(dependent = "true") 
	private List<Maps> numbers;
	
	
	public void setID(Long id) {
		this.id = id;
	}

	public Long getID() {
		return id;
	}
	
	

	public void setEmails(List<Maps> emails) {
		this.emails = emails;
	}

	public List<Maps> getEmails() {
		return emails;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setNumbers(List<Maps> numbers) {
		this.numbers = numbers;
	}

	public List<Maps> getNumbers() {
		return numbers;
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
 	   
	public void setAddress(String address) {
		this.address = address;
	}

	public String getAddress() {
		return address;
	}
	
	
	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public boolean getDeleted() {
		return deleted;
	}
}
