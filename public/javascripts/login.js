$(document).ready(function()
{
	$('#login-form').ajaxForm(
	{
		beforeSubmit : function(formData, jqForm, options)
		{
			if (_validateForm() == false)
			{
				return false;
			}
			else
			{
				// Recuerdame always check
				formData.push({name:'remember-me', value:$("input:checkbox:checked").length == 1})
				return true;
			}
		},
		success	: function(responseText, status, xhr, $form)
		{
			if (status == 'success') 
				window.location.href = '/';
		},
		error : function(e)
		{
			_showLoginError('Error en login', 'Comprueba tu usuario y password');
		}
	}); 
	
	$('#shopping-form').ajaxForm(
	{
		beforeSubmit : function(formData, jqForm, options)
		{
			return true;
		},
		success	: function(responseText, status, xhr, $form)
		{
			_showLoginError('Proceso realizado', responseText);
			// TODO Redirect to page
		},
		error : function(e)
		{
			_showLoginError('Error en login', 'Error a la hora de almacenar en el servidor la lista');
		}
	}); 
	
	$('#user-tf').focus();
	
	/*
	 * ------------------------------------------------------------------------------------------
	 * BIND CLICK ELEMENTS
	 * FOCUS THE CURSOR
	 * ------------------------------------------------------------------------------------------
	 */
	$('#login-form #forgot-password').click(function(){ $('#get-credentials').modal('show');});
	
	// Focus
	$('#get-credentials').on('shown', function(){ $('#email-tf').focus(); });
	$('#get-credentials').on('hidden', function(){ $('#user-tf').focus(); });
	
	
	/*
	 * ------------------------------------------------------------------------------------------
	 * PRIVATE FUNCTIONS
	 * ------------------------------------------------------------------------------------------
	 */
	function _validateForm()
	{
		if ($('#user-tf').val() == '')
		{
			_showLoginError('Error', 'Introduce un usuario correcto');
			return false;
		}
		else if ($('#pass-tf').val() == '')
		{
			_showLoginError('Error', 'Introduce un password correcto');
			return false;
		}
		else
		{
			return true;
		}
	}
	
	function _showLoginError( header, body )
	{
		loginErrors = $('.modal-alert');
		loginErrors.modal({ show : false, keyboard : true, backdrop : true });
		
		$('.modal-alert .modal-header h3').text( header );
		$('.modal-alert .modal-body p').text( body );
		loginErrors.modal('show');
		
	}
})