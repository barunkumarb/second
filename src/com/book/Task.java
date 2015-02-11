package com.book;

import java.util.Date;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;

@PersistenceCapable
public class Task {
	
	@PrimaryKey
	@Persistent(valueStrategy=IdGeneratorStrategy.IDENTITY)
	private Key id;
	
	@Persistent
	private String task,contactid,withobject,status,user;
	
	@Persistent
	private Date duedate,createddate;
	
	public Task(){
		createddate= new Date();
	}
	
	
	
	public void setId(String id) {
		this.id = KeyFactory.stringToKey(id);
	}

	public String getId() {
		return KeyFactory.keyToString(id);
	}
	
	public void setTask(String task) {
		this.task = task;
	}

	public String getTask() {
		return task;
	}
	
	public void setContactid(String contactid) {
		this.contactid = contactid;
	}

	public String getContactid() {
		return contactid;
	}
	
	public void setWithobject(String withobject) {
		this.withobject = withobject;
	}

	public String getWithobject() {
		return withobject;
	}
	
	public void setCreateddate(Date createddate) {
		this.createddate = createddate;
	}

	public Date getCreateddate() {
		return createddate;
	}
	
	
	
	public void setDuedatet(Date duedate) {
		this.duedate = duedate;
	}

	public Date getDuedate() {
		return duedate;
	}
	
	public void setUser(String user) {
		this.user = user;
	}

	public String getUser() {
		return user;
	}		
	
	public void setStatus(String status) {
		this.status = status;
	}

	public String getStatus() {
		return status;
	}			
}
