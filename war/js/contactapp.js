//$("document").ready(function(){

$.fn.serializeObject = function() {
        var o = {};
       
        var a = this.serializeArray();
        
//        console.log(this);
//        console.log(JSON.stringify(a));
//        alert("wait");  
        
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
      };
    
      function validateAllfields(evid)
      {
    	 window.tas=evid;    	    	
    	 evid="#" + evid;
    	  result=true;
    	  
    	
    	  
        	$(evid+' input:text, '+ evid +' input:password, '+ evid +' input:hidden').each(function(){
        		
        	
        		if(this.name==="number" && (this.value.length<10 || this.value.length>12))
        			{
        			    $(this).addClass("empty");
        			    $(this).focus(function(){$(this).removeClass("empty")});
        				result=false;        				
        			}
        		if(this.name==="email" && (this.value.length < 1 || this.value.indexOf("@")<1 || (this.value.lastIndexOf(".")+4)<this.value.length || (this.value.lastIndexOf(".")+3)>this.value.length) )        			
        			{
	        			$(this).addClass("empty");
	        			$(this).focus(function(){$(this).removeClass("empty")});  
	        			result=false;
        			}
        		
        		if(this.value==="")
        			{
	        			$(this).addClass("empty");
	        			$(this).focus(function(){$(this).removeClass("empty")});
	        			result=false;
        			} 
        	
        	});
    	 
        	 
    	 
    	  return result;
      }
    
      function getallFormData(ev)
      {
      	 window.formdetails=new Object();
      	      	
      	var evid="#" +ev.currentTarget.id;
      	      	
      	$(evid+' input:text, '+ evid +' input:password, '+ evid +' input:hidden').each(function(){
      		
      		formdetails[this.name]=this.value; 
      		
      	});
      	
      
      	return formdetails;
      }
      
      mapremovearr=new Array();
      
      function destroyMaps()
      {    	   
    	  if(mapremovearr.length>0)
    		  {
    		         
    		         console.log(mapremovearr);    		       
    		         
    		         samplevar= {'ids' : mapremovearr}
		    		  urlpost="Users/destroy/map/";
		    				$.ajax({
		    					beforeSend : function(xhr) {
		    						xhr.setRequestHeader("Accept", "application/json");
		    						xhr.setRequestHeader("Content-Type", "application/json");
		    					},
		    					type:'DELETE',
		    					url : urlpost,
		    					data: JSON.stringify(samplevar),
		    					contentType: false,
 				 			    processData: false,
		    					success: function(resp){
		    						
		    						if(resp.result==="deleted")																								
		    							console.log("deleted maps")	    						
		    					},
		    					 error:function(data,status,er) {
			 				 	    	console.log("error: " + JSON.stringify(data) + " status: " + JSON.stringify(status) + " er:" + JSON.stringify(er));
			 				 	} 
		    					
		    				});
    		             		      
		    	      	
    		         
		    	    	  mapremovearr=[];
    		  }
    	  
      
      }
      
      var uid;
      
      function verifySignedin()
      {
    	  var result;
    	  urlpost="/signedup";
			$.ajax({
				type: "GET",
				url : urlpost,
				async: false,
				success:function(resp){
					if(resp.result==="signedin")
						{
						    uid=resp.uid;
							result=true;
						}
					else
						result=false;					
				}
			});		
			
		
			return result;
      }
      

		   
		    
		    var UserSignIn=Backbone.Model.extend({
		        urlRoot: '/signin'		      		  	
		  });
		    
		    var UserSignUpAvailablity=Backbone.Model.extend({
		        urlRoot: '/signup/available'		      		  	
		  });
		    
		    
		    var UserSignUp=Backbone.Model.extend({
		        urlRoot: '/signup'		      		  	
		  });
    		  
		    var SetUserPassword=Backbone.Model.extend({
		        urlRoot: '/signin_password'		      		  	
		  });
		    
		    var ForgetUserPassword=Backbone.Model.extend({
		        urlRoot: '/forget_password'		      		  	
		  });
		    
		    var ResetForgetPassword=Backbone.Model.extend({
		        urlRoot: '/reset_forget_password'		      		  	
		  });
		    
		    var User=Backbone.Model.extend({
		          urlRoot: '/Users'              	
		    });
		    
		    var MailToContact=Backbone.Model.extend({
		    	 urlRoot: '/Users/mailtocontact'    	
		    	
		    });
		    
		    var UserTask=Backbone.Model.extend({
		    	 urlRoot: '/Tasks'    	
		    	
		    });
		    
		    var TeamTask=Backbone.Model.extend({
		    	urlRoot: '/Team/TeamTasks'
		    });
		    
		    var TeamMembers=Backbone.Collection.extend({
		    	
		    	url: '/Team/TeamMembers',
		    	filterById: function(idArray) {
		    		
		    		var filtered=new Array();
		    		_.each(idArray,function(idelement){
		    				    			
		    				    			filtered.push(teammembers.where({id : idelement})[0]);
		    				    		});
		    		return new TeamMembers(filtered);
		    		    
		    	}
		    });
		    		    
		      
		    var Users=Backbone.Collection.extend({
		          url: '/Users'    	
		    });
		    
		    var Tasks=Backbone.Collection.extend({
		          url			: '/Tasks',
		          
		          sortVar 		: 'duedate',
//		          comparator	: function( collection ){
//		        	  
//		              var that = this;
//		              return( collection.get( that.sortVar ) );
//		              
//		           },
		          byDate		: function(curdate) {
		          
		        	  console.log("entered");
		        	  	var cur=new Date(curdate).format("dd-mmm-yy");		        	  	
				         var filtered = this.filter(function(task) {
				              var due=new Date(task.get("duedate")).format("dd-mmm-yy");
				           
				           return due==cur;
				           });	
				          
				         
				          return new Tasks(filtered);
				          
		          },
		          byTask		:function(tasknames,sortingorder,order){
		        	  
		        	 
		        	    if(tasknames.length!==0){	
		        	    	filtered = this.filter(function(task) {
					              
			        			var taskfield=task.get('task');
			        		    for(i in filterary){
			        		    	
			        		    	if(filterary[i]===taskfield){
			        		    		return true;
			        		    	break;
			        		    	}
			        		    }
			        			        		
				           return false;
				           });
		        	    	
		        	    	filtered=new Tasks(filtered);
		        	    }
		        	    else
		        	    	filtered=this;
		        	    
		        	    
		        	    //filters over
		        	    if(sortingorder){		        	    	
		        	    	filtered=filtered.sortBy(sortingorder);
		        	    	
		        	    	
		        	    	
		        	    	if(order=="reverse")
		        	    		filtered=filtered.reverse();
		        	    		
		        	    		
		        	    		filtered=new Tasks(filtered);
		        	    }
		        	    	
		        	  
			        	return filtered;
		          },
		          byText	:function(searchtxt){
		        	    
		        	  
		        	   var filtered=this.filter(function(task){
		        		   
		        		 return  _.any(task.attributes, function(val, attrname) { //any checkes until true reaches
		        		     
		        			     if(attrname.indexOf("date")!==-1)
		        			    	 val=new Date(val).format("dd-mmm-yy");
		        			     if(!isNaN(val))
		        			    	 val=val.toString();
		        			     
		        			     val=val.toLowerCase();
		        			 
		        		        return (val.indexOf(searchtxt)!==-1);
		        		    });;
		        		   
		        		   
		        		   
		        		   
		        		   
		        	   });
		        	   
		        	   return new Tasks(filtered);
		        	  
		          }
		    });
		    
		    var TeamTasks=Backbone.Collection.extend({
		    	url: "/Team/TeamTasks"
		    });
		    
		    
		    var SignInView=Backbone.View.extend({
		    	el: "#container",		    	
		    	render:function(){
							    		if(verifySignedin()===true)
										{		    					
										router.navigate("contact",{trigger:true});										
										return false;
										}
					    		
		    					var temp=_.template($("#users_signin_template").html());		 						
		    					this.$el.html(temp);		                     						 				 											 				 					    		
		    	},
		    	events:{
		    		"submit #signin-user-form": "signinUser"		    		
		    	},
		    	signinUser:function(ev){
		    		
		    		
		    		if(!validateAllfields(ev.currentTarget.id))
		    			{
		    			
		    			$("#message").html("Fill Email and Password");
   					    $("#message").fadeIn(3000).delay(1000).fadeOut("slow");
		    			   return false;
		    			}
		    		user_signin_details=$(ev.currentTarget).serializeObject();//getallFormData(ev);
		    		
		    		
		    		var usersignin=new UserSignIn();
		    		
		    		usersignin.save(user_signin_details,{
		    			success:function(resp){		    				
		    				 if(resp.get("result")==="valid")
		    					 {
		    					 
		    					 
		    					 
				    					 users.fetch({
				    							success : function(users) {																 
				    									console.log("fetched");	
				    									router.navigate('contact',{trigger:true});
				    							},
				    							error: function(data, status, er) {
				    								console.log("error: " + JSON.stringify(data) + " status: " + JSON.stringify(status) + " er:" + JSON.stringify(er));
				    							}
				    							
				    						});				    				    					 
		    					 
		    					 }
		    				 else
	    					 {
		    					 $("#message").html("UserName or password Error");
		    					 $("#message").fadeIn(3000).delay(1000).fadeOut("slow");		    						    					
	    					 }
		    			},
		    			error:function(data,status,er) {
			 					console.log("error");			 								    				
			 				}
		    		});
		    		return false;
		    	}		    			    	
		    });
		    
		    var SignUpView=Backbone.View.extend({
		    	el: "#container",		    	
		    	render:function(){
		    		
		    					if(verifySignedin()===true)
		    						{		    					
		    						router.navigate("contact",{trigger:true});		    						
		    						return ;
		    						}
		    					
		    					var temp=_.template($("#users_signup_template").html());		    					
		    					this.$el.html(temp);		                     						 				 											 				 					    		
		    	},
		    	events:{
		    		"submit #signup-user-form": "signupUser",
		    		'blur #signup-user-form #email' : 'checkavailable'
		    	},
		    	signupUser:function(ev){
		    		
		    		if(!validateAllfields(ev.currentTarget.id))
	    			{
	    			$("#message").html("Fill All Fields with Correct Values");
					    $("#message").fadeIn(3000).delay(1000).fadeOut("slow");
	    			   return false;
	    			}
		    		
		    		
		    		user_signup_details=$(ev.currentTarget).serializeObject();//getallFormData(ev);		    	
		    		
		    		var usersignup=new UserSignUp();
		    		
		    		usersignup.save(user_signup_details,{
		    			success:function(resp){
		    				
		    				if(resp.get("result")==="created")		    		    		
		    					$("#message").html("Verification Mial Sent to you");
		    				else
		    					$("#message").html("Signup Not Successful");
		    		        
		    					$("#message").fadeIn(3000).delay(1000).fadeOut();
		    					router.navigate('',{trigger:true});
		    					
		    				
		    			},
		    			error:function(data,status,er) {
			 					console.log("error");
			 					
			 				}
		    		});
		    		
		    		return false;
		    	},
		    checkavailable:function(ev){
		    		
		    		usersignupavailablity=new UserSignUpAvailablity();
		    		
		    		user_signup_details=$(ev.currentTarget).serializeObject();
		    	
		    		
		    		usersignupavailablity.save({"email" : $("#email").val()},{
		    			success:function(resp){	
		    				   var email=$("#email").val();
		    				if(resp.get("result")!=="valid")
		    				{	
		    					$("#message").html(resp.get("result"));
		    					$("#message").fadeIn(3000).delay(1000).fadeOut("slow");
		    				}
		    				else if(resp.get("result")==="valid")
		    					{
		    					   if(email.length < 1 || email.indexOf("@")<1 || (email.lastIndexOf(".")+4)<email.length || (email.lastIndexOf(".")+3)>email.length)		    					  
		    						   $("#message").html("Eamil-ID is not Valid");
		    					   else
		    						  $("#message").html("Valid Email-ID");
			    					$("#message").fadeIn(3000).delay(1000).fadeOut("slow");
		    					}
		    					
		    			},
		    			 error:function(data,status,er) {
	 				 	    	console.log("error: " + JSON.stringify(data) + " status: " + JSON.stringify(status) + " er:" + JSON.stringify(er));
	 				 	} 
		    			
		    		});
		    		
		    	}
		    	
		    	
		    });
		    
		    var SetPasswordView=Backbone.View.extend({
		    	el			: "#container",	
		    	template	: _.template($('#users_setpassword_template').html()),
		    	templatesub	:_.template($('#users_setpassword_expired_template').html()),
		    	render:function(model){
		    		

		    		                    if(!model.id)
		    		                    {
		    		                    	var user=new SetUserPassword();
		    		                    	
		    		                    	this.$el.html(this.template({user: null}));
		    		                    	return ;
		    		                    }
		    		                    else
		    		                    	var user=new SetUserPassword({id: model.id});
                    					
                    					var that=this;
                    					
                    					user.fetch({
                    						success: function(resp){
	                    							if(resp.get("result")=="valid")
	                    									that.$el.html(that.template({user: model.id}));	
	                    							else
	                    								   that.$el.html(that.templatesub);	                    								                    							
						 				    },
					 				 	    error:function(data,status,er) {
					 				 	    	console.log("error: " + JSON.stringify(data) + " status: " + JSON.stringify(status) + " er:" + JSON.stringify(er));
					 				 		}                    						                    					
                    					});           
		    	},
		    	events:{
		    		"submit #password-user-form": "saveUserPassword"
		    	},
		    	saveUserPassword:function(ev){
		    		
		    		var pass=$("#upass").val();
		    		var cpass=$("#ucpass").val();
		    		
		    	
		    		
		    		if(pass!==cpass || pass==="" || cpass==="")
	    			{
		    			
		    			$("#message").html("Password should be same and not Empty");
						$("#message").fadeIn(3000).delay(1000).fadeOut("slow");
	    			   return false;
	    			}
		    		
		    		userpassdetails=$(ev.currentTarget).serializeObject();
		    		//userpassdetails=getallFormData(ev);
		    	
		    		var user=new SetUserPassword();
		    		user.save(userpassdetails,{
		    			success:function(resp){  
		    				
		    			if(resp.get("result")==="Password_updated")	
		    				$("#message").html("Password Created Successfully");
		    			else
		    				$("#message").html(resp.get("result"));
		    				$("#message").fadeIn(3000).delay(1000).fadeOut("slow");
		    				router.navigate('',{trigger:true});
		    				//setTimeout(function(){ location.href="/";},5000);
		    			},
		    			error:function(data,status,er) {
	 				 	    	console.log("error: " + JSON.stringify(data) + " status: " + JSON.stringify(status) + " er:" + JSON.stringify(er));
	 				 	}   
		    			
		    		});
		    		return false;
		    	}
		    	
		    });
		    
		    	    
		    
		    var ForgetPasswordView=Backbone.View.extend({
		    	el: "#container",		    	
		    	render:function(){
		    		
		    		template=_.template($('#users_forgetpassword_template').html());
		    		this.$el.html(template);	    				 				    
		    	},
		    	events:{
		    		"submit #forget-password-form": "sendMileVerification"
		    	},
		    	sendMileVerification:function(ev){
		    		
		    		
		    		
		    		if(!validateAllfields(ev.currentTarget.id))
	    			{
	    			$("#message").html("Enter Valid Email Id");
					    $("#message").fadeIn(3000).delay(1000).fadeOut("slow");
	    			   return false;
	    			}
		    		
		    		user_email_details=$(ev.currentTarget).serializeObject()
		    		var forgetpass=new ForgetUserPassword();
		    		forgetpass.save(user_email_details,{
		    			success:function(resp){
		    				if(resp.get("result")==="Mail Sent")
		    				{
		    				$("#message").html("Reset Password Link sent to you");
		    				 router.navigate("",{trigger:true});
		    				}
		    				else
		    				{
		    					$("#message").html(resp.get("result"));
		    				}
		    				
						    $("#message").fadeIn(3000).delay(1000).fadeOut("slow");
						   
		    			},
		    			error:function(data,status,er) {
 				 	    	console.log("error: " + JSON.stringify(data) + " status: " + JSON.stringify(status) + " er:" + JSON.stringify(er));
		    			}   
		    		});
		    		
		    		return false;
		    	}
		    	
		    });
		    
		    var ResetForgetPasswordView=Backbone.View.extend({
		    	el: "#container",		    	
		    	render:function(model){
		    		
		    		                    		    		                    
		    		                    	var user=new ResetForgetPassword({id: model.id});
		    		                    	var that=this;
		    		                    	
		    		                    	urlpost="/reset_forget_password/available/"+ model.id;
		    		                    	$.ajax({
		    		                    		type : "POST",
		    		                    		url  : urlpost,
		    		                    		async : false,
		    		                    		success:function(resp){
		    		                    			if(resp.result==="valid")
		    		                    				template=_.template($('#users_reset_forget_password_template').html());
		    		                    			else
		    		                    				template=_.template($('#users_setpassword_expired_template').html());
		    		                    			  
		    		                    			that.$el.html(template({user: model.id}));
		    		                    		},
		    		                    		error:function(data,status,er) {
						 				 	    	console.log("error: " + JSON.stringify(data) + " status: " + JSON.stringify(status) + " er:" + JSON.stringify(er));
						 				 		}  
		    		                    	});                    					                    					
		    	},
		    	events:{
		    		"submit #reset-forget-password-user-form": "saveUserPassword"
		    	},
		    	saveUserPassword:function(ev){
		    		
		    		var pass=$("#upass").val();
		    		var cpass=$("#ucpass").val();
		    		
		    	
		    		
		    		if(pass!==cpass || pass==="" || cpass==="")
	    			{
		    			
		    			$("#message").html("Password should be same and not Empty");
						$("#message").fadeIn(3000).delay(1000).fadeOut("slow");
	    			   return false;
	    			}
		    		
		    		userpassdetails=$(ev.currentTarget).serializeObject();
		    		//userpassdetails=getallFormData(ev);
		    	
		    		var user=new ResetForgetPassword();
		    		user.save(userpassdetails,{
		    			success:function(resp){  
		    				if(resp.get("result")==="Password_updated")
		    				$("#message").html("Password Created Successfully");
		    				$("#message").fadeIn(3000).delay(1000).fadeOut("slow");
		    				router.navigate('',{trigger:true});
		    				//setTimeout(function(){ location.href="/";},5000);
		    			},
		    			error:function(data,status,er) {
	 				 	    	console.log("error: " + JSON.stringify(data) + " status: " + JSON.stringify(status) + " er:" + JSON.stringify(er));
	 				 	}   
		    			
		    		});
		    		return false;
		    	}
		    	
		    });
		    
		    
		    var UserTaskView=Backbone.View.extend({
		    	el			: "#task",
		    	elsub		: "#subtask",
		    	template 	: _.template($("#users_taskview_template").html()),
		    	templatesub : _.template($("#users_tasksubview_template").html()),
		    	parsedtasks : "",
		    	initilize	:function(){
		    		_.bindAll(this,'createTask','render');
		    	},
		    	events:{
		    		  "click .taskrole"   	:  "onselectTask",
				      "change #contactid"	: "getTodoData",
				      "submit #task-form"   : "createTask",
				      "change .flt-check"   : "filterCurrentTasks",				      
				      "click  .sorthead"    : "filterCurrentTasks",
				      "keyup #search-task"	: "filterCurrentTasks",
				      "click #all-tasks"	: "showAllTasks",
				      "click .tskedit"      : "editTask",
				      "click .tskstate"		: "changeTaskState"
				},
				render		:  function(){										
		    		 if(tasks.length===0)
					tasks.fetch({
						 async :false,
			   			 success:function(resp){
			   				 console.log(resp);
			   			 },
							 error: function(data, status, er) {
								 console.log("error1: " + data + " status: " + JSON.stringify(status) + " er:" + JSON.stringify(er));
							}
					    });
		    		 
		    		 
		    		 
		    		 this.$el.html(this.template);
		    		 
		    		 this.parsedtasks=this.tasksParser(tasks);
		    		 $(this.elsub).html(this.templatesub({"tasks" : this.parsedtasks }));
		    		
		    		 function format(item) {
		    			 var result;
		    			    if(item.userimage)
		    		       	 result="<img src='data:image/jpeg;base64," +item.userimage.photo +"' style='width: 50px; height: 50px' /> " + item.name;
		    			    else
		    			    	result=item.name;
		    			 return result; 
		    			 
		    		 }
		    		 
		    		 $("#contactid").select2({
		    			    placeholder: "Contact Name",
		    			    multiple: true,
		    			    minimumInputLength: 1,
		    			    data: {results: new Users(users.where({deleted: false})).toJSON() ,text: 'name'},
		    			    formatResult: format
		    			});	
		    		 
		    		 
		    		 $('#duedate').datetimepicker({
		    			 language:'en',
		    			 autoclose: "false",
		    			 format:  "MM/DD/YYYY"
		    		 });
		    		 
		    		var that=this;
		    		var filterdatepicker= $('#filterdate').glDatePicker({
		    			 showAlways: true,
		    			 onClick: (function(el, cell, date, data) {
		    				 el.val(date.format("mm/dd/yyyy"));
		    			     that.filterbyDate(date);
		    			    }),
		    		 }).glDatePicker(true);
		    		 
		    		filterdatepicker.render();		    		 
		    		filterdatepicker.show();
		    		
		    		
		    		
		    		
		    		
		    		 		    		
		    		
		    	},
		    	tasksParser:function(taskcollection){
		    		
		    		var parsedtasks =new Tasks();
		    		taskcollection.each(function(task) {
		    			  
		    			  user=users.get(task.get("contactid"));                   //uses Globle Users collection
                       
		    			  var id= task.get('id');
		    			  var name=user.get("name");
						  var task_selected=	task.get('task');
						  var createddate= task.get('createddate');
						  var duedate= task.get('duedate');
						  var withobject= task.get('withobject');
						  var status=task.get('status');
                       
							if(task_selected==="Todo"){
								var description = withobject;
							}
							else if(task_selected==="Email"){
                                                                                                                                             
                           var Emails=Backbone.Collection.extend({});
                           emails=new Emails(user.get("emails"));                                                                                                                                                                            
                       	var description = 'Eamil to '+ name + ' ( '+ emails.get(withobject).get("value") + ' ) ';  																			
						    }
                       else if(task_selected==="Call"){
                        
                            
                       
                            var Numbers=Backbone.Collection.extend({});
                            var numbers=new Numbers(user.get("numbers"));
                            
                       
                            var description = 'Call to '+ name + ' ( '+ numbers.get(withobject).get("value") + ' ) ';  																			
						    }
							
							
							
							var parsedtask={
									id   : id,
									name : name,
									task : task_selected,
									description : description,
									createddate : createddate,
									duedate     : duedate,
									status		: status
							}
							
							parsedtasks.add(parsedtask,{merge:true});
		    			  
		    		  });
		    		  
		    		  return parsedtasks;		    		  
		    	},
		    	onselectTask:function(ev){
					
					
					var selectedtask=$(ev.currentTarget).children(":first").html();
										
					
		    		$(dropdownTask).html(selectedtask + "  "+'<span class="caret">   </span>');
		    		$(dropdownTask).val(selectedtask);
		    		
		    		if(selectedtask!=="Todo")
		    			{
		    			 $("#to").attr("type", "hidden");
		    			 
		    			
			    			$("#mapid").select2({
			    				minimumInputLength: 0,
			    				placeholder: selectedtask,
			    			    data:[]
			    			});			    				    			
		    			}
		    		else{
		    			$("#s2id_mapid").remove();
		    			$("#to").attr("type","text").attr("placeholder","Todo");
		    		}		    			
		    		
		    		
		    		
		    		this.getTodoData();
				},
				getTodoData:function(){
					var taskobject;
					var task=$(dropdownTask).val();
					
					if(task==="Call")
						taskobject="numbers";
					else if(task==="Email")
						taskobject="emails";
										
					var contact=users.get($("#contactid").val());
					
					if(taskobject && contact)
						{						 
						 $("#mapid").select2({							
			    			    data: {results: contact.get(taskobject) ,text: function(item) { return item.value; }}
			    			});	 												
						}					
				},				
				createTask:function(ev){
					
					
					var task=$("#dropdownTask").val();
					var contactid=$("#contactid").val();
					
					if(task==="Todo")
						var withobject=$("#to").val();
					else
						var withobject=$("#mapid").val();
					
					
					
					var duedate=new Date($('#duedate').data("DateTimePicker").getDate());
					tempdate=$('#duedate-text').val();					
					if(task==="" || contactid==="" || withobject==="" || tempdate==="")
						{
							$("#message").html("Fill All the Fields With Correct Value");
						    $("#message").fadeIn(1000).delay(2000).fadeOut("slow");
						    return false;
						}
					
					
					 taskdetails={
							task  : task,
							contactid: contactid,
							withobject: withobject,
							duedate: duedate
					};
					 
					 if($('#taskid').val())
						 taskdetails.id=$('#taskid').val();
					
					var usertask=new UserTask();
					
					console.log(taskdetails);
					
					var that=this;
					 usertask.save(taskdetails,{								  
							 success: function(task){
								 $("#message").html("Saved Successfully");
								    $("#message").fadeIn(1000).delay(2000).fadeOut("slow");
								    tasks.add([usertask],{merge:true});
									 that.render();
							 	},
							 error: function(data, status, er) {
								 console.log("error1: " + data + " status: " + JSON.stringify(status) + " er:" + JSON.stringify(er));
								}
						 });
					 					 
					 
					 
					return false;
					
				},
				filterCurrentTasks:function(ev){
					
					var filteredtasks=this.parsedtasks;
					
					//search text process
					
					if($("#search-task").val().length>1)
						{
							var searchtxt=$("#search-task").val().toLowerCase();
							filteredtasks=filteredtasks.byText(searchtxt);
						}
					
					//filterby  and sorting process
					
					 filterary=new Array();
						
						$(".flt-check:checked").each(function(){
							
							filterary.push($(this).attr("data"));
							
						});
					
					
					var sortingorder="";
					var order="";
					
					if(ev){
						sampl=ev.currentTarget;
						if($(sampl).attr("data")){
							sortingorder=$(sampl).attr("data");
							
							if($("#sortreverse").val()==sortingorder){
								order="reverse";
								$("#sortreverse").val("");
							}
							else{
							$("#sortreverse").val(sortingorder);
							}
						}
						
					}
					
					filteredtasks=filteredtasks.byTask(filterary,sortingorder,order);
					
					
					
			    	$(this.elsub).html(this.templatesub({"tasks" : filteredtasks}));  
					
			    	
			    	
				},
				fiiterByText:function(ev){
					
					var searchtxt=$(ev.currentTarget).val().toLowerCase();
					
					 
					if(searchtxt.length>2){
					var filteredtasks=this.parsedtasks.byText(searchtxt);
					
			    	$(this.elsub).html(this.templatesub({"tasks" : filteredtasks}));
					}
					else{
						
						$(this.elsub).html(this.templatesub({"tasks" : this.parsedtasks}));
					}
					
				},
				filterbyDate:function(date){
				
					
					
					this.clearFields();
					
					var filtereddate=tasks.byDate(date);
					this.parsedtasks=this.tasksParser(filtereddate);										
		    		 $(this.elsub).html(this.templatesub({"tasks" : this.parsedtasks }));
					
				},
				showAllTasks:function(ev){					
					this.clearFields();
					$("#filterdate").val("");
					
					this.parsedtasks=this.tasksParser(tasks);
		    		 $(this.elsub).html(this.templatesub({"tasks" : this.parsedtasks }));
				},
				clearFields:function(){
					
					$('.sort-radio').attr("checked",false);
					$('.flt-check').attr("checked",false);				
					$("#search-task").val("");
					
				},
				editTask:function(ev){
					
					var id=$(ev.currentTarget).attr("data");				
					
					var task=   tasks.where({id: id})[0];
					
					
					//setting the task
					var selectedtask=task.get('task');
					$(dropdownTask).html(selectedtask + "  "+'<span class="caret">   </span>');
		    		$(dropdownTask).val(selectedtask);
		    		
		    		$("#contactid").val(task.get('contactid')).trigger("change");
		    		
		    		if(selectedtask!=="Todo")
		    			{
		    			 $("#to").attr("type", "hidden");
		    			 
		    			
			    			$("#mapid").select2({
			    				minimumInputLength: 0,
			    				placeholder: selectedtask,
			    			    data:[]
			    			});		
			    			
			    			this.getTodoData();
			    			
			    			$("#mapid").val(task.get('withobject')).trigger("change");
		    			}
		    		else{
		    			$("#s2id_mapid").remove();		    			
		    			$("#to").attr("type","text").val(task.get('withobject'));
		    			
		    		}		    			
		    		$('#duedate').data("DateTimePicker").setDate(new Date(task.get('duedate')));
		    		$('#taskid').val(task.get('id'));
		    		$("#savetask").val("Update");
		    		
				},
				changeTaskState:function(ev){
					
					var taskid=$(ev.currentTarget).attr("data");
				
					var task=tasks.where({id: taskid})[0];
					
					if(task.get('status')=="Completed")
						task.set({status: "Pending"});
					else
					 task.set({status: "Completed"});
					
					var usertask=new UserTask();
					var that=this;
					usertask.save(task.toJSON(),{
						success:function(responsetask){
							 tasks.add([usertask],{merge:true});
							 
							 that.parsedtasks=that.tasksParser(tasks);	
							 if($("#filterdate").val())
								that.filterbyDate($('#filterdate').val());
							 that.filterCurrentTasks();
							 
						},
						error: function(data, status, er) {
							 console.log("error1: " + data + " status: " + JSON.stringify(status) + " er:" + JSON.stringify(er));
						}
						
					});
				
					
				}
				
		    });
		    
		    
		    
		    var TeamTaskView=Backbone.View.extend({
		    	el			: "#teamtask",
		    	elsub		: "#subtask",
		    	template 	: _.template($("#team_taskview_template").html()),
		    	templatesub : _.template($("#team_tasksubview_template").html()),
		    	parsedtasks : "",
		    	initilize	:function(){
		    		_.bindAll(this,'createTask','render');
		    	},
		    	events:{
		    		  "click .taskrole"   	:  "onselectTask",
				      "change #userid"		: "getTodoData",
				      "submit #task-form"   : "createTask",
				      "change .flt-check"   : "filterCurrentTasks",				      
				      "click  .sorthead"    : "filterCurrentTasks",
				      "keyup #search-task"	: "filterCurrentTasks",
				      "click #all-tasks"	: "showAllTasks",
				      "click .tskedit"      : "editTask",
				      "click .tskstate"		: "changeTaskState"
				},
				showTasks:function(){
					
					
					 this.parsedtasks=this.tasksParser(teamtasks);
					 console.log(this.parsedtasks);
		    		 $(this.elsub).html(this.templatesub({tasks: this.parsedtasks}));
		    		 
				},
				render		:  function(){	
					
		    		 if(teammembers.length===0)
		    	  teammembers.fetch({
						 async :false,
			   			 success:function(resp){
			   				 console.log(resp);
			   			 },
							 error: function(data, status, er) {
								 console.log("error1: " + data + " status: " + JSON.stringify(status) + " er:" + JSON.stringify(er));
								 sotest=data;
							}
					    });
		    		 
		    		 
		    		 
		    		 this.$el.html(this.template);
		    		 
		    		 this.showTasks();
		    		
		    		 $("#userid").select2({
		    			    placeholder: "Employee Name",
		    			    minimumInputLength: 1,
		    			    multiple: true,
		    			    data: {results: teammembers.toJSON() ,text: function(item) { return item.name; }}
		    			});	
		    		 
		    		 $('#duedate').datetimepicker({
		    			 language:'en',
		    			 autoclose: "false",
		    			 format:  "MM/DD/YYYY"
		    		 });
		    		 
		    		
		    		
		    		
		    	},
		    	tasksParser:function(taskcollection){
		    		
		    		var parsedtasks =new TeamTasks();
		    		taskcollection.each(function(task) {
		    			  
		    			   user=teammembers.get(task.get("to")[0]);                   //uses Globle Users collection
		    			  
		    			  console.log(user);
                       
		    			  var id= task.get('id');
		    			  var name=user.get("name");
						  var task_selected=	task.get('task');
						  var createddate= task.get('createddate');
						  var duedate= task.get('duedate');
						  var withobject= task.get('withobject');
						  var status=task.get('status');
                       
							if(task_selected==="Todo"){
								
								var description = withobject;
								
							}
							else if(task_selected==="Email"){
                                                                                                                                                                                              
                       	var description = 'Eamil to '+ name + ' ( '+ user.get("email") + ' ) ' ;  																			
						    }
                       else if(task_selected==="Call"){
                        
                                                     
                       
                            var description = 'Call to '+ name + ' ( '+ user.get("number")  + ' ) ';  																			
						    }
							
							
							if(task.get("to").length>1)
								description+= " +" + task.get("to").length-1; 
							
							var parsedtask={
									id   : id,
									name : name,
									task : task_selected,
									description : description,
									createddate : createddate,
									duedate     : duedate,
									status		: status
							}
							
							parsedtasks.add(parsedtask,{merge:true});
		    			  
		    		  });
		    		  
		    		  return parsedtasks;		    		  
		    	},
		    	onselectTask:function(ev){
					
					
					var selectedtask=$(ev.currentTarget).children(":first").html();
										
					
		    		$(dropdownTask).html(selectedtask + "  "+'<span class="caret">   </span>');
		    		$(dropdownTask).val(selectedtask);
		    		
		    		if(selectedtask!=="Todo")
		    			{
		    			 $("#to").attr("type", "hidden");
		    			 
		    			
			    			$("#withids").select2({
			    				minimumInputLength: 0,
			    				placeholder: selectedtask,
			    			    data:[]
			    			});			    				    			
		    			}
		    		else{
		    			$("#s2id_mapid").remove();
		    			$("#to").attr("type","text").attr("placeholder","Todo");
		    		}		    			
		    		
		    		
		    		
		    		this.getTodoData();
				},
				getTodoData:function(){
					var taskobject;
					var task=$(dropdownTask).val();
					
					if(task==="Call")
						taskobject="number";
					else if(task==="Email")
						taskobject="email";
						
					var userarray=$("#userid").val();
					if(userarray){
						var userids=userarray.split(",");
						var taskmembers=teammembers.filterById(userids);
						console.log(taskmembers);
					}
					
					
					
					
					
					if(taskobject && userarray)
						{						 
						 $("#withids").select2({	
							 multiple: true,
			    			    data: {results: taskmembers.toJSON() ,text: function(item) {  if(item[taskobject]) return  item[taskobject]; else return ""; }}
			    			});	 												
						}					
				},				
				createTask:function(ev){
					
					
					var task=$("#dropdownTask").val();
					var to=$("#userid").val().split(",");
					var withobject=new Array();
					
					if(task==="Todo")
						withobject.push($("#to").val());
					else
						withobject=$("#withids").val().split(",");
					
					
					
					var duedate=new Date($('#duedate').data("DateTimePicker").getDate());
					tempdate=$('#duedate-text').val();					
					if(task=="" || to.length==0 || withobject.length==0 || tempdate==="")
						{
							$("#message").html("Fill All the Fields With Correct Value");
						    $("#message").fadeIn(1000).delay(2000).fadeOut("slow");
						    return false;
						}
					
					
					 var taskdetails={
							task  : task,
							to: to,
							withobject: withobject,
							duedate: duedate
					};
					 
					 if($('#taskid').val())
						 taskdetails.id=$('#taskid').val();
					
					var teamtask=new TeamTask();
					
					console.log(taskdetails);
					
					var that=this;
					 teamtask.save(taskdetails,{								  
							 success: function(task){
								 $("#message").html("Saved Successfully");
								    $("#message").fadeIn(1000).delay(2000).fadeOut("slow");
								    teamtasks.add([teamtask],{merge:true});
									 that.render();
							 	},
							 error: function(data, status, er) {
								 console.log("error1: " + data + " status: " + JSON.stringify(status) + " er:" + JSON.stringify(er));
								}
						 });
					 					 
					 
					 
					return false;
					
				},
				filterCurrentTasks:function(ev){
					
					var filteredtasks=this.parsedtasks;
					
					//search text process
					
					if($("#search-task").val().length>1)
						{
							var searchtxt=$("#search-task").val().toLowerCase();
							filteredtasks=filteredtasks.byText(searchtxt);
						}
					
					//filterby  and sorting process
					
					 filterary=new Array();
						
						$(".flt-check:checked").each(function(){
							
							filterary.push($(this).attr("data"));
							
						});
					
						
					var sortingorder="";
					var order="";
					
					if(ev){
						sampl=ev.currentTarget;
						if($(sampl).attr("data")){
							sortingorder=$(sampl).attr("data");
							
							if($("#sortreverse").val()==sortingorder){
								order="reverse";
								$("#sortreverse").val("");
							}
							else{
							$("#sortreverse").val(sortingorder);
							}
						}
						
					}
					
					filteredtasks=filteredtasks.byTask(filterary,sortingorder,order);
					
					
					
			    	$(this.elsub).html(this.templatesub({"tasks" : filteredtasks}));  
					
			    	
			    	
				},
				fiiterByText:function(ev){
					
					var searchtxt=$(ev.currentTarget).val().toLowerCase();
					
					 
					if(searchtxt.length>2){
					var filteredtasks=this.parsedtasks.byText(searchtxt);
					
			    	$(this.elsub).html(this.templatesub({"tasks" : filteredtasks}));
					}
					else{
						
						$(this.elsub).html(this.templatesub({"tasks" : this.parsedtasks}));
					}
					
				},
				filterbyDate:function(date){
				
					
					
					this.clearFields();
					
					var filtereddate=tasks.byDate(date);
					this.parsedtasks=this.tasksParser(filtereddate);										
		    		 $(this.elsub).html(this.templatesub({"tasks" : this.parsedtasks }));
					
				},
				showAllTasks:function(ev){					
					this.clearFields();
					$("#filterdate").val("");
					
					this.parsedtasks=this.tasksParser(tasks);
		    		 $(this.elsub).html(this.templatesub({"tasks" : this.parsedtasks }));
				},
				clearFields:function(){
					
					$('.sort-radio').attr("checked",false);
					$('.flt-check').attr("checked",false);				
					$("#search-task").val("");
					
				},
				editTask:function(ev){
					
					var id=$(ev.currentTarget).attr("data");				
					
					var task=   tasks.where({id: id})[0];
					
					
					//setting the task
					var selectedtask=task.get('task');
					$(dropdownTask).html(selectedtask + "  "+'<span class="caret">   </span>');
		    		$(dropdownTask).val(selectedtask);
		    		
		    		$("#contactid").val(task.get('contactid')).trigger("change");
		    		
		    		if(selectedtask!=="Todo")
		    			{
		    			 $("#to").attr("type", "hidden");
		    			 
		    			
			    			$("#mapid").select2({
			    				minimumInputLength: 0,
			    				placeholder: selectedtask,
			    			    data:[]
			    			});		
			    			
			    			this.getTodoData();
			    			
			    			$("#mapid").val(task.get('withobject')).trigger("change");
		    			}
		    		else{
		    			$("#s2id_mapid").remove();		    			
		    			$("#to").attr("type","text").val(task.get('withobject'));
		    			
		    		}		    			
		    		$('#duedate').data("DateTimePicker").setDate(new Date(task.get('duedate')));
		    		$('#taskid').val(task.get('id'));
		    		$("#savetask").val("Update");
		    		
				},
				changeTaskState:function(ev){
					
					var taskid=$(ev.currentTarget).attr("data");
				
					var task=tasks.where({id: taskid})[0];
					
					if(task.get('status')=="Completed")
						task.set({status: "Pending"});
					else
					 task.set({status: "Completed"});
					
					var usertask=new UserTask();
					var that=this;
					usertask.save(task.toJSON(),{
						success:function(responsetask){
							 tasks.add([usertask],{merge:true});
							 
							 that.parsedtasks=that.tasksParser(tasks);	
							 if($("#filterdate").val())
								that.filterbyDate($('#filterdate').val());
							 that.filterCurrentTasks();
							 
						},
						error: function(data, status, er) {
							 console.log("error1: " + data + " status: " + JSON.stringify(status) + " er:" + JSON.stringify(er));
							}
						
					});
				
					
				}
				
		    });
		    
		    
		    
		    var UserListView = Backbone.View.extend({
				el : "#container",
				template  : _.template($('#users_template').html()),
				initialize:function(){
					_.bindAll(this,'loadTask');
					var that = this;
					
					
					if(verifySignedin()===false)	
						return ;
					
					
					if(users.length===0)
					users.fetch({
						success : function(users) {																 
								router.navigate("/#/contact",{trigger:true});
																					
						},
						error: function(data, status, er) {
							console.log("error: " + JSON.stringify(data) + " status: " + JSON.stringify(status) + " er:" + JSON.stringify(er));
						}
						
					});		
					
				},
				events:{
					  "click  #tasktab"	  :  "loadTask", 
					  "click #teamtasktab" : "teamloadTask",
					  "click  #phonebooktab": "homepage"  
				},
				
				render : function() {
							if(verifySignedin()===false)
							{		   
								router.navigate('',{trigger:true});							
							return ;
							}
						$("title").html("Phone Book");										

							
																
							this.$el.html(this.template({us:users}));	
				},
				loadTask: function(){
					
					if($("#task").children().length===0){
					var usertaskview=new UserTaskView;
					usertaskview.render();					
					}
					
				},
				teamloadTask:function(){
					$("#task").html("");
					
					if($("#temptask").children().length===0){
						var teamtaskview=new TeamTaskView;
						teamtaskview.render();					
						}
				},
				homepage:function(){
					router.navigate('/#/contact',{trigger:true});
				},
				deleteuser: function(id)
				{
					var user=new User({id: id})
					user.destroy({
						  async: false,
				          success: function (data) {
				        	  
				            console.log(user);
				           
				           
				          },
				          error: function(data, status, er) {
				        	  console.log("error2: " + data + " status: " + JSON.stringify(status) + " er:" + JSON.stringify(er));
							}
				        });
					
					 user.set({deleted: true})
					 users.add(user,{merge:true});
					 router.navigate('contact',{trigger:true});
					 
				        return false;
				}

			});
		    
		    
		    		    		    		   		    
		    
			
			var UserEditView=Backbone.View.extend({
				
				el				: "#mainpage",
				template		: _.template($('#edit_users_template').html()),
				emailtemplate	: _.template($('#edit_users_email_template').html()),
				numbertemplate  : _.template($('#edit_users_number_template').html()),
				render: function(opt){
					
						if(verifySignedin()===false)
						{	
							router.navigate("",{trigger:true});					
						return ;
						}
					
						
						var that=this;						
						if(opt.id)
							{
							    user=new User({id: opt.id});
							   user.fetch({
								   success:function(user){									   									
										that.$el.html(that.template({user: user}));
								   }
							   });
							   
							
							}
						else
							{
							  
								//this.remove();  removes the view object and from view also									
								this.$el.html(this.template({user: null}));
							}
					
				},
				events:{
					'submit .edit-user-form' : 'saveuser',					
					'click #cancel'          : 'cancelCreate',
					'keypress .number'   	 : 'checknumber',
					'keypress input'  		 : 'clearalert',
					'change #multiphoto'	 : 'loadImg',					
					'click  #add_eamil'		 : 'addEmail',
					'click .remove'			 : 'removeElement',
					'click  #add_number'	 : 'addNumber'						
				},	
				checknumber: function(e){
					
					
		                if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
		                   return false;
		                }		                				        	
				},
				saveuser: function(ev){
				
				    if(!validateAllfields(ev.currentTarget.id))
	    			{
						$("#message").html("Fill the Fields With Correct Value");
					    $("#message").fadeIn(3000).delay(1000).fadeOut("slow");
	    			   return false;
	    			}
				    
				    var name=$("#name").val();
				    
				    var emails=new Array();
				    
				    var numbers=new Array();
				    
				    var address=$("#address").val();
				    				   				    				    				   
				    $($("#email_container .email-attr")).each(function(){

				    	  var map=new Object();				    	
				    	  
						    	$.each($(this).children(),function(i,element){				    					    		
						    		
						    		if(element.name==="key")
						    			map["key"]=element.value ;
						    		else if(element.name==="email")
						    			map["value"]=element.value ;
						    		else if(element.name==="classid")
						    			map["id"]=element.value ;
						    		
						    	});
						    	
				    			    	
				    	emails.push(map);
				    	
				    });
				    
				    $($("#number_container .number-attr")).each(function(){

				    	  var map=new Object();
				    	  
				    	  
						    	$.each($(this).children(),function(i,element){				    					    		
						    		
						    		if(element.name==="key")
						    			map["key"]=element.value ;
						    		else if(element.name==="number")
						    			map["value"]=element.value;
						    		else if(element.name==="classid")
						    			map["id"]=element.value;						    		
						    	});
						    							    	
				    	numbers.push(map);
				    	
				    });
					 
				   var userDetails={						  
						      'name'   : name,
						      'emails'  : emails,
						      'numbers' : numbers,
						      'address': address
				   };
				   
				   if($("#fieldcontent .contactid").val())
					{
					   userDetails.id= 	$("#fieldcontent .contactid").val();				
					}				
				   		
				  
				  
   								   											
				   var user=new User();
					
					 user.save(userDetails,{								  
						 success: function(user1){
							 		$(".aler").html("");
							 		         destroyMaps();
							 		       
							 				var urlpost = "/Users/image/"+ user.id;
				 							var data = new FormData();
				 							jQuery.each($('#multiphoto')[0].files, function(i, file) {
				 								data.append('multiphoto', file);
				 				 			});
				 					if($("#multiphoto")[0].files && $("#multiphoto")[0].files[0]!=null)
				 					{	
				 							$.ajax({
				 								
				 				 				type : "POST",
				 				 				url : urlpost,			
				 				 				data : data,
				 				 				async : false,
				 				 				contentType: false,
				 				 			    processData: false,
				 							    
				 				 				success : function(data, textStatus, jqXHR) {						 				                      
				 				                            console.log("success");	
				 				                          
				 				 				},
				 				 				error:function(data,status,er) {
				 				 					console.log("error");
				 				 				}
				 				 			});	
							 
				 					}
				 					
							        users.add([user],{merge: true });
				 					router.navigate('contact',{trigger:true}); 
							 
						 	},
						 error: function(data, status, er) {
							 console.log("error1: " + data + " status: " + JSON.stringify(status) + " er:" + JSON.stringify(er));
							}
					 });
					
					return false;
				},
				cancelCreate:function(){					
					router.navigate("",{trigger:true});
				},
				clearalert:function()
				{
					$(".aler").html("");
				},
				loadImg:function()
				{
					
								if ($("#multiphoto")[0].files && $("#multiphoto")[0].files[0]!=null) {
						            var reader = new FileReader();								
						            reader.onload = function (e) {	
						            	
						                $('#profile')
						                    .attr('src', e.target.result) //contains the data in bytes format
						                    .width(100)
						                    .height(100);
						            };
						
						            reader.readAsDataURL($("#multiphoto")[0].files[0]);
						        }
				},
				addEmail: function(ev){
				
					if(!validateAllfields($(ev.currentTarget).parent()[0].id))
	    			{
						$("#message").html("Fill the Fields With Correct Value");
					    $("#message").fadeIn(3000).delay(1000).fadeOut("slow");
	    			   return false;
	    			}
											
					$("#email_container").append(this.emailtemplate);
				},
				removeElement: function(ev){
					
					if($($(ev.currentTarget).parent()[0]).children("input:hidden")[0])
						{
							var mapid=$($(ev.currentTarget).parent()[0]).children("input:hidden")[0].value;
							mapremovearr.push(mapid);
						}
					
					$(ev.currentTarget).parent()[0].remove();
				},
				addNumber: function(ev){
									  
					if(!validateAllfields($(ev.currentTarget).parent()[0].id))
	    			{
						$("#message").html("Fill the Fields With Correct Value");
					    $("#message").fadeIn(3000).delay(1000).fadeOut("slow");
	    			   return false;
	    			}
									
					$("#number_container").append(this.numbertemplate);
				}
				
				
			});

			var SendMailView = Backbone.View.extend({
				el : "#flash",
				render : function(maildetail) {
							if(verifySignedin()===false)
							{		 
								router.navigate("",{trigger:true});								
							return ;
							}
									var template=_.template($('#users_sendmail_template').html());										
									this.$el.html(template(maildetail));
									document.getElementById("flstrigger").click();
									router.navigate("contact",{trigger:true});	
				},
			    events:{
		    		"click #sendmail"		 	 : "sendMail",
		    		"keypress #subject"      	 : "disableEnter",
		    		"focus #subject,#mailmessage": "clearColor"
		    	},
		    	sendMail:function(ev){
		    		//$(ev.currentTarget).parents("form");
		    		
		    		var maildetails=$($(ev.currentTarget).parents("form")).serializeObject();
		    		
		    		
		    		var subject=$("#subject").val();
		    		var message= $("#mailmessage").val();	
		    		
		    		
		    			if(subject==="" &&  message==="")
		    			{
		    				$("#subject").css("border-color","red");
		    			    $("#mailmessage").css("border-color","red");
		    			    return false;
		    			}   
		    			else if(subject===""){
		    		    	$("#subject").css("border-color","red");
		    		    	return false;
		    			}
		    		    else if(message==="")
		    		    {
		    		    	$("#mailmessage").css("border-color","red");
		    		    	return false;
		    		    }
		    			
		    		
		    		var mailtocontact=new MailToContact();
			    		mailtocontact.save(maildetails,{
			    			success:function(resp){			    				
			    				if(resp.get("result")==="sent")
			    					{
			    					    $("#close").click();
			    					    $("#flash").html("");
			    					    $("#message").html("Mail Sent Successfully");
			 		    				$("#message").fadeIn(3000).delay(1000).fadeOut("slow");			    						
			    					}
			    				else
			    					{	$("#close").click();
		    					    	$("#flash").html("");
			    						$("#flash").html("");
			    						$("#message").html("Mail Not Sent Successfully");
				 		    			$("#message").fadeIn(3000).delay(1000).fadeOut("slow");	
			    					}
			    			},
			    			error:function(data,status,er) {
			    				console.log("error: " + JSON.stringify(data) + " status: " + JSON.stringify(status) + " er:" + JSON.stringify(er));
				 					
				 				}
			    			
			    		});
		    		 
		    		
		    		
		    		return true;
		    	},
		    	disableEnter:function(e){
		    		
		    		if(e.which===13)
		    		{
		    			$("#mailmessage").focus();
		    			return false;
		    		}
		    	},
		    	clearColor:function(ev){
		    		
		    		$(ev.currentTarget).css("border-color","");
		    	}
		    	

			});
		    
		    
		    
		    var Router = Backbone.Router.extend({
				routes : {	
							""   		: "home",
					 "signin/:id"		: "setpassword",
					 "signup"   	    : "showsignup",
					"contact"    		: "apphome",
					"edit/:id"   		: "edit",
					"new"        		: "edit",
					"delete/:id"        : "delete",
 					"sendmail/:mail/:id": "sendMail",
					"forgetpassword"    :"forgetPassword",
					"reset_forget_password/:id" : "resetForgetPassword",
					"reset"				: "setpassword",
					"log"        		: "logout"
				},
				setpassword: function(id) {					
					setpasswordview.render({id:id});
	            
				},
				home:function() {
					signinview.render();							               
				},
				showsignup: function() {
				
				signupview.render();				
			},
			logout:function(){
				 urlpost="/logout";
				$.ajax({
					type: "POST",
					url : urlpost,
					success:function(){location.href="/";}
				});
				
			},
			sendMail:function(mail,id){
				//alert(mail + " " + id);
				sendmailview.render({"mail": mail,"id": id});
				
			},
			forgetPassword:function(){
				
				
				forgetpasswordview.render();
				
			},
			resetForgetPassword:function(id){
				
				reset_forget_password_view.render({"id": id});
			}			
			
			});
		    
		    
		   //collections
		    
		    users=new Users();           // for user contacts
		    tasks=new Tasks();           // for user tasks  
		    var teammembers=new TeamMembers();         //for teams and its members.
		    var teamtasks=new TeamTasks();             //for teamtasks
		    
		    
		    
		    
			
			var setpasswordview=new SetPasswordView;
			var signinview=new SignInView;
			var signupview=new SignUpView;
			var userlistview = new UserListView();
			var usereditview = new UserEditView();
			var sendmailview=new SendMailView();
			var forgetpasswordview=new ForgetPasswordView();
			var reset_forget_password_view=new ResetForgetPasswordView();
			
			 var router = new Router;
			
			var router = new Router;
			router.on('route:apphome', function() {	
				if((location.href.length)>60){location.href="/";};
				userlistview.render();
			});
			router.on('route:edit', function(id) {
				var usereditview = new UserEditView();
				usereditview.render({id: id});
			});
			
			router.on('route:delete', function(id) {

				userlistview.deleteuser(id);
				
			});
			
			
			
			
			
			
			 Backbone.history.start();
//});