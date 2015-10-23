$(document).ready(function(){


	$('body').on('click', '.js-get-users', function(){

		function insertData(arr) {
			var tpl = '<div>' +
		        'User Info: <ul>' +
		        '<li>First name: <span class="js-first">none</span></li>' +
		        '<li>Last name: <span class="js-last">none</span></li>' +
		        '</ul>' +
		        '<hr>' +
		        '</div>';

			arr.forEach(function(item, i){
				var $copy = $(tpl);

				$copy.find('.js-first').text(item.first_name);
				$copy.find('.js-last').text(item.last_name);

				$('.js-user-info-' + (i + 1)).html($copy);
			});
		}


		return $.ajax({
			method: 'GET',
			url: 'http://reqres.in/api/users'
		}).then(function(res){
			insertData(res.data);   //possible issue!!!
		});
	});

	

	$('body').on('submit', '.js-add-user', function (ev) {
    	ev.preventDefault();
  	
		var userName = $('.js-name').val();
    	var userJob = $('.js-job').val();


    	function addUser(arr) {
			var tpl = '<li>name: <span class="js-name">none</span></li>' +
	        '<li>job: <span class="js-job">none</span></li>' +
	        '<li>id: <span class="js-id">none</span></li>' +
	        '<li>created at:  <span class="js-created-at">none</span></li>';

	        var $copy = $(tpl);
	        $copy.find('.js-name').text(arr.name);
	        $copy.find('.js-job').text(arr.job);
	        $copy.find('.js-id').text(arr.id);
	        $copy.find('.js-created-at').text(arr.createdAt);

	        $('.js-recent-user').html($copy);
		}

    	return $.ajax({
    		method: 'POST',
    		url: 'http://reqres.in/api/users',
    		data: {name: userName, job: userJob} 
		}).then(function(value){
			addUser(value);
		});
	});

})