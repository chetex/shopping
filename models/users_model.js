/**
 * All user information object app needs.
 *
 */ 
var crypto 		= require('crypto');
var moment 		= require('moment');
var db, users;
var COLLECTION  = 'users';
var init_model	= require('../models/init_model.js');


/**
 * Establish data conection
 * 
 * Params 
 *  - app : App object has all aplication properties. 
 */
exports.init = function( app )
{
	db = init_model.get_conection();
	users = db.collection( COLLECTION );
	
}

/**
 * Autologin validation methods
 * 
 * Params 
 *  - user : user nick
 *  - pass : user password
 *  - callback : Callback function to controller.  
 */ 
exports.autoLogin = function( user, pass, callback )
{
	users.findOne({user:user}, 
		function(e, object) 
		{
			if (object)
			{
				object.pass == pass ? callback(object) : callback(null);
			}
			else
			{
				callback(null);
			}
		}
	);
}

/**
 * Form login validation methods
 * 
 * Params 
 *  - user : user nick
 *  - pass : user password
 *  - callback : Callback function to controller.  
 */ 
exports.manualLogin = function(user, pass, callback)
{
	users.findOne({user:user}, 
		function(e, o) 
		{
			// Check user first and password before.
			if (o == null)
			{
				callback('user-not-found');
			}
			else
			{
				_validatePassword(pass, o.pass, 
					function(err, res) {
						if (res)
						{
							callback(null, o);
						}
						else
						{
							callback('invalid-password');
						}
					}
				);
			}
		}
	);
}

/**
 * Record insert user into table
 * 
 * Params 
 *  - newData : user object
 *  - callback : Callback function to controller.  
 */
exports.addNewAccount = function( newData, callback )
{
	// Check if user exist before
	users.findOne({user:newData.user}, 
		function(e, o) 
		{
			if (o)
			{
				callback('usedemail');
			}
			else
			{
				// Check if email exist before.
				users.findOne({email:newData.email}, 
					function(e, o) 
					{
						if (o)
						{
							callback('usedname');
						}	
						else
						{
							// User not exist. Protect password md5.
							_saltAndHash(newData.pass, function(hash){
								newData.pass = hash;
								newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
								users.insert(newData, {safe: true}, callback);
							});
						}
					}
				);
			}
	});
}

/*
 * ------------------------------------------------------------------------------------------
 * PRIVATE FUNCTIONS. (LIBRARY ENCRYTPO)
 * ------------------------------------------------------------------------------------------
 */

var _generateSalt = function()
{
	var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
	var salt = '';
	for (var i = 0; i < 10; i++) {
		var p = Math.floor(Math.random() * set.length);
		salt += set[p];
	}
	return salt;
}

var _md5 = function(str) {
	return crypto.createHash('md5').update(str).digest('hex');
}

var _saltAndHash = function(pass, callback)
{
	var salt = _generateSalt();
	callback(salt + _md5(pass + salt));
}

var _validatePassword = function(plainPass, hashedPass, callback)
{
	var salt = hashedPass.substr(0, 10);
	var validHash = salt + _md5(plainPass + salt);
	callback(null, hashedPass === validHash);
}
