// --------------------------------------------------------------------
// --------------------------------------------------------------------
//          SHOPPING APP - DAO OBJECT
// --------------------------------------------------------------------
// --------------------------------------------------------------------

/**
 * In this file, are declared all dao functions aplication needs.
 * This functions are like all database connections, and querys.
 *
 * This file is called by require in models file "models/models.js".
 *
 */

var MongoDB 	= require('mongodb').Db;
var Server 		= require('mongodb').Server;

module.exports = 
{
	/** Initializa mongodb dao vars */
	initialize: function ( app, _db ) 
	{
		_db = new MongoDB(app.get('dbName'), new Server(app.get('dbHost'), app.get('dbPort'), {auto_reconnect: true}), {w: 1});
		
		_db.open(
			function(e, d){
				if (e) 
				{
					console.log(e);
				}
				else
				{
					_db.authenticate(app.get('user'), app.get('password'));
					console.log('Connected to database :: ' + app.get('dbName'));
				}
			}
		);
		
		return _db;
	}
};