$(document).ready(function(){
	
	$('#historic-delete-form').ajaxForm(
	{
		success : function(responseText, status, xhr, $form)
		{
			if (status == 'success') 
				$('.modal-alert').modal('show');
		},
		error : function(e)
		{
			$('.modal-alert').modal('show');
		}
	});
	
	$('#historic-delete-form-item').ajaxForm(
	{
		success : function(responseText, status, xhr, $form)
		{
			if (status == 'success') 
				$('.modal-alert').modal('show');
		},
		error : function(e)
		{
			$('.modal-alert').modal('show');
		}
	});
	
	/*
	 * ------------------------------------------------------------------------------------------
	 * BIND EVENTS
	 * ------------------------------------------------------------------------------------------
	 */
	$('#account-form-btn1').click(function(){ window.location.href = '/';});
	$('.modal-alert #ok').click(function(){ setTimeout(function(){window.location.href = '/';}, 300)});
	
	/*
	 * ------------------------------------------------------------------------------------------
	 * MODALS
	 * ------------------------------------------------------------------------------------------
	 */
	$('.modal-alert').modal({ show : false, keyboard : true, backdrop : 'static' });
	$('.modal-alert .modal-header h3').text('Borrado!');
	$('.modal-alert .modal-body p').html('Se ha borrado con exito.');
	
	alert = $('.modal-form-errors');
	alert.modal({ show : false, keyboard : true, backdrop : true});
	
})