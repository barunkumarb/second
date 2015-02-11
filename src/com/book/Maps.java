package com.book;

import javax.jdo.annotations.Extension;
import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;



@JsonIgnoreProperties(ignoreUnknown=true)
@PersistenceCapable
public class Maps {
	
	//@Extension(vendorName="datanucleus",key="gae.encoded-pk",value="true")
	
	@PrimaryKey
	@Persistent(valueStrategy=IdGeneratorStrategy.IDENTITY)
	private Key id;
	
	@Persistent
	private String key,value;
	
	
	public void setId(String id) {
		this.id = KeyFactory.stringToKey(id);
	}

	public String getId() {
		return KeyFactory.keyToString(id);
	}
	
	public void setKey(String key) {
		this.key = key;
	}

	public String getKey() {
		return key;
	}
	
	public void setValue(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}
	
	
	
}
