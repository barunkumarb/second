<%@page import="com.google.appengine.labs.repackaged.org.json.JSONArray"%>
<%@page import="org.mortbay.util.ajax.JSON"%>
<%@page import="com.google.gson.Gson"%>
<%@page import="com.google.appengine.labs.repackaged.org.json.JSONObject"%>
<%@page import="com.google.api.client.json.Json"%>

<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>ContactBook</title>
<link rel="stylesheet" type="text/css" href="css/home.css" />
<link rel="stylesheet" type="text/css" href="css/jquery-ui-1.8.11.custom.css" />
<link rel="stylesheet" type="text/css" href="css/task.css" />
<link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.min.css" />

<script src="js/jquery.min.js"></script>
<script type="text/javascript"  src="js/home.js"></script>
<script src="bootstrap/js/bootstrap.min.js"></script>

 <link href="glDatePicker_files/glDatePicker.default.css" rel="stylesheet" type="text/css"> 
  <link href="glDatePicker_files/glDatePicker.darkneon.css" rel="stylesheet" type="text/css"> 
 
    <script src="glDatePicker_files/glDatePicker.min.js"></script>
    
     <link href="select2/select2.css" rel="stylesheet"/>
    <script src="select2/select2.js"></script>
    
    <script src="js/underscore-min.js"></script>
    <script src="js/backbone-min.js"></script> 
    <script type="text/javascript" src="js/jquery-ui.js"></script> 
    
     <link href="datetime/bootstrap-datetimepicker.min.css" rel="stylesheet"/>
    
    <script type="text/javascript" src="datetime/moment.js"></script>
    <script type="text/javascript" src="datetime/bootstrap-datetimepicker.js"></script>
    <script type="text/javascript" src="datetime/ru.js"></script>
    
     <script type="text/javascript" src="js/datetime.js"> </script> 
   

</head>
<body>
<%@ page import="com.auth.*" %>

	<div id="flash"></div>
		<div id="blockmsg">
		<div class="alert alert-danger" id="message" role="alert"></div>
		</div> 	
		 <div class="container" id="container">
		
</div>
<%
final GoogleAuthHelper helper = new GoogleAuthHelper();
if(session.getAttribute("user")==null)
{                                                                //if user not logged in the signing templates and its objects creations are loaded
	session.setAttribute("state", helper.getStateToken());
}

%>


  
 <script  type="text/template" id="users_signin_template">
	    <div id="signin">
		<div id="middle">
	
				<div id="mtop">
					<h3>Phone Book Sign In</h3>
				</div>
	
				<div id="mgoog">
					<a href="<%= helper.buildLoginUrl()%>"><img src="images/google.png" /></a>
				</div>
				
				<form name="signin" id="signin-user-form">
			 <div id="field">
				<ul>
					<li><input class="tf" type="text" id="email" name="email" placeholder=" Email" /></li>
					<li><input class="tf" type="password" id="pass" name="pass" placeholder=" Password" /></li>															
				</ul>
				<div id="mbottum">
					<input type="submit" name="signin" id="signup_btn"  class="myButton" value="Sign In" />
					<a href="/#/signup"><input type="button" name="signup" id="signup_link" class="myButton" value="Sign Up" /></a>												
				</div>
				<a href="/#/forgetpassword"> I forgot my password</a>	
			 </div>
			</form>
			</div>
		</div>	
    </script>
    
    <script  type="text/template" id="users_forgetpassword_template">
	<div id="setpassword">
	 <div id="middle">

				<div id="mtop">
					<h3> EMail-Id</h3>
				</div>
				
			<form name="Email" id="forget-password-form">
			 <div id="field">
				<ul>                    
					<li><input class="tf" type="text" id="email" name="email" placeholder="Email" /></li>																	
				</ul>
				<div id="mbottum">										
					<input type="submit" name="setpass" id="setpass"  class="myButton" value="Submit" />					
				</div>
			 </div>
			</form>
		</div>
		</div>
	</script>
    
    
 <script  type="text/template" id="users_signup_template">
	<div id="signup">
	 <div id="middle">

			<div id="mtop">
				<h3>Phone Book Sign Up</h3>
			</div>

			
			<form name="signup" id="signup-user-form">
			 <div id="field">
				<ul>
					<li><input class="tf" type="text" id="email" name="email" placeholder=" Email" /></li>
					<li><input class="tf" type="text" id="name" name="name" placeholder=" Name" /></li>
					<li><input class="tf" type="text" id="number" name="number" placeholder=" Mobile Number" /></li>
					<li><input class="tf" type="text" id="address" name="address" placeholder=" Address" /></li>										
				</ul>
				<div id="mbottum">
					
					<a href="/#/"><input type="button" name="signin" id="signin_link" class="myButton" value="Sign In" /></a>
					<input type="submit" name="signup" id="signin_btn"  class="myButton" value="Sign Up" />					
				</div>
			 </div>
			</form>
		</div>
		</div>
</script>
	
	
<script  type="text/template" id="users_setpassword_template">
	<div id="setpassword">
	 <div id="middle">

			<div id="mtop">
				<h3>Set Password</h3>
			</div>

			
			<form name="password" id="password-user-form">
			 <div id="field">
				<ul>
                     <\%if(user){%>
					<li><input class="tf" type="hidden" id="id" value="<\%= user%>" name="id"/></li>
                     <\% }%> 
					<li><input class="tf" type="password" id="upass" name="pass" placeholder=" Password" /></li>
					<li><input class="tf" type="password" id="ucpass" name="cpass" placeholder=" Confirm Password" /></li>															
				</ul>
				<div id="mbottum">
					
					
					<input type="submit" name="setpass" id="setpass"  class="myButton" value="Submit" />					
				</div>
			 </div>
			</form>
		</div>
	</div>
</script>

<script  type="text/template" id="users_reset_forget_password_template">
	<div id="setpassword">
	 <div id="middle">

			<div id="mtop">
				<h3>Set Password</h3>
			</div>

			
			<form name="password" id="reset-forget-password-user-form">
			 <div id="field">
				<ul>                     
					<li><input class="tf" type="hidden" id="id" value="<\%= user%>" name="id"/></li>
					<li><input class="tf" type="password" id="upass" name="pass" placeholder=" Password" /></li>
					<li><input class="tf" type="password" id="ucpass" name="cpass" placeholder=" Confirm Password" /></li>															
				</ul>
				<div id="mbottum">
					
					
					<input type="submit" name="setpass" id="setpass"  class="myButton" value="Submit" />					
				</div>
			 </div>
			</form>
		</div>
	</div>
</script>



<script  type="text/template" id="users_setpassword_expired_template">
	<div id="setpassword">
	 <div id="middle">

			<div id="mtop">
				<h3>Set Password Link expired</h3>
			</div>
						
		</div>
	</div>
</script>


<script  type="text/template" id="users_template">
	<div id="header">
		
		<ul class="nav nav-pills user">
			 <li class=" dropdown">
                <a class="dropdown-toggle" id="drop5" role="button" data-toggle="dropdown" href="#">User<b class="caret"></b></a>
                <ul id="menu3" class="dropdown-menu" role="menu" aria-labelledby="drop5">
                  <li role="presentation"><a role="menuitem" tabindex="-1" href="#/reset">ResetPassword</a></li>
                  <li role="presentation" class="divider"></li>
                  <li role="presentation"><a role="menuitem" tabindex="-1" href="#/log">Logout</a></li>
                </ul>
            </li>
		</ul>  			
	</div>
					
				<ul class="nav nav-tabs">
							  <li id="phonebooktab" class="active" ><a href="#phonebook" data-toggle="tab">PhoneBook</a></li>
							  <li id="tasktab"><a href="#task" data-toggle="tab">Task</a></li>
							  <li id="teamtasktab"><a href="#teamtask" data-toggle="tab">TeamTask</a></li>
							   							 
				</ul>
 
				<div class="tab-content">
								  <div class="tab-pane active" id="phonebook">

										<div id="mainpage">
											<a href="#/new" class="btn btn-primary">New</a>			
											<hr/>
											<table class="table striped">
												<thead><tr>
														<th>Profile</th>					
														<th>Name</th>
														<th>Email-Id</th>
														<th>Mobile Number</th>
														<th>Address</th>
													</tr>
												</thead>
												<tbody>		
												<\% _.each(us.where({deleted: false}),function(user){%>
													<tr>
													<td><img class="Profile Picture" src="<\%= user? '/profile/image/'+user.get('id') + '?' + Math.random() : '' %>" style="width:50px; height:50px" /></td>
													<td><\%= user.get('name')%></td>
													<td><\% if(user.get('emails')!==null && user.get('emails').length!==0){%>
													<a href="/#/sendmail/<\%= user.get('emails')[0].value %>/<\%= user.get('id')%>">
														<img class="mailimg" src="images/Mail.png"/>
													</a>
													<\%= (user.get('emails')[0].value + ' + [ ' + (user.get('emails').length-1) + ' ]') %>
													<\% } %>		
													</td>					
													<td><\%=  user.get('numbers')!==null && user.get('numbers').length!==0 ?(user.get('numbers')[0].value + ' + [ ' + (user.get('numbers').length-1) + ' ]') : '' %></td>
													<td><\%= user.get('address')%></td>
													<td><a href="#/edit/<\%= user.get('id') %>" class="btn btn-default" >Edit</a></td>
													<td><a href="#/delete/<\%= user.get('id') %>" class="btn btn-default" >Delete</a></td>
													</tr>					     
												<\%});%>
												</tbody>
											</table>
										</div>						
									</div>


								  <div class="tab-pane" id="task"></div>
								  <div class="tab-pane" id="teamtask"></div>									 
						</div>	
 		       
		</script>
		
		<script type="text/template" id="users_taskview_template">
									<div id="task-creation" >
									   <form id="task-form" name="taskform" >	

											<div class="dropdown">
											 <button class="btn btn-default dropdown-toggle " type="button" id="dropdownTask" data-toggle="dropdown" aria-expanded="true">
													Task												
												<span class="caret"></span>
											  </button>
											  <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
												<li class="taskrole" role="presentation"><a role="menuitem" tabindex="-1">Call</a></li>
												<li class="taskrole" role="presentation"><a role="menuitem" tabindex="-1">Email</a></li>
												<li class="taskrole" role="presentation"><a role="menuitem" tabindex="-1">Todo</a></li>												
											  </ul>	
                                            </div>																															
                                       <input type="hidden" class="contactid" id="contactid" style="width: 300px; height: 34px; float:left;margin: 0px 10px;" />
										<input type="hidden" id="mapid" style="width: 300px; height: 34px; float:left;margin: 0px 10px;" />
										<input type="text" class="form-control" id="to" style="width: 300px; height: 34px; float:left;margin: 0px 10px;" />

						<div class='input-group date' id='duedate'>
                                    <input type='text' id="duedate-text" class="form-control" data-date-format="MM/DD/YYYY hh:mm A" />
                                    <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                                    </span>
                        </div>	


                        
						<input type="hidden" id="taskid" value="" />

						<input type="submit" id="savetask" class="btn btn-primary" value="Create" />							
                    </form> 
				 </div>
          
     	  </div>
				
                <div id="filter-ds">
						    <div class="row">							 
                              <div class="col-md-2"><label>	Filters:</label> </div>
                              <div class="col-md-1">
                                  <input type="checkbox" data="Email" name="email-check" class="flt-check"><label>Emails</label>
                                </div>
                              <div class="col-md-1">
                                  <input type="checkbox" data="Call" name="call-check" class="flt-check"><label>Calls</label>
                              </div>
                              <div class="col-md-1">
                                    <input type="checkbox" data="Todo" name="todo-check" class="flt-check"><label>Todo's</label>
                              </div>    
                              <div class="col-md-3">
                                    <input type="text"  id="search-task" name="search-task" class="form-control" placeholder="Search"/>
                              </div>
							<div class="col-md-3">
                                    <input type="button"  id="all-tasks" name="all-tasks" value="All Tasks" class="btn btn-primary" placeholder="Search"/>
									 <input type="hidden"  id="sortreverse" class="form-control" />	
                              </div>                            
                			</div>   
				</div> 
				<div id="Date-filter">
					<input type="text" id="filterdate" placeholder="Tasks By Date" gldp-id="mydate" class="form-control" />
						<div id="calendarfilter" gldp-el="mydate" style="width:250px; height:200px; position: inherit;">
						</div>
                </div> 
                 
				<div id="subtask" class="contactsubtask"></div>                                         		
		</script>  
		
						
		<script type="text/template" id="users_tasksubview_template">
			
                  <\% var totaltask= tasks.length;  
					  var totaltodo=tasks.where({task: "Todo" }).length;
					  var totalcall=tasks.where({task: "Call" }).length;
					  var totaleamil=tasks.where({task: "Email" }).length;			
					 %>
          
					<div id="statuscount">
						 	<div class="row">							 
                              <div class="col-md-3"><label>Total Tasks :</label> <\%= totaltask %></div>
                              <div class="col-md-2"><label>Todo's :</label> <\%= totaltodo %></div>
                              <div class="col-md-2"><label>Call's :</label> <\%= totalcall %></div>
                              <div class="col-md-2"><label>Email's :</label> <\%= totaleamil %></div>                              
                			</div>
                    </div>    
                                   



                 <div id="taskview">
					
						<table class="table striped" id="tasks-table">
												<thead><tr>
														<th id="stask" class="sorthead"  data="task">Task</th>					
														<th class="sorthead" data="description">Description</th>
														<th class="sorthead" data="duedate">DueDate</th>
														<th class="sorthead" data="createddate">CreatedOn</th>
														<th class="sorthead" data="status">Status</th>
														<th >Edit</th>
														<th >Completed</th>
													</tr>
												</thead>
												<tbody>		
												<\% _.each(tasks.models,function(task){%>
													<tr>											
													<td><\%= task.get('task') %></td>													
													<td><\%= task.get('description') %> </td>
													<td><\%= new Date(task.get("duedate")).format("dd-mmm-yy HH:MM") %></td>
													<td><\%= new Date(task.get("createddate")).format("dd-mmm-yy HH:MM") %></td>
													<td><\%= task.get('status') %></td>
													<td><span class="glyphicon glyphicon-pencil tskedit" data="<\%= task.get('id') %>" aria-hidden="true"></span></td>																											
													<td><span class="glyphicon glyphicon-refresh tskstate" data="<\%= task.get('id') %>" aria-hidden="true"></span></td>
													</tr>					     
												<\%});%>

												<\% if(tasks.models.length===0){ %>
													<tr><td colspan="7" style="text-align: center;">No Tasks Found</td></tr>
												<\% }; %>
                                                     

												</tbody>
											</table>
                 


		</script>
		
		
		<script type="text/template" id="team_taskview_template">
									<div id="task-creation" >
									   <form id="task-form" name="taskform" >	

											<div class="dropdown">
											 <button class="btn btn-default dropdown-toggle " type="button" id="dropdownTask" data-toggle="dropdown" aria-expanded="true">
													Task												
												<span class="caret"></span>
											  </button>
											  <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
												<li class="taskrole" role="presentation"><a role="menuitem" tabindex="-1">Call</a></li>
												<li class="taskrole" role="presentation"><a role="menuitem" tabindex="-1">Email</a></li>
												<li class="taskrole" role="presentation"><a role="menuitem" tabindex="-1">Todo</a></li>												
											  </ul>	
                                            </div>																															
                                       <input type="hidden" class="userid" id="userid" style="width: 300px; height: 34px; float:left;margin: 0px 10px;" />
										<input type="hidden" id="withids" style="width: 300px; height: 34px; float:left;margin: 0px 10px;" />
										<input type="text" class="form-control" id="to" style="width: 300px; height: 34px; float:left;margin: 0px 10px;" />

						<div class='input-group date' id='duedate'>
                                    <input type='text' id="duedate-text" class="form-control" data-date-format="MM/DD/YYYY hh:mm A" />
                                    <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                                   </span>
                        </div>	


                        
						<input type="hidden" id="taskid" value="" />

						<input type="submit" id="savetask" class="btn btn-primary" value="Create" />							
                    </form> 
				 </div>
          
     	  </div>
				
                <div id="filter-ds">
						    <div class="row">							 
                              <div class="col-md-2"><label>	Filters:</label> </div>
                              <div class="col-md-1">
                                  <input type="checkbox" data="Email" name="email-check" class="flt-check"><label>Emails</label>
                                </div>
                              <div class="col-md-1">
                                  <input type="checkbox" data="Call" name="call-check" class="flt-check"><label>Calls</label>
                              </div>
                              <div class="col-md-1">
                                    <input type="checkbox" data="Todo" name="todo-check" class="flt-check"><label>Todo's</label>
                              </div>    
                              <div class="col-md-3">
                                    <input type="text"  id="search-task" name="search-task" class="form-control" placeholder="Search"/>
                              </div>
							<div class="col-md-3">
                                    <input type="button"  id="all-tasks" name="all-tasks" value="All Tasks" class="btn btn-primary" placeholder="Search"/>
									 <input type="hidden"  id="sortreverse" class="form-control" />	
                              </div>                            
                			</div>   
				</div> 
				
                 
				<div id="subtask" class="teamsubtask"></div>                                         		
		</script>  
		
<!-- 		<div id="Date-filter"> -->
<!-- 					<input type="text" id="filterdate" placeholder="Tasks By Date" gldp-id="mydate" class="form-control" /> -->
<!-- 						<div id="calendarfilter" gldp-el="mydate" style="width:250px; height:200px; position: inherit;"> -->
<!-- 						</div> -->
<!--                 </div>  -->
		
		<script type="text/template" id="team_tasksubview_template">
			
                  <\% var totaltask= tasks.length;  
					  var totaltodo=tasks.where({task: "Todo" }).length;
					  var totalcall=tasks.where({task: "Call" }).length;
					  var totaleamil=tasks.where({task: "Email" }).length;			
					 %>
          
					<div id="statuscount">
						 	<div class="row">							 
                              <div class="col-md-3"><label>Total Tasks :</label> <\%= totaltask %></div>
                              <div class="col-md-2"><label>Todo's :</label> <\%= totaltodo %></div>
                              <div class="col-md-2"><label>Call's :</label> <\%= totalcall %></div>
                              <div class="col-md-2"><label>Email's :</label> <\%= totaleamil %></div>                              
                			</div>
                    </div>    
                                   



                 <div id="taskview">
					
						<table class="table striped" id="tasks-table">
												<thead><tr>
														<th id="stask" class="sorthead"  data="task">Task</th>					
														<th class="sorthead" data="description">Description</th>
														<th class="sorthead" data="duedate">DueDate</th>
														<th class="sorthead" data="createddate">CreatedOn</th>
														<th >Status</th>
														<th >Edit</th>
														<th >Completed</th>
													</tr>
												</thead>
												<tbody>		
												<\% _.each(tasks.models,function(task){%>
													<tr>											
													<td><\%= task.get('task') %></td>													
													<td><\%= task.get('description') %> </td>
													<td><\%= new Date(task.get("duedate")).format("dd-mmm-yy HH:MM") %></td>
													<td><\%= new Date(task.get("createddate")).format("dd-mmm-yy HH:MM") %></td>
													<td><\%= task.get('status') %></td>
													<td><span class="glyphicon glyphicon-pencil tskedit" data="<\%= task.get('id') %>" aria-hidden="true"></span></td>																											
													<td><span class="glyphicon glyphicon-refresh tskstate" data="<\%= task.get('id') %>" aria-hidden="true"></span></td>
													</tr>					     
												<\%});%>

												<\% if(tasks.models.length===0){ %>
													<tr><td colspan="7" style="text-align: center;">No Tasks Found</td></tr>
												<\% }; %>
                                                     

												</tbody>
											</table>
                 


		</script>
				
		
	<script type="text/template" id="edit_users_template">

	
	<form id="fieldcontent" name="userform" class="edit-user-form" enctype="multipart/form-data">

      <legend><\%= user ? 'Update' : 'New' %> User</legend>
   
	<div id="left">
        <label>Name</label>
        <input name="name" id="name" type="text" class="form-control" value="<\%= user ? user.get('name') : '' %>" />
         
        <div id="email_container">
		  <label>Email  </label><span id="add_eamil" class="glyphicon glyphicon-plus" aria-hidden="true"></span>
			  <\% if(user &&  user.get("emails")!==null && user.get("emails").length!==0){ %>
					<\% _.each(user.get("emails"),function(email){%>
						  <div class="email-attr">
							<\% if(email){ %> <input type="hidden" name="classid" value="<\%= email.id %>" /> <\% } %>
						  <input type="text" class="form-control keys " placeholder="Type" name="key" value="<\%= email ? email.key : '' %>" />
						  <input name="email"  type="text" class="form-control email " value="<\%= email ? email.value : '' %>"  />
						<span class="glyphicon glyphicon-trash remove" aria-hidden="true"></span>		 
						  </div>
				   <\% }); %>
			 <\% } else{ %>
               
				<div class="email-attr">
					<input type="text" class="form-control keys " placeholder="Type" name="key" value="" />
					<input name="email"  type="text" class="form-control email " value="" />
					<span class="glyphicon glyphicon-trash remove" aria-hidden="true"></span>
				</div>

			<\% } ;%>
        </div> 

		<div id="number_container">
			  <label>Contact Number</label><span id="add_number" class="glyphicon glyphicon-plus" aria-hidden="true"></span> 
         <\% if(user && user.get("numbers")!==null && user.get("numbers").length!==0){ %>     
					<\% _.each(user.get("numbers"),function(number){%>
							  <div class="number-attr">
								<\% if(number){ %> <input type="hidden"  name="classid" value="<\%= number.id %>" /> <\% } %>
							  <input type="text" class="form-control keys " name="key" placeholder="Type" value="<\%= number ? number.key : '' %>" />
							  <input name="number"  type="text" class="form-control number " value="<\%= number ? number.value : '' %>"  />
							  <span class="glyphicon glyphicon-trash remove" aria-hidden="true"></span>		 
							  </div>
				   <\% }); %>
			   <\% } else{ %>
					   
				<div class="number-attr">
					<input type="text" class="form-control keys " placeholder="Type" name="key" value="" />
					<input name="number"  type="text" class="form-control number " value=""  />
					<span class="glyphicon glyphicon-trash remove" aria-hidden="true"></span>
				  </div>
				

			<\% }; %>
        </div> 
		
		<label>Address</label>
        <input name="address" id="address" type="text" class="form-control" value="<\%= user ? user.get('address') : '' %>" />


           
	</div>
   <div id="right">
        <img id="profile" src="<\%= user ? '/profile/image/'+user.get('id') + '?' + Math.random() : '/profile/image/'+ Math.random() %>" style="width:100px; height:100px" />

        <input name="multiphoto" id="multiphoto" value="Insert" type="file" accept="image/gif, image/jpeg, image/png" />
   </div>

	<div id="foot">
       
 		<button type="submit" class="btn"><\%= user ? 'Update': 'Create' %></button>  
		<input name="delete" id="cancel" type="button" value="Cancel" class="btn" />
		<\% if(user) { %>
          <input name="classid" id="classid" type="hidden" class="contactid" value="<\%= user.get('id') %>"  />		 
      <\% }; %>
    </div>

	</form>

</script>

<script type="text/template" id="edit_users_email_template">
   <div class="email-attr">
	<input type="text" class="form-control keys " placeholder="Type" name="key" value="" />
	<input name="email"  type="text" class="form-control email " value=""  />
	<span class="glyphicon glyphicon-trash remove" aria-hidden="true"></span>
   </div>
</script>

<script type="text/template" id="edit_users_number_template">
   <div class="number-attr">
	<input type="text" class="form-control keys " placeholder="Type" name="key" value="" />
	<input name="number"  type="text" class="form-control number " value=""  />
	<span class="glyphicon glyphicon-trash remove" aria-hidden="true"></span>
   </div>
</script>




<script  type="text/template" id="users_sendmail_template">
   <div id="flstrigger" data-toggle="modal" data-target="#myModal"></div>   
	    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" id="close" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span " class="sr-only">Close</span></button>
        <h4 class="modal-title" id="myModalLabel">To : <\%= mail%> </h4>
      </div>
      <form name="mail_form" id="mail_form">  
      <div class="modal-body">
         <input name="id" id="id" type="hidden" class="form-control" value="<\%= id%>"/>
        <input name="subject" id="subject" type="text" class="form-control" value="" placeholder="Subject"/>
        <textarea name="message"  placeholder="Mail Content" id="mailmessage" rows="4" cols="50" class="form-control"></textarea>
        
      </div>
      <div class="modal-footer">
        <button type="button" id="cancel_mail" class="btn btn-default" data-dismiss="modal">Cancel</button>
        <button type="button" id="sendmail" class="btn btn-primary">Send Mail</button>
      </div>
	</form>
    </div>
  </div>
 </div>
</script>
		
	
  

 <script src="js/contactapp.js"></script>  
 
    

</body>
</html>