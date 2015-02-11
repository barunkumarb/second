package com.book;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

@PersistenceCapable
public class ForgetPassword {
	
	@PrimaryKey
	@Persistent(valueStrategy=IdGeneratorStrategy.IDENTITY)
	private Long id;
	
	@Persistent
	private String userkey;
	
	
	public void setId(Long id){
		this.id=id;
	}
	public Long getId()
	{
		return id;
	}

	public void setUserKey(String userkey){
		this.userkey=userkey;
	}
	public String getUserKey()
	{
		return userkey;
	}
}
