$(document).ready(function(){
	
	$('#account-form').ajaxForm(
	{
		beforeSubmit : function(formData, jqForm, options)
		{
			return _validateForm();
		},
		success : function(responseText, status, xhr, $form)
		{
			if (status == 'success') 
				$('.modal-alert').modal('show');
		},
		error : function(e)
		{
			if (e.responseText == 'usedemail')
			{
			    _showInvalidEmail();
			}
			else if (e.responseText == 'usedname')
			{
			    _showInvalidUserName();
			}
		}
	});
	
	$('#name-tf').focus();
	
	/*
	 * ------------------------------------------------------------------------------------------
	 * BIND EVENTS
	 * ------------------------------------------------------------------------------------------
	 */
	$('#account-form-btn1').click(function(){ window.location.href = '/';});
	$('.modal-alert #ok').click(function(){ setTimeout(function(){window.location.href = '/?register=1';}, 300)});
	
	/*
	 * ------------------------------------------------------------------------------------------
	 * MODALS
	 * ------------------------------------------------------------------------------------------
	 */
	$('.modal-alert').modal({ show : false, keyboard : true, backdrop : 'static' });
	$('.modal-alert .modal-header h3').text('Registrado!');
	$('.modal-alert .modal-body p').html('El registro se ha realizado con exito');
	
	alert = $('.modal-form-errors');
	alert.modal({ show : false, keyboard : true, backdrop : true});
	
	/*
	 * ------------------------------------------------------------------------------------------
	 * PRIVATE FUNCTIONS
	 * ------------------------------------------------------------------------------------------
	 */
	function _validateForm()
	{
		var e = [];
		
		$('#name-cg').removeClass('error');
		$('#email-cg').removeClass('error');
		$('#user-cg').removeClass('error');
		$('#pass-cg').removeClass('error');
		
		if (_validateName($('#name-tf').val()) == false) 
		{
			$('#name-cg').addClass('error'); 
			e.push('Por favor introduce tu nombre');
		}
		if (_validateEmail($('#email-tf').val()) == false) 
		{
			$('#email-cg').addClass('error'); 
			e.push('Introduce un email válido');
		}
		if (_validateName($('#user-tf').val()) == false) 
		{
			$('#user-cg').addClass('error');
			e.push('Por favor elige un username válido');
		}
		if (_validatePassword($('#pass-tf').val()) == false) 
		{
			$('#pass-cg').addClass('error');
			e.push('El password tiene que ser de al menos 6 caracteres');
		}
		if (e.length) 
			_showErrors(e);
		return e.length === 0;
	}
	
	function _showInvalidUserName()
	{
		$('#user-cg').addClass('error');
		_showErrors(['El usuario ya fue usado.']);
	}
	
	function _showInvalidEmail()
	{
		$('#email-cg').addClass('error');
		_showErrors(['El email ya fue usado.']);
	}
	
	function _showErrors(a)
	{
		$('.modal-form-errors .modal-body p').text('Hay estos errores en el formulario :');
		$('.modal-form-errors .modal-body ul').empty();
		for (var i=0; i < a.length; i++) 
			$('.modal-form-errors .modal-body ul').append('<li>'+a[i]+'</li>');
		alert.modal('show');
	}
	
	function _validateEmail(e)
	{
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(e);
	}
	
	function _validatePassword(s)
	{
		if ($('#userId').val() && s==='')
		{
			return true;
		}
		else
		{
			return s.length >= 6;
		}
	}
	
	function _validateName(s)
	{
		return s.length >= 3;
	}
})