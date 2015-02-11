package com.book;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

import com.google.appengine.api.datastore.Blob;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;


@JsonIgnoreProperties(ignoreUnknown=true)
@PersistenceCapable
public class User {
	
		@PrimaryKey
		@Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
		private Key id;
		
		@Persistent
		private String password,email, number, name,address;
	
		public User()
		{
			
		}
		
		public User(String email)
		{
			this.email=email;
		}
		
		public void setID(Key id) {
			this.id = id;
		}
	
		public String getID() {
			return KeyFactory.keyToString(id);
		}
		
		
		public void setEmail(String email) {
			this.email = email;
		}

		public String getEmail() {
			return email;
		}

		public void setPassword(String password) {
			this.password = password;
		}

		public String getPassword() {
			return password;
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
}
