package com.book;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.jdo.Extent;
import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.jdo.Transaction;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.gmr.web.multipart.GMultipartFile;
import org.mortbay.util.ajax.JSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.portlet.ModelAndView;

import sun.invoke.empty.Empty;

import com.auth.GoogleAuthHelper;
import com.google.api.client.http.HttpRequest;
import com.google.api.client.http.HttpResponse;
import com.google.appengine.api.datastore.Blob;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.TransactionOptions;
import com.google.appengine.api.search.query.ExpressionParser.num_return;
import com.google.appengine.api.search.query.QueryParser.query_return;
import com.google.appengine.api.taskqueue.Queue;
import com.google.appengine.api.taskqueue.QueueFactory;
import com.google.appengine.api.taskqueue.TaskOptions.Method;
import com.google.appengine.labs.repackaged.org.json.JSONArray;
import com.google.appengine.labs.repackaged.org.json.JSONException;
import com.google.appengine.labs.repackaged.org.json.JSONObject;
import com.google.gson.JsonObject;




import static com.google.appengine.api.taskqueue.TaskOptions.Builder.*;

@Controller
public class UsersController {
	   
	final Logger LOGGER = Logger.getLogger(UsersController.class.getName());
	
	public  UsersController() {				
		 
		
	}
		
	@RequestMapping(value="/",method={RequestMethod.GET}) 	
	public  String validate(HttpServletRequest request,HttpServletResponse resp, HttpSession session)
	{	
	
		
	 String email;
	 PersistenceManager pm=PMF.get().getPersistenceManager();
	 Query q=null;
		HashMap<String, String> email_profile;
	
		if(request.getParameter("code") != null && request.getParameter("state") != null && request.getParameter("state").equals(session.getAttribute("state")))
		{
			try {
		GoogleAuthHelper g=new GoogleAuthHelper();		
		session.removeAttribute("state");
		
		String str=g.getUserInfoJson(request.getParameter("code"));
		
		LOGGER.info(str);
		
	     JSON a=new JSON();
	     email_profile= (HashMap<String, String>) a.fromJSON(str);
	     
	     
	     
	     //Google Authentication over
	     
	     //User Validation for new user or existing user
	     
	    
	      q=pm.newQuery(User.class);
	     
		    	 
			     q.setFilter("email== useremail");
			     q.declareParameters("String useremail");
			     List<User> userresult=(List<User>) q.execute(email_profile.get("email"));
			     q.closeAll();
				 if(!userresult.isEmpty())
				 {
					for(User user:userresult)
					{
						if(user.getEmail().equals(email_profile.get("email")))
							session.setAttribute("user",user.getID());
					}
					 LOGGER.info("old user of O auth");
				      return "Contact";
				 }
				 else
				 {
					 User user=new User(email_profile.get("email"));
					 user.setName(email_profile.get("name"));
					 user=pm.makePersistent(user);					 					 
					 LOGGER.info("new user created from Oauth");
					 session.setAttribute("user",user.getID());
					 					 					 
					 return "Contact";
					 
				 }
		} catch (Exception e) {
			
			e.printStackTrace();
			LOGGER.log(Level.SEVERE, "Exception occur", e);
		}
	     finally{
	    	 q.closeAll();
	    	 pm.close();
	     }

		
		}		
		LOGGER.info("not verified");
		return "Contact";
		
	}
	
	@RequestMapping(value="/signup/available",method={RequestMethod.POST})  
	@ResponseBody public HashMap<String,String>  userSignupVerification(HttpSession session,@RequestBody HashMap<String,String> map) 
	{		
		PersistenceManager pm=PMF.get().getPersistenceManager();
		Query q=pm.newQuery(Signup.class);
		String email;
		HashMap<String,String> resp=new HashMap<>();
		try {
			
			System.out.print("Signup email verification" + map.get("email"));
			q.setFilter("email==useremail");
			q.declareParameters("String useremail");
			List<Signup> signupuser= (List<Signup>) q.execute(map.get("email"));
			
			if(!signupuser.isEmpty())
			{
				resp.put("result","AllReady Signed UP");
				return resp;
			}
			q.closeAll();
			
			q=pm.newQuery(User.class);
			q.setFilter("email==emailparam && password!=passwordparam");
			q.declareParameters("String emailparam,String passwordparam");
			List<User> appuser= (List<User>) q.execute(map.get("email"),null);		

			if(!appuser.isEmpty())
			{
				resp.put("result","AllReady Registered");
				return resp;
			}
			
			resp.put("result","valid");
			
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		finally{
			pm.close();
		}
	      
		return resp;    
		
	}
	
	@RequestMapping(value="/signup",method={RequestMethod.POST})  
	@ResponseBody public HashMap<String,String>  userSignup(@RequestBody Signup newuser) 
	{		
		PersistenceManager pm=PMF.get().getPersistenceManager();
		Query q=pm.newQuery(Signup.class);
		String email;
		HashMap<String,String> resp=new HashMap<>();
		try {
			
			
			q.setFilter("email==useremail");
			q.declareParameters("String useremail");
			List<Signup> signupuser= (List<Signup>) q.execute(newuser.getEmail());
			
			q.closeAll();
			
			q=pm.newQuery(User.class);
			q.setFilter("email==emailparam && password!=passwordparam");
			q.declareParameters("String emailparam,String passwordparam");
			List<User> appuser= (List<User>) q.execute(newuser.getEmail(),null);			

			for(User singleuser:appuser)
				System.out.print(singleuser.getEmail() + " " + singleuser.getPassword());
						
			 
			System.out.print(signupuser.isEmpty() + " " + appuser.isEmpty());
			
			if(signupuser.isEmpty() && appuser.isEmpty())
			{
				email=newuser.getEmail();
				Date startdate=new Date();	    	
				newuser.setCreatedDate(startdate);
				newuser.setExpiredate(new Date(startdate.getTime()+(10*60000)));			  
				newuser=pm.makePersistent(newuser);
				
				resp.put("result","created");
			   
			  

			  String messagecontent="This Link valid for only 10 minutes_"
			  	+ "<a href='http://contactlistbook.appspot.com/#/signin/"+ newuser.getID()+"'>Click Here</a>";
			  
			  Queue queue = QueueFactory.getDefaultQueue();
		        queue.add(withUrl("/pushqueue_delete/"+newuser.getID()).countdownMillis(10*60000).method(Method.POST));
		       
		        SendMail mail=new SendMail();			  
		        mail.sendMail("arun.balaji@a-cti.com", newuser.getEmail(), newuser.getName(), "Email Verification", messagecontent);
		            	     	     
			  System.out.print(newuser.getID());
			     
			  LOGGER.info( messagecontent);
			  
			  LOGGER.info("New user sign up");
			  
			}
			else
			{
				LOGGER.info("User Already Exist");
			}
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		finally{
			pm.close();
		}
	    
	  
	    
	    
	    
	    
		return resp;    //modify
		
	}
	
	
	
	
	
	@RequestMapping(value="/signin_password/{id}",method={RequestMethod.GET})  
	@ResponseBody public HashMap<String,String>  signupExpiryVerification(@PathVariable Long id) 
	{			
		HashMap<String,String> resp=new HashMap<>();
		PersistenceManager pm=PMF.get().getPersistenceManager();
		
		try {
			
			Signup user=(Signup) pm.getObjectById(Signup.class,id);
			System.out.print("Sample expire check up");
	
			if(user!=null)			
				resp.put("result", "valid");
			else
			{
				resp.put("result", "invalid");	
			}
			
			
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		finally
		{
		 pm.close();
		}
		 return resp;
	}
	
	
	@RequestMapping(value="/signin_password/{id}",method={RequestMethod.PUT})
	@ResponseBody public  HashMap<String,String> setNewPassword(@PathVariable("id") Long id,@RequestBody HashMap<String, String> map) 
	{				
		PersistenceManager pm=PMF.get().getPersistenceManager();
		HashMap<String,String> resp=new HashMap<>();
		List<User> users;
		Query q=null;
		Signup signupuser;		 
		Transaction tx=null; 
		try {
			
			 signupuser=pm.getObjectById(Signup.class,id);
			 System.out.print("Set new pass");
			  q=pm.newQuery(User.class);
			  q.setFilter("email==useremail");
			  q.declareParameters("String useremail");
			  
			  users=(List<User>) q.execute(signupuser.getEmail());
			  
			  User newuser=null;
			 
			  if(users.isEmpty())				  
				  newuser=new User();
			  else
				  for(User user:users)
					  if(user.getEmail().equals(signupuser.getEmail()))
						  newuser=user;
				  				  				  
			  newuser.setName(signupuser.getName());
			  newuser.setEmail(signupuser.getEmail());
			  newuser.setNumber(signupuser.getNumber());
			  newuser.setAddress(signupuser.getAddress());
			  newuser.setPassword(map.get("pass"));
			 
			  
			  LOGGER.info("New user added");
			 
//			  		  tx=pm.currentTransaction();                                    //modify
//			  		    tx.begin();
			  			pm.makePersistent(newuser);
						pm.deletePersistent(signupuser);		
//						tx.commit();
			            resp.put("result", "Password_updated");
			            return resp;
			
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		finally{
			q.closeAll();

			pm.close();	
			
		}
		
		return resp;
	    
	  
	}
	
	@RequestMapping(value="/signin_password",method={RequestMethod.POST})
	@ResponseBody public  HashMap<String,String> resetPassword(@RequestBody HashMap<String, String> map,HttpSession session)
	{				
		PersistenceManager pm=PMF.get().getPersistenceManager();
		HashMap<String,String> resp=new HashMap<>();
		try {
			  
			 if(session.getAttribute("user")!=null)
			 {
			  User user=pm.getObjectById(User.class,session.getAttribute("user"));
			  user.setPassword(map.get("pass"));
	          resp.put("result", "Password_updated");
	          return resp;
	          }
			 else 
			 {
				 resp.put("result", "You can't set Password");
			 }
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		finally{			
			pm.close();	
			
		}
		
		return resp;
	    	  
	}
	
	@RequestMapping(value="/forget_password",method={RequestMethod.POST})
	@ResponseBody public  HashMap<String,String> forgetPassword(@RequestBody HashMap<String, String> map,HttpSession session)
	{				
		PersistenceManager pm=PMF.get().getPersistenceManager();
		HashMap<String,String> resp=new HashMap<>();
		List<User> users;
		Query q=null;
		try {
			
			
			  q=pm.newQuery(User.class);
			  q.setFilter("email==useremail");
			  q.declareParameters("String useremail");
			  
			  users=(List<User>) q.execute(map.get("email"));
			  
			  	User forgetuser=null;		  
				  for(User user:users)					  
					  if(user.getEmail().equals(map.get("email")))
					  {
						  forgetuser=user;
						  break;
					  }
				  ForgetPassword temprecord=new ForgetPassword();
				  if(forgetuser!=null)
				  {
				  
				  temprecord.setUserKey(forgetuser.getID());
				  temprecord=pm.makePersistent(temprecord);
				  }
				  else
				  {
					  resp.put("result", "It's Not Registered Email"); 
					  return resp;	
				  }
				  
				  String messagecontent="This Link is To Reset Your Password and it is valid for only Ten minutes"
						  	+ "<a href='http://contactlistbook.appspot.com/#/reset_forget_password/"+ temprecord.getId()+"'>Click Here</a>";
						
				  LOGGER.info(messagecontent);
						  Queue queue=QueueFactory.getDefaultQueue();
						  queue.add(withUrl("/pushqueue_delete/reset/"+temprecord.getId()).countdownMillis(10*60000).method(Method.POST));
					       
					        SendMail mail=new SendMail();			  
					        mail.sendMail("arun.balaji@a-cti.com", forgetuser.getEmail(), forgetuser.getName()==null ?"":forgetuser.getName(), "Reset Password", messagecontent);  
			  
			  
			
	          resp.put("result", "Mail Sent");
	          return resp;		
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		finally{			
			pm.close();	
			
		}
		
		return resp;
	    
	  
	}
	
	
	@RequestMapping(value = "/reset_forget_password/available/{forgetid}", method = RequestMethod.POST)
	public @ResponseBody HashMap<String,String> resetForgetPasswordExpiryCheckup(@PathVariable Long forgetid,HashMap<String,String> map) {
		
		PersistenceManager pm=PMF.get().getPersistenceManager();
		HashMap<String,String> resp=new HashMap<>();
		ForgetPassword forgetrecord=null;
		User user=null;
								
			  try {
				  
				  forgetrecord=pm.getObjectById(ForgetPassword.class,forgetid);
				  if(forgetrecord!=null)
				  resp.put("result", "valid");
				  else
					  resp.put("result", "Invalid"); 
				  				  				  
			} catch (Exception e) {
				
				e.printStackTrace();
			}
			  return resp;
	
	}
	
	@RequestMapping(value = "/reset_forget_password/{forgetid}", method = RequestMethod.PUT)
	public @ResponseBody HashMap<String,String> resetForgetPassword(@PathVariable Long forgetid,@RequestBody HashMap<String,String> map) {
		
		PersistenceManager pm=PMF.get().getPersistenceManager();
		HashMap<String,String> resp=new HashMap<>();
		ForgetPassword forgetrecord=null;
		User user=null;
								
			  try {
				  
				  forgetrecord=pm.getObjectById(ForgetPassword.class,forgetid);
				  if(forgetrecord!=null)
				  {					 						  
					  user=pm.getObjectById(User.class,KeyFactory.stringToKey(forgetrecord.getUserKey()));
					  
					 
				  }
				  if(user!=null)
				  {
					  user.setPassword(map.get("pass"));
					  pm.deletePersistent(forgetrecord);
				  }
				  resp.put("result", "Password_updated");
				  
				  				  				  
			} catch (Exception e) {
				
				e.printStackTrace();
				 resp.put("result", "Password_not_updated");
			}
			  
			  return resp;
	
	}
	
	
	
	
	
	@RequestMapping(value="/signin",method={RequestMethod.POST})  
	 @ResponseBody public HashMap<String, String> signinUser(HttpSession session,@RequestBody HashMap<String, String> map) 
	{				
		
		PersistenceManager pm=PMF.get().getPersistenceManager();
	     Query q=pm.newQuery(User.class);
	     String username,password;
	     username=map.get("email");
	     password=map.get("pass");
	    HashMap<String, String> resultmap=new HashMap<String,String>();
	    
	     System.out.print("welcome");
	     System.out.print(map.get("email") +"" + map.get("pass"));
		    	 
			     try {
			    	 q.setFilter("email== useremail");
					 q.declareParameters("String useremail");
					 List<User> userresult=(List<User>) q.execute(username);
					 q.closeAll();
					 if(!userresult.isEmpty())			 
						for(User user:userresult)
						{
							if(user.getEmail().equals(username) && user.getPassword().equals(password))
							{
								session.setAttribute("user",user.getID());
								System.out.print("Redirected");
								
								resultmap.put("result", "valid");
								return resultmap;																
							}
						}						 					      
					
				} catch (Exception e) {
										
					e.printStackTrace();					
				}finally{
					pm.close();
					q.closeAll();
				}
	     
			     resultmap.put("result", "invalid");
		return resultmap;
	}
	
	
	@RequestMapping(value="/signedup",method={RequestMethod.GET})  
	@ResponseBody public  HashMap<String, String> signedUpCheckup(HttpSession session) throws JSONException, IOException
	{	
		HashMap<String, String> resp=new HashMap<>();
		if (session.getAttribute("user") != null)
		{
			resp.put("result", "signedin");
			resp.put("uid", session.getAttribute("user").toString());
		}
		else 
			resp.put("result", "not_signedin");
		
		return resp;
	}
	
	
	
	@RequestMapping(value="/index",method={RequestMethod.GET})  
	public  String redirect() throws JSONException, IOException
	{				
		return "index";
	}
	
	@RequestMapping(value="/Contact",method={RequestMethod.GET})  
	public  String redirectToApp() throws JSONException, IOException
	{				
		return "Contact";
	}
	
	
	@RequestMapping(value="/main",method={RequestMethod.GET})  
	public  String redirectToMain() throws JSONException
	{		
		LOGGER.info("home page triggered ");		
		return "main";
	}
		
	
	@SuppressWarnings("unchecked")
	@RequestMapping(value="/Users",method={RequestMethod.GET})  
	public @ResponseBody List<EContact> listContacts(HttpSession session) 
	{				
		
		List<EContact> results;   			
		PersistenceManager pm=PMF.get().getPersistenceManager();
		Query q = pm.newQuery(EContact.class);
	
		try {
			
//			q.setFilter("user== userName && deleted==deleteparam");
//			q.declareParameters("String userName,Boolean deleteparam");			
//			 results= (List<EContact>) q.execute(session.getAttribute("user").toString(),null);
			q.setFilter("user== userName");
			q.declareParameters("String userName");			
			 results= (List<EContact>) q.execute(session.getAttribute("user").toString());
			
			if(!results.isEmpty())								
			return results;
			
		} catch (Exception e) {
			
			e.printStackTrace();
			return null;
		}
		finally{
			q.closeAll();
			pm.close();			
		}
		return results;
	}
	
	
	@RequestMapping(value = "/Users", method = RequestMethod.POST)
	public @ResponseBody EContact addContact(@RequestBody EContact s,HttpSession session) throws JSONException {		
		PersistenceManager pm=PMF.get().getPersistenceManager();
		Transaction tx = pm.currentTransaction();
		EContact contact=null;
		if (session.getAttribute("user") != null) {
			s.setUser(session.getAttribute("user").toString());
			
		}

		
		try {
			tx.begin();						
			contact = pm.makePersistent(s);
			tx.commit();
			
			return contact;
			
		} catch (Exception e) {
			
			e.printStackTrace();
			return contact;
			
		} finally {   

			pm.close();
			LOGGER.info("finished");

		}
	}
	
	
	//Modify
	@RequestMapping(value = "/Users/like", method = RequestMethod.GET)
	public @ResponseBody List<EContact> testdisp() throws JSONException {		
		PersistenceManager pm=PMF.get().getPersistenceManager();
		Transaction tx = pm.currentTransaction();
		EContact contact=null;
		
		Query q=pm.newQuery(EContact.class);
		List<EContact> result=null;
		try {
			
			 tx.begin();
			result=(List<EContact>)q.execute();
			
//			for(EContact e:result)
//			{
//				pm.deletePersistent(e);
//				break;
//			}
			
			  tx.commit();
			  
			result.isEmpty();
			
			return result;
			
			
		} catch (Exception e) {
			
			e.printStackTrace();
			return result;
			
		} finally {
			 if (pm != null) {
		           
		            pm.close();
		        }
			
			LOGGER.info("finished");

		}
		
	}
	
	@RequestMapping(value = "/Users/image/{id}", method = RequestMethod.POST)
	public @ResponseBody void addContactImage(@PathVariable Long id, @RequestParam("multiphoto") GMultipartFile multiphoto) throws JSONException {
		
		PersistenceManager pm=PMF.get().getPersistenceManager();
		Transaction tx=pm.currentTransaction();
		
		EContact usercontact=null;
		ContactImage userimg=null;
		
		
		try {
			  tx.begin();
			if(multiphoto != null)
			{
				
				usercontact = pm.getObjectById(EContact.class, id);

				Blob blob_key = new Blob(multiphoto.getBytes());
			
				if (usercontact.getUserimage() == null) {
					userimg = new ContactImage();
					userimg.setPhoto(blob_key);
					usercontact.setUserimage(userimg);
					pm.makePersistent(usercontact);                      //if the child is null , the parent has to be persisted along with the child.
				} else {
					userimg = usercontact.getUserimage();               //if the child is not null, we can update the child directly.
					userimg.setPhoto(blob_key);
					pm.makePersistent(userimg);
				}
			
			}
			tx.commit();
								    			
		} catch (Exception e) {			
			e.printStackTrace();
			
		}
		finally{
			pm.close();
		}
		
	}
	
	
	@RequestMapping(value = "profile/image/{id}",method = RequestMethod.GET)
    public @ResponseBody byte[] showContactImage(@PathVariable Long id) {
		
		PersistenceManager pm=PMF.get().getPersistenceManager();
		
		EContact usercontact=null;
		
		byte[] imgbyte_arry=null;
		
		try {	
			
			if(id>1 && pm.getObjectById(EContact.class,id)!=null)
			{
				usercontact=pm.getObjectById(EContact.class,id);
				ContactImage img=usercontact.getUserimage();
					 if(img!=null)
					 {
							 					 
							 imgbyte_arry= img.getPhoto();	
							 System.out.print("Image Exist");
					 }
					 else
					 {
						 return getDefaultImage();
					 }
			}
			else
			{
			   LOGGER.info("The object is empty");
			   
			   return getDefaultImage();
			}
			 
		} catch (Exception e) {			
			e.printStackTrace();			
		}
		finally{
			pm.close();
		}		        
        return imgbyte_arry;
    }
	
	@RequestMapping(value = "/Users/{id}", method = RequestMethod.GET)
	public @ResponseBody EContact getContact(@PathVariable Long id,HttpSession session) {
		PersistenceManager pm=PMF.get().getPersistenceManager();
		EContact usercontact=null;
		
		try {
			
			
			usercontact=pm.getObjectById(EContact.class, id);
			
			
			if(session.getAttribute("user").toString().equals(usercontact.getUser()))
			    return usercontact; 
			else
			{
				return null;
			}
			 
			
		} catch (Exception e) {
			
			e.printStackTrace();
			
			
			return null;
		}
		finally
		{
			pm.close();
		}
	}
	
	@RequestMapping(value = "/Users/{id}", method = RequestMethod.PUT)
	public @ResponseBody EContact updateContact(@PathVariable Long id,@RequestBody EContact editcontact,HttpSession session) throws JSONException {
		
		PersistenceManager pm=PMF.get().getPersistenceManager();
	
		Transaction tx = pm.currentTransaction();
		
		if(session.getAttribute("user")!=null)
		{
			editcontact.setUser(session.getAttribute("user").toString());
			
		}
            		
		 try {
			 
			
			
			 
			//here we have two transaction because first we are reading a record and then persisting the same record,
			// two operations on the same record while one is being used, so we have to close the first operation to perform second operation. 
			 
			
			 
			 tx.begin();
			 EContact contact=(EContact) pm.getObjectById(EContact.class,id);		
			
			
			 if(contact.getUserimage()!=null)
			 {
				 ContactImage img=contact.getUserimage();				
				 editcontact.setUserimage(img);
			 }	 
			 tx.commit();
			 pm.close();
			 
			 pm=PMF.get().getPersistenceManager();
			 tx=pm.currentTransaction();
			 
			 tx.begin();
			 editcontact=pm.makePersistent(editcontact);			
			 tx.commit();
			
			 
						            
			 return editcontact;
		} catch (Exception e) {
			
			e.printStackTrace();
			
			return null;
		}
		 finally{
			 pm.close();
			 
		 }
	}
	
	
	@SuppressWarnings("null")
	@RequestMapping(value = "/Users/{id}", method = RequestMethod.DELETE)
	public @ResponseBody HashMap<String,String> deleteContact(@PathVariable Long id){
		
		PersistenceManager pm=PMF.get().getPersistenceManager();
		HashMap<String,String> resp=new HashMap<>();
		Transaction tx=pm.currentTransaction();
		try {
			
			
			
			
			
				
			tx.begin();			
			EContact usercontact=pm.getObjectById(EContact.class, id);
			if((usercontact.getUserimage()!=null) ||usercontact!=null)
			{	
			                
				    
				//if we dont use tx then while deleting if some one retrieves the deletion will be stopped;
				
				  
					//pm.deletePersistent(usercontact);
				
				  usercontact.setDeleted(true);
				  pm.makePersistent(usercontact);
					
					
				
			
			}
			
			 tx.commit();
			
			//verifying whether deleted or not
			  
			
			
			
			 			
			
			
			
			
			 resp.put("result","deleted");
		} catch (Exception e) {
			
			e.printStackTrace();
			
		}
		finally{
			
			 
			pm.close();
			 
		}

		return resp;
	}
	
	@RequestMapping(value ="Users/destroy/map", method = RequestMethod.DELETE)
	public @ResponseBody HashMap<String,String> deleteContactMaps(@RequestBody HashMap<String,String[]> map){
		
		PersistenceManager pm=PMF.get().getPersistenceManager();
		
		HashMap<String,String> resp=new HashMap<>();
		
		
		try {
					   
			for(String id:map.get("ids"))
			{
				Transaction tx=pm.currentTransaction();
				tx.begin();
				Maps usercontactdetail=pm.getObjectById(Maps.class, KeyFactory.stringToKey(id));
				if(usercontactdetail!=null)
				{	
				pm.deletePersistent(usercontactdetail);
				
				}
				tx.commit();
			}
			resp.put("result","deleted");
		} catch (Exception e) {
			
			e.printStackTrace();
			
		}
		finally{
			pm.close();
		}

		return resp;
	}
	
	
	@RequestMapping(value="/logout",method={RequestMethod.POST})  
	public  String userLogout(HttpSession session) throws JSONException
	{		
		
		
		session.invalidate();
		
		return "Contact";
	}
	
	
	@RequestMapping(value = "/pushqueue_delete/{id}", method = RequestMethod.POST)
	public @ResponseBody void deleteExpiredSignup(@PathVariable Long id) {
		
		PersistenceManager pm=PMF.get().getPersistenceManager();
		HashMap<String,String> resp=new HashMap<>();
		Signup signupuser;
									
			  try {
				  signupuser=pm.getObjectById(Signup.class,id);
				  if(signupuser!=null)
					  pm.deletePersistent(signupuser);				  
			} catch (Exception e) {				
				e.printStackTrace();
			}	
	}
	
	@RequestMapping(value = "/pushqueue_delete/reset/{id}", method = RequestMethod.POST)
	public @ResponseBody void deleteExpiredForgetPasswod(@PathVariable Long id) {
		
		PersistenceManager pm=PMF.get().getPersistenceManager();
		HashMap<String,String> resp=new HashMap<>();
		ForgetPassword forgetuser;
								
			  try {
				  forgetuser=pm.getObjectById(ForgetPassword.class,id);	 
				  if(forgetuser!=null)
					  pm.deletePersistent(forgetuser);
				  
			} catch (Exception e) {
				
				e.printStackTrace();
			}
	
	}
		
	@RequestMapping(value = "/Users/mailtocontact/{id}", method = RequestMethod.PUT)
	public @ResponseBody  HashMap<String, String> sendMailGAE(@PathVariable Long id,@RequestBody HashMap<String, String> map){		
       SendMail mail=new SendMail();
       PersistenceManager pm=PMF.get().getPersistenceManager();
       HashMap<String, String> resp=new HashMap<String, String>();
     
       resp.put("result", "not sent");
       try {
		EContact contact=pm.getObjectById(EContact.class,id);
  
		   mail.sendMail("arun.balaji@a-cti.com", contact.getEmails().get(0).getValue(), contact.getName(), map.get("subject"), map.get("message"));	
		   LOGGER.info(map.get("subject")+ " " + map.get("message"));
		   resp.put("result", "sent");
		} catch (Exception e) {
			
			e.printStackTrace();
		}
   	return resp;
	}
	
	
	@RequestMapping(value="/reset_password",method={RequestMethod.POST})  
	@ResponseBody public HashMap<String,String>  userResetPassword(@RequestBody Signup newuser) 
	{		
		PersistenceManager pm=PMF.get().getPersistenceManager();
		Query q=pm.newQuery(Signup.class);
		String email;
		HashMap<String,String> resp=new HashMap<>();
		try {
			
			
			q.setFilter("email==useremail");
			q.declareParameters("String useremail");
			List<Signup> signupuser= (List<Signup>) q.execute(newuser.getEmail());
			
			q.closeAll();
			
			q=pm.newQuery(User.class);
			q.setFilter("email==emailparam && password!=passwordparam");
			q.declareParameters("String emailparam,String passwordparam");
			List<User> appuser= (List<User>) q.execute(newuser.getEmail(),null);			

			for(User singleuser:appuser)
				System.out.print(singleuser.getEmail() + " " + singleuser.getPassword());
						
			 
			System.out.print(signupuser.isEmpty() + " " + appuser.isEmpty());
			
			if(signupuser.isEmpty() && appuser.isEmpty())
			{
				email=newuser.getEmail();
				Date startdate=new Date();	    	
				newuser.setCreatedDate(startdate);
				newuser.setExpiredate(new Date(startdate.getTime()+(10*60000)));			  
				newuser=pm.makePersistent(newuser);
				
				resp.put("result","created");
			   
			  

			  String messagecontent="This Link valid for only 10 minutes_"
			  	+ "<a href='http://contactlistbook.appspot.com/#/signup/"+ newuser.getID()+"'>Click Here</a>";
			  
			  Queue queue = QueueFactory.getDefaultQueue();
		        queue.add(withUrl("/pushqueue_delete/"+newuser.getID()).countdownMillis(10*60000).method(Method.POST));
		       
		        SendMail mail=new SendMail();			  
		        mail.sendMail("arun.balaji@a-cti.com", newuser.getEmail(), newuser.getName(), "Email Verification", messagecontent);
		            	     	     
			  System.out.print(newuser.getID());
			     
			  LOGGER.info( messagecontent);
			  
			  LOGGER.info("New user sign up");
			  
			}
			else
			{
				LOGGER.info("User Already Exist");
			}
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		finally{
			pm.close();
		}
	    
	  
	    
	    
	    
	    
		return resp;    //modify
		
	}
	
	public byte[] getDefaultImage(){
		
		byte[] imgbyte_arry=null;
		
		try {
			
			FileInputStream fileInputStream=null;
			 File file = new File("images/default.jpg");			 
			 imgbyte_arry= new byte[(int) file.length()];
				fileInputStream = new FileInputStream(file);
				    fileInputStream.read(imgbyte_arry);
				    fileInputStream.close();
				 System.out.print("Image not Exist");
				 System.out.print(imgbyte_arry);
				 
		} catch (FileNotFoundException e) {
			
			e.printStackTrace();
			
		} catch (IOException e) {
			
			e.printStackTrace();
		}
		
		return imgbyte_arry;
	}
	

	
}
