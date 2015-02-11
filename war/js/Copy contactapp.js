$.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
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
    
      function validateAllfields(ev)
      {
    	 window.tas=ev;
    	  var evid="#" +ev.currentTarget.id;
    	  result=true;
        	$(evid+' input:text, '+ evid +' input:password, '+ evid +' input:hidden').each(function(){
        		
        		
        		if(this.name==="number" && (this.value.length<10 || this.value.length>12))
        			{
        				result=false;
        			}
        		if(this.name==="email" && (this.value.length < 1 || this.value.indexOf("@")<1 || (this.value.lastIndexOf(".")+4)<this.value.length || (this.value.lastIndexOf(".")+3)>this.value.length) )        			
        			{
        			      
        			  result=false;
        			}
        		
        		if(this.value==="")
        			{
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
						result=true;
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
		        urlRoot: '/signup_password'		      		  	
		  });
		    
		    var User=Backbone.Model.extend({
		          urlRoot: '/Users'              	
		    });
		    
		    var MailToContact=Backbone.Model.extend({
		    	 urlRoot: '/Users/mailtocontact'    	
		    	
		    });
		      
		    var Users=Backbone.Collection.extend({
		          url: '/Users'    	
		    	
		    });
		    
		    
		   
		    var SendMailView = Backbone.View.extend({
				el : "#flash",
				render : function(maildetail) {
							if(verifySignedin()===false)
							{		 
								router.navigate("",{trigger:true});
								location.href="/";
							return ;
							}
																																											
								    console.log(maildetail);
									var template=_.template($('#users_sendmail_template').html());										
									this.$el.html(template(maildetail));
									document.getElementById("flstrigger").click();
									router.navigate("contact",{trigger:true});
				},
			    events:{
		    		"click #sendmail": "sendMail",
		    		"click #close"   :  "closeFlash",
		    		"click #cancel_mail": "loadrefresh"
		    	},
		    	sendMail:function(ev){
		    		//$(ev.currentTarget).parents("form");
		    		var maildetails=$($(ev.currentTarget).parents("form")).serializeObject();
		    		console.log(maildetails);
		    		
		    		var mailtocontact=new MailToContact();
			    		mailtocontact.save(maildetails,{
			    			success:function(resp){			    				
			    				if(resp.get("result")==="sent")		    		    		
			    					$("#mail_form").html("<br><br>Mail Sent Successfully<br><br>");
			    				else
			    					$("#mail_form").html("<br><br>Mail Not Sent Successfully<br><br>");
			    		        					    					
			    				
			    			},
			    			error:function(data,status,er) {
			    				console.log("error: " + JSON.stringify(data) + " status: " + JSON.stringify(status) + " er:" + JSON.stringify(er));
				 					
				 				}
			    			
			    		});
		    		 
		    		
		    		
		    		return true;
		    	},
		    	closeFlash:function(){
		    		
		    		//if(location.href.length>45){location.href="/";}	
		    	},
		    	loadrefresh:function(){
		    		
		    		//if(location.href.length>45){location.href="/";}	
		    	}
		    	

			});
		    
		    var SignInView=Backbone.View.extend({
		    	el: "#mainhomepage",		    	
		    	render:function(){
							    		if(verifySignedin()===true)
										{		    					
										router.navigate("contact",{trigger:true});
										location.reload();
										return ;
										}
					    		
		    					var temp=_.template($("#users_signin_template").html());		 						
		    					this.$el.html(temp);		                     						 				 											 				 					    		
		    	},
		    	events:{
		    		"submit #signin-user-form": "signinUser"		    		
		    	},
		    	signinUser:function(ev){
		    		
		    		
		    		if(!validateAllfields(ev))
		    			{
		    			$("#message").html("Fill Eamil and Password");
   					    $("#message").fadeIn(3000).delay(1000).fadeOut("slow");
		    			   return false;
		    			}
		    		user_signin_details=$(ev.currentTarget).serializeObject();//getallFormData(ev);
		    		
		    		
		    		var usersignin=new UserSignIn();
		    		
		    		usersignin.save(user_signin_details,{
		    			success:function(resp){		    				
		    				 if(resp.get("result")==="valid")
		    					 {
		    					 var router = new Router;
		    					 router.navigate("contact",{trigger:true});
		    					  location.href="/";
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
		    	el: "#mainhomepage",		    	
		    	render:function(){
		    		
		    					if(verifySignedin()===true)
		    						{		    					
		    						router.navigate("contact",{trigger:true});
		    						location.href="/"
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
		    		
		    		if(!validateAllfields(ev))
	    			{
	    			$("#message").html("Fill All Fields");
					    $("#message").fadeIn(3000).delay(1000).fadeOut("slow");
	    			   return false;
	    			}
		    		
		    		
		    		user_signup_details=$(ev.currentTarget).serializeObject();//getallFormData(ev);
		    	
		    		
		    		var usersignup=new UserSignUp();
		    		
		    		usersignup.save(user_signup_details,{
		    			success:function(resp){
		    				
		    				if(resp.get("result")==="created")		    		    		
		    					$("#message").html("Successfully created");
		    				else
		    					$("#message").html("Signup Not Successful");
		    		        
		    					$("#message").fadeIn(3000).delay(1000).fadeOut();
		    					router.navigate('',{trigger:true});
		    					//setTimeout(function(){ location.href="/";},5000);
		    				
		    			},
		    			error:function(data,status,er) {
			 					console.log("error");
			 					$("#message").html("Error");
			    				$("#message").fadeIn(3000).delay(1000).fadeOut("slow");
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
		    	el: "#mainhomepage",		    	
		    	render:function(model){
		    		
							    		if(verifySignedin()===true)
										{		    					
										router.navigate("contact",{trigger:true});
										location.href="/";
										return ;
										}
		    		
		    							var user=new SetUserPassword({id: model.id});
		    									    							    							
                    					
                    					var that=this;
                    					
                    					user.fetch({
                    						success: function(resp){
	                    							if(resp.get("result")=="valid")                    								
	                    									template=_.template($('#users_setpassword_template').html());
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
		    				$("#message").html("Password Submitted");
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
		    
		    
		    
		    var UserListView = Backbone.View.extend({
				el : "#mainpage",
				render : function() {
							if(verifySignedin()===false)
							{		   
								router.navigate('',{trigger:true});
								location.href="/";
							return ;
							}
										
						users = new Users();
						var that = this;																											
						users.fetch({
							success : function(users) {
								
								 
									var template=_.template($('#users_template').html());										
									that.$el.html(template({us:users.models}));
									
								
							},
							error: function(data, status, er) {
								console.log("error: " + JSON.stringify(data) + " status: " + JSON.stringify(status) + " er:" + JSON.stringify(er));
							}
						     
						});
					
				}

			});
			
			var UserEditView=Backbone.View.extend({
				
				el: "#mainpage",
				render: function(opt){
					
					
						if(verifySignedin()===false)
						{	
							router.navigate("",{trigger:true});
							location.href="/";
						return ;
						}
					
						var that=this;
						var template=_.template($('#edit_users_template').html());
						if(opt.id)
							{
							    user=new User({id: opt.id});
							   user.fetch({
								   success:function(user){									   									
										that.$el.html(template({user: user}));
								   }
							   });
							}
						else
							{
								//this.remove();  removes the view object and from view also									
								this.$el.html(template({user: null}));
							}
					
				},
				events:{
					'submit .edit-user-form': 'saveuser',
					'click .delete': 'deleteuser',
					'keypress #number':'checknumber',
					'keypress input'  : 'clearalert',
					'change #multiphoto':'loadImg'
				},	
				checknumber: function(e){
					
					
		                if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
		                   return false;
		                }		                				        	
				},
				saveuser: function(ev){
				    user=new User();
					var eamil=$("#eamil").val();
					var name=$("#name").val();
					var number=$("#number").val();
					 if (name.length < 1 || name==="") {								
							$(".aler").html("Enter valid Name");		
							return false;
					 }
					 else if (eamil.length < 1 || eamil.indexOf("@")<1 || eamil.lastIndexOf(".")+4<eamil.length) {
							$(".aler").html("Enter valid Email");
							return false;
					} 								
					else if(number.length<10 || number.length>12)
					{
						$(".aler").html("Enter valid Number");
						return false;
					}
					
					
					var userDetails = $(ev.currentTarget).serializeObject();//getallFormData(ev); 
				   															
   								   											
					
					
					 user.save(userDetails,{								  
						 success: function(user1){
							 		$(".aler").html("");
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
							 
							 
							  router.navigate('contact',{trigger:true});
						 	},
						 error: function(data, status, er) {
							 console.log("error1: " + data + " status: " + JSON.stringify(status) + " er:" + JSON.stringify(er));
							}
					 });
					
					return false;
				},
				deleteuser: function(ev)
				{
					 user=new User({id: $('#id').val()})
					user.destroy({
				          success: function (data) {
				            console.log('destroyed');
				            router.navigate('contact',{trigger:true});
				          },
				          error: function(data, status, er) {
				        	  console.log("error2: " + data + " status: " + JSON.stringify(status) + " er:" + JSON.stringify(er));
							}
				        });
				        return false;
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
						                    .attr('src', e.target.result)
						                    .width(100)
						                    .height(100);
						            };
						
						            reader.readAsDataURL($("#multiphoto")[0].files[0]);
						        }
							}
				
			});

		    
		    
		    
		    
		    var Router = Backbone.Router.extend({
				routes : {	
							""   : "home",
					 "signup/:id": "setpassword",
					 "signup"    : "showsignup",
					"contact"    : "apphome",
					"edit/:id"   : "edit",
					"new"        : "edit",
					"sendmail/:mail/:id": "sendMail",
					"log"        : "logout"					
				},
				setpassword: function(id) {
					console.log("router");
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
					success:function(){location.href="/"}
				});
				
			},
			sendMail:function(mail,id){
				//alert(mail + " " + id);
				sendmailview.render({"mail": mail,"id": id});
				
			}
			
			});
			

			 var router = new Router;
			var setpasswordview=new SetPasswordView;
			var signinview=new SignInView;
			var signupview=new SignUpView;
			var userlistview = new UserListView();
			var usereditview = new UserEditView();
			var sendmailview=new SendMailView();
			
			var router = new Router;
			router.on('route:apphome', function() {				
				userlistview.render();
			});
			router.on('route:edit', function(id) {
				usereditview.render({id: id});
			});