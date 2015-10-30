$(document).ready(function(){


  //localStorage["username"] = 'yolo';
  var username;
  chrome.storage.local.get(['disable','username','password'], function(result){

  	$('#username').val(result.username);
  	$('#password').val(result.password);

  	if(!result.disable){
  		$('#disable').prop('checked',false);
  	}
  })

  $('#save').click(function(){
  	chrome.storage.local.set({
  		'username': $('#username').val(),
  		'password': $('#password').val()
  	}, function() {
  		// Notify that we saved.
  		console.log('creds saved');
  		$('#message').html('creds saved');

  	});
  });

  $('#disable').on('change',function(){
  	chrome.storage.local.set({
  		'disable': $('#disable').is(':checked')
  	}, function() {
  		// Notify that we saved.
  		$('#message').html('auto-login disabled: ' + $('#disable').is(':checked'));

  	});
  });



})