
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

	getLocalCreds(function(result){
		console.log(result);
		if(result){
	        //cookies are set, log me in;
	        console.log('creds found');
	        logIn(result.username,result.password);

	    }else{
        	//we need to set a password
        	console.log('no creds found');
        }


    });
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

function getResponse(html){
    console.log($(html).find('input[name=err_flag]').val());
	console.log('html',html);
	if(html.search('getErrorMsgIfAny') != -1){
		return 'error';
	}else if(html.search('Logged in') != -1){
		return 'success';
	}else
    	return 'already'; //already logged in
    }



    function getLocalCreds(callback) {
    	chrome.storage.local.get(['username','password'], function(result){
    		console.log(result);
    		if(Object.keys(result).length > 1 && result.username && result.password){
    			callback({
    				username:result.username,
    				password:result.password
    			});
    		}else{
    			callback(false);
    		}
    	});
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
            console.log(result,'result');
    		switch(getResponse(result)){
    			case 'success':
                case 'already':
    			console.log('success');
    			setMessage.success('Du er logga inn (jippi)');
                redirect();
    			break;
    			case 'error':
    			console.log('error');
    			setMessage.success('ops, tullelure skjedde<br>sjekk brukernavn/passord');
    			break;
                // ikkje brukt no
    			case 'already':
    			console.log('alrady');
    			setMessage.success('du er allerede innlogga :-(');
                setTimeout(redirect, 1000);
    				break;

    			}

    		})
    	.fail(function() {
    		setMessage.error('offadå noko dumt skjedde');
    	})
    }

    function saveCreds(u, p, callback){
    	chrome.storage.local.set({
    		username:u,
    		password:p
    	},callback)
    };

    function redirect(){
        chrome.storage.local.get(['redirect'], function(result){
            if(result.redirect){
                window.location = result.redirect;
            }else{
                window.location = 'http://ungweb.no';
            }
        });
    }

    function saveAndSubmit(){
    	var u = document.querySelector('input[name=username]').value;
    	var p = document.querySelector('input[name=password]').value;

    	saveCreds(u,p, function(){
    		logIn(u,p);

    	});
    }

    function submit(){
    	console.log('submitting');
    }

    chrome.storage.local.get('disable', function(result){
    	console.log(result);
    	if(Object.keys(result).length > 0 && result.disable){

    	}else{
    		enter();
    	}
    })