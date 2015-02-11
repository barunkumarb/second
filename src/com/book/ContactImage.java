package com.book;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

import com.google.appengine.api.datastore.Blob;
import com.google.appengine.api.datastore.Key;

@JsonIgnoreProperties(ignoreUnknown=true)
@PersistenceCapable(detachable="true", identityType=IdentityType.APPLICATION)
public class ContactImage {

		@PrimaryKey
		@Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
		private Key id;			
		
		@Persistent
		private Blob photo;
	
		public void setID(Key id) {
			this.id = id;
		}
	
		public Key getID() {
			return id;
		}
	
	
		public void setPhoto(Blob photo) {
			this.photo = photo;
		}
	
		public byte[] getPhoto() {
			return photo.getBytes();
		}

}
