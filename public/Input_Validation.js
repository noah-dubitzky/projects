function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 

function isPhoneNumber(n) { return /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(n); } 

function HasLetters(n) { return /.*[a-zA-Z].*/.test(n); } 

function AllLetters(n){
	
	var result = true;
	
	for(var i = 0; i < n.length; i++)
	{
		if( isNumber(n[i]) )
		{
			result = false;
			return result;
		}
	}
	
	return result;
	
}

function AllNumbers(n){
	
	var result = true;
	
	for(var i = 0; i < n.length; i++)
	{
		if( !isNumber(n[i]) )
		{
			result = false;
			return result;
		}
	}
	
	return result;
	
}

function IsZip(n){
	
	if(AllNumbers(n) && n.length == 5){
		
		return true;
		
	}else{
		
		return false;
		
	}
	
}

//taken from https://www.w3resource.com/javascript/form/email-validation.php (w3resource)

function ValidateEmail(email) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
  {
    return (true)
  }
    return (false)
}

