package com.book;

import java.util.Date;
import java.util.List;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;

@JsonIgnoreProperties(ignoreUnknown=true)
@PersistenceCapable
public class TeamTask {
	
	@PrimaryKey
	@Persistent(valueStrategy=IdGeneratorStrategy.IDENTITY)
	private Key id;
	
	
	@Persistent
	private String task,from,status,comment;
	
	
	@Persistent
	private List<String> to,withobject;
	
	
	@Persistent
	private Date duedate,createddate;
	
	
	public TeamTask(){
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
	
	public void setFrom(String from) {
		this.from = from;
	}

	public String getFrom() {
		return from;
	}
	
	
	public void setStatus(String status) {
		this.status = status;
	}

	public String getStatus() {
		return status;
	}
	
	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getComment() {
		return status;
	}
	
	public void setTo(List<String> to) {
		this.to = to;
	}

	public List<String> getTo() {
		return to;
	}
	
	public void setWithobject(List<String> withobject) {
		this.withobject = withobject;
	}

	public List<String> getWithobject() {
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
	


}
