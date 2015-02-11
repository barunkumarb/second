package com.book;

import java.util.TreeMap;

import org.apache.jsp.ah.searchDocumentBody_jsp;

import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;

public class QueryUser {

	private Key id;
	
	private String email,name,number;
	
	
	public void setId(Key id) {
		this.id = id;
	}

	public String getId() {
		return KeyFactory.keyToString(id);
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
	
}
