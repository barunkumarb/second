$(document).ready(function(){
	
	
		$("#message").hide();
		$("#signup_link").click(function(){			
			$("#signin").hide();
			$("#signup").show();
		});
		
		$("#signin_link").click(function(){			
			$("#signin").show();
			$("#signup").hide();
		});
	
});