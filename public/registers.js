// get the fs object based on Browser being used
window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

// Get the page elements to work with
var form = document.getElementById('form1');

var maxFileSizeQuota = 1024 * 1024 * 5;
// global variable to store the fs object
var fs = null;

// initialize the file System
function initFileSystem() {
	navigator.webkitPersistentStorage.requestQuota(maxFileSizeQuota, function (grantedSize) {
		window.requestFileSystem(window.PERSISTENT, grantedSize, function (fileSystem) {
			fs = fileSystem;

			form.addEventListener('submit', function (e) {
				e.preventDefault();

				var result= formvalidate();

				if (result)
               {
				const name = document.getElementById('urname');
                const age = document.getElementById('contact');
                const email = document.getElementById('email');
                const country = document.getElementById('address');
                 
        
        // This variable stores all the data.
        let data = 
            '\r Name: ' + name.value + ' \r\n ' + 
            'Age: ' +age.value + ' \r\n ' + 
            'Email: ' + email.value + ' \r\n ' + 
            'Address: ' + country.value + '\r\n' ;
           
        
				saveTheFile(data);
			   }
			   
			});
		

			

		}, handleError);
	}, handleError);
}



// Save a file in the FileSystem.
function saveTheFile(content) {
	fs.root.getFile('tce.txt', { create: true }, function (fileEntry) {

		fileEntry.createWriter(function (fileWriter) {
		   
			fileWriter.seek(fileWriter.length);
			fileWriter.onwriteend = function (e) {
				
				

				// Show message
				 alert('File saved successfully!');
			};

			fileWriter.onerror = function (e) {
				alert('Error occured: ' + e.toString() + "\n File couldn't saved");
			};

			var contentBlob = new Blob([content + "\r\n"], { type: 'text/plain' });
			

			fileWriter.write(contentBlob);

		}, handleError);

	}, handleError);
}

// Start the application
if (window.requestFileSystem) {
	initFileSystem();
} else {
	alert('Sorry! Your browser doesn\'t support the FileSystem API :(');
}

// Generic Error handler used in the FileSyste that is found on the web
function handleError(error) {
	var message = '';

	switch (error.code) {
		case FileError.SECURITY_ERR:
			message = 'Security Error occured';
			break;
		case FileError.NOT_FOUND_ERR:
			message = 'File Not Found';
			break;
		case FileError.QUOTA_EXCEEDED_ERR:
			message = 'Quota limit Exceeded';
			break;
		case FileError.INVALID_MODIFICATION_ERR:
			message = "Can''t modify";
			break;
		case FileError.INVALID_STATE_ERR:
			message = 'Invalid State';
			break;
		default:
			message = 'Do not know, what happened. Report to webmaster';
			break;
	}
	alert(message);
}














































function formvalidate()
 {
 	if(user_validate())
 	{
 		if(num_validate())
 		{
 			if(email_validate())
 			{
 				if(add_validate())
 				{
 					if(branch_validate())
 					{
 						if(yrstudy_validate())
 						{
 							if(event_validate())
 							{
 								if(accom_validate())
 								{
									 alert('form submitted');
									 return true;
 								}
 							}
 						}
 					}
 				}
 			}
 		}
 	}
 	return false;
 	
 }



 function num_validate()
 {
 	var exp1=/^\d{10}$/;
 	var phoneno= document.getElementById("contact").value;
 	if(exp1.test(phoneno))
 	{
      return true;
 
 	}
 	else
 	{
 	  alert("Enter 10-digit numeric value only");
      document.myform.contact_no.focus();
      return false;
 
 	}
 }	

 function user_validate()
 {
 	var user = document.getElementById("urname").value;
 	
 	if(user==null || user=="")
 	{  
       alert("Name can't be blank");  
       return false; 
    }
    else if (user.length>20)
    {
    	alert("Name can't be more than 20 characters long.");  
        return false; 
    }
    else if (user.length<6)
    {
    	alert("Name must be at least 6 characters long.");  
        return false; 
    }

    return true;
}

function email_validate()
{
	var exp1=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
 	var e_mail= document.getElementById("email").value;
 	if(exp1.test(e_mail))
 	{
      return true;
 	}
 	else
 	{
 	  alert("Enter valid email address");
      document.myform.usermail.focus();
      return false;	
 	}
}

function add_validate()
{
	var exp1= /^[0-9a-zA-Z\s,]+$/;
 	var add= document.getElementById("address").value;
 	if(exp1.test(add))
 	{
      return true;
 	}
 	else
 	{
 	  alert("Enter valid address");
      document.myform.addr.focus();
      return false;	
 	}
}

function branch_validate()
{
	var branch= document.getElementById("discipline").value;
 	if(branch=="")
 	{
      alert("Please select ur stream");
      document.myform.dis.focus();
      return false;
 	}
 	else
 	{
      return true;	
 	}
}

function yrstudy_validate()
{
	var valid=false;
	var x=document.myform.study;

	for(var i=0;i<x.length;i++)
	{
		if(x[i].checked)
		{
			valid=true;
			break;
		}
	}
	if(valid)
	{
		return true;
	}
	else
	{   
		alert('Select year of study');
		document.myform.study.focus();
		return false;
	}
}

function accom_validate()
{
	var valid=false;
	var x=document.myform.accom;

	for(var i=0;i<x.length;i++)
	{
		if(x[i].checked)
		{
			valid=true;
			break;
		}
	}
	if(valid)
	{
		return true;
	}
	else
	{   
		alert('Choose your preference for accomodation');
		document.myform.accom.focus();
		return false;
	}
}

function event_validate()
{
	var valid=false;

	if(document.getElementById("blackbox").checked)
	{
		valid=true;
	}
	else if(document.getElementById("techlathon").checked)
	{
		valid=true;
	}
	else if(document.getElementById("bid-buy-build").checked)
	{
		valid=true;
	}

	if(valid)
	{
		return true;
	}
    else
    {
    	alert('Please select your event');
    	return false;
    }
}



 

    

	
	