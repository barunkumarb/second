$(function(){
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
   
      var User=Backbone.Model.extend({
          urlRoot: '/Users'              	
    });
      
      
    var Users=Backbone.Collection.extend({
          url: '/Users'    	
    	
    });
   
					var UserListView = Backbone.View.extend({
						el : ".page",
						render : function() {
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
						
						el: ".page",
						render: function(opt){
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
							 if (name < 1 || name==="") {								
									$(".aler").html("Enter valid Name");		
									return false;
							 }
							 else if (eamil.length < 1 || eamil.indexOf("@")<1 || eamil.lastIndexOf(".")+4<eamil.length) {
									$(".aler").html("Enter valid Email");
									return false;
							} 								
							else if(number.length<10)
							{
								$(".aler").html("Enter valid Number");
								return false;
							}
							
							
							var userDetails = $(ev.currentTarget).serializeObject(); 
						   															
		   									   											
							
							
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
									 
									 
									  router.navigate('',{trigger:true});
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
						          success: function () {
						            console.log('destroyed');
						            router.navigate('',{trigger:true});
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
							//$("img").attr("src",($("#multiphoto")[0].files[0]));
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
							"" : "home",
					 "edit/:id": "edit",
						  "new": "edit"

						}
					});
					
					var userlistview = new UserListView();
					var usereditview = new UserEditView();

					var router = new Router;
					router.on('route:home', function() {

						userlistview.render();
					});
					router.on('route:edit', function(id) {
						usereditview.render({id: id});
					});
					
});