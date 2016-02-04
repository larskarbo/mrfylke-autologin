$(document).ready(function(){

  var DEFAULT_URL = 'http://ungweb.no'

  var username;

  if($('#redirect').val().length == 0){
    $('#redirect').val(DEFAULT_URL)
  }

  chrome.storage.local.get(['disable','username','password','redirect'], function(result){

  	$('#username').val(result.username);
    $('#password').val(result.password);
    $('#redirect').val(result.redirect);

    if(!result.disable){
      $('#disable').prop('checked',false);
    }
  })

  $('#save').click(function(){
    if($('#redirect').val().length == 0){
      $('#redirect').val(DEFAULT_URL)
    }
    chrome.storage.local.set({
      'username': $('#username').val(),
      'password': $('#password').val(),
      'redirect': $('#redirect').val()
    }, function() {
  		// Notify that we saved.
  		console.log('creds saved');
  		$('#message').html('save successfull');
      setTimeout(function(){
        $('#message').html('');
      }, 2000)

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