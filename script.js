
function enter(){
    
	// add button
	var buttonCode = '<input class="button" type="button" id="saveAndSubmit" value="Lagre auto-login"></button>';
	$('input[name=Submit]').after(buttonCode);
	$('#saveAndSubmit').css('width','140px');
	$('#saveAndSubmit').css('marginLeft','10px');
	$('#saveAndSubmit').css('backgroundColor','blue');
	console.log('#saveAndSubmit');
	
	//add message field
	$('#saveAndSubmit').after('<div id="message"></div>');
	
	$('#saveAndSubmit').on('click',saveAndSubmit);
    
    var creds;

    if(creds = checkIfCookiesAreSet()){
        //cookies are set, log me in;
        console.log('creds found');
        logIn(creds.username,creds.password);
        
    }else{
        //we need to set a password
        console.log('no cookies found');
    }
    
   
}

setMessage = function(){
	// private

	function setText(text){
		$('#message').html(text);
	}

	// public
	return {
		success:function(text){
			setText(text);

			$('#message').css('color','green');
			$('#message').css('marginTop','20px');
			$('#message').css('fontSize','40px');
		},

		error:function(text){
			setText(text);

			$('#message').css('color','red');
			$('#message').css('marginTop','15px');
			$('#message').css('fontSize','20px');
		}
	}

}();

function checkIfCookiesAreSet(){
    
    var username = getCookie('username');
    var password = getCookie('password');
    
    if(username.length == 0 || password.length == 0)
        return (username + password);
    
    return {username:username,password:password};
}  


function hasError(text){
    var html = document.getElementsByTagName('html')[0].innerHTML;
    
    if(html.search('Login Error') <= 0){
        return true;
    }
    
    return false;
}



function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) === 0) return c.substring(name.length,c.length);
    }
    return "";
}

function logIn(u,p){
	console.log(u,p);
	data = {
		username:u,
		password:p,
		buttonClicked:4,
		network_name:'Guest+Network'
	}
	
	$.post( "login.html", data)
	  .done(function(result) {

	  	if(!hasError(result)){

	  		console.log("success");
			setMessage.success('dette gikk bra');
			window.location="http://ungweb.no/"
	  	}else{

	  		setMessage.error('ops, tullelure skjedde<br>sjekk brukernavn/passord');
	  	}
	  })
	  .fail(function() {
		setMessage.error('offadå noko dumt skjedde');
	  })
}

function saveCreds(u,p){
    
    document.cookie='username=' + u;
    document.cookie='password=' + p;
};

function saveAndSubmit(){
    var u = document.querySelector('input[name=username]').value;
    var p = document.querySelector('input[name=password]').value;
	
	saveCreds(u,p);
	logIn(u,p);
}

function submit(){
    console.log('submitting');
}

enter();