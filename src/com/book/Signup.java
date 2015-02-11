package com.book;

import java.util.Date;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

import com.google.appengine.api.datastore.Key;

@JsonIgnoreProperties(ignoreUnknown=true)
@PersistenceCapable
public class Signup {
	
	@PrimaryKey
	@Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
	private Long id;
	
	@Persistent
	private String email, number, name,address;
	
	@Persistent
	private Date createddate,expiredate;
	
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
	public void setAddress(String address) {
		this.address = address;
	}

	public String getAddress() {
		return address;
	}		
	
	public void setCreatedDate(Date createddate) {
		this.createddate = createddate;
	}

	public Date getCreatedDate() {
		return createddate;
	}		
	public void setExpiredate(Date expiredate) {
		this.expiredate = expiredate;
	}

	public Date getExpiredate() {
		return expiredate;
	}		

}
