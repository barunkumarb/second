package com.book;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.appengine.api.datastore.KeyFactory;

@Controller
@RequestMapping("/Team")
public class TeamTaskController {

	
	@RequestMapping(value="/TeamMembers",method=RequestMethod.GET)
	@ResponseBody public List<QueryUser> listTeam(){
		PersistenceManager pm=PMF.get().getPersistenceManager();
		List<QueryUser> result=null;
		try {
			
			Query q=pm.newQuery("SELECT id,email,name,number FROM " + User.class.getName());
			q.setResultClass(QueryUser.class);
			result=(List<QueryUser>)q.execute();
			
			
			
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		finally{
			pm.close();
		}
		
		return result;		
	}
	
	
	
	
	@RequestMapping(value="/TeamTasks",method=RequestMethod.POST)
	@ResponseBody public TeamTask addTask(@RequestBody TeamTask newtask,HttpSession session){
		PersistenceManager pm=PMF.get().getPersistenceManager();
		
		try {
			
			
			
			if(newtask.getStatus()==null)
				newtask.setStatus("Pending");
			newtask.setFrom(session.getAttribute("user").toString());
			newtask.setStatus("Pending");
			newtask.setComment("Not Started");
			newtask=pm.makePersistent(newtask);
			
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		finally{
			pm.close();
		}
		
		return newtask;		
	}
	
	
	@RequestMapping(value="/TeamTasks/{id}",method=RequestMethod.PUT)
	@ResponseBody public Task updateTask(@PathVariable String id,@RequestBody Task newtask,HttpSession session){
		PersistenceManager pm=PMF.get().getPersistenceManager();
		
		try {
			
			
			if(newtask.getStatus()==null)
				newtask.setStatus("Pending");
			newtask.setUser(session.getAttribute("user").toString());
			
			Task oldtask=pm.getObjectById(Task.class,KeyFactory.stringToKey(id));
			
			newtask.setCreateddate(oldtask.getCreateddate());
			
			newtask=pm.makePersistent(newtask);
			
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		finally{
			pm.close();
		}
		
		
		return newtask;		
	}
	
	
	@RequestMapping(value="/TeamTasks",method=RequestMethod.GET)
	@ResponseBody public List<TeamTask> getTasks(HttpSession session){
		PersistenceManager pm=PMF.get().getPersistenceManager();
		Query q=null;
		List<TeamTask> tasks=null;
		
		try {
			
			 
			// q=pm.newQuery(TeamTask.class,":p.contains(to)");
			
			q=pm.newQuery(TeamTask.class);
			q.setFilter(":p.contains(to)");
			 q.setFilter("from==usernameparam");
			 q.declareParameters("String usernameparam");
			 
			 tasks=(List<TeamTask>)q.execute(Arrays.asList("ag9jb250YWN0bGlzdGJvb2tyEQsSBFVzZXIYgICAgICgrQkM","pass"),session.getAttribute("user").toString());
			
			 
			 
			 if(!tasks.isEmpty())
				 System.out.println("Collected");
			 return tasks;
			
			
		} catch (Exception e) {
			
			e.printStackTrace();
			return null;
		}
		finally{
			q.closeAll();
			pm.close();
		}
		
		
				
	}
	
	@RequestMapping(value="/cron/team_reminder",method={RequestMethod.POST,RequestMethod.GET})
	@ResponseBody public void remindUserContacts(){
		PersistenceManager pm=PMF.get().getPersistenceManager();
		Query q=null;
		String messagecontent;
		Date start=new Date();
		Date end=new Date(start.getTime()+ 24*60*60000);
		
		try {
			q=pm.newQuery(Task.class);
			q.setFilter("duedate< enddateparam && duedate>startdateparam");
			q.declareParameters("java.util.Date enddateparam,java.util.Date startdateparam");
   
			System.out.println("Triggered");
			List<Task> result=(List<Task>)q.execute(end,start);
			System.out.println(result.size());
			User u;
			for(Task task:result){
				
				
				u=(User) pm.getObjectById(User.class,KeyFactory.stringToKey(task.getUser()));
				
				SendMail mail=new SendMail();			  
				messagecontent= "Today You have task to :" + task.getTask();
			    mail.sendMail("arun.balaji@a-cti.com",u.getEmail(), "", "Task Reminder", messagecontent);									
				
			}
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		finally{
			q.closeAll();
			pm.close();
			     
		}
		
		

		
	}
	
	
}
