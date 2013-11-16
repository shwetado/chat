function getId(){
			var value = document.forms[0].elements[1].value;
			var pswrd = require('crypto').createHash('md5').update(value).digest('hex');
			alert("*",pswrd);
		}
		getId();