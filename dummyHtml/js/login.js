(function () {
	'use strict'

	// Fetch all the forms we want to apply custom Bootstrap validation styles to
	var forms = document.querySelectorAll('.needs-validation')

	// Loop over them and prevent submission


	$('#myLoginButton').click(function(){
		alert('hello')
		$.ajax({
			type: "POST",
			url: "http://127.0.0.1:3000/_api/auth/signin",
			data: {
				userName:"57432",
				password:"0123456789"
			},
			success: function(result){
				console.log(result)
			},
			dataType: "json"
		});
	})
	
})()