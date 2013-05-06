/**
 * All user information object app needs.
 *
 */ 
var categories, db;
var COLLECTION  = 'categories';
var init_model	= require('../models/init_model.js');


/**
 * Establish data conection
 * 
 * Params 
 *  - app : App object has all aplication properties. 
 */
exports.init = function( _app )
{
	db = init_model.get_conection();
	categories = db.collection( COLLECTION );
}

/**
 * Get Categories to login form view
 * 
 * Params 
 *  - callback : Callback function to controller.  
 */ 
exports.getCategories = function( _callback )
{
	categories.find( 
		function(e, cursor) 
		{
			cursor.toArray( 
				function(err, object) 
				{ 
					if (object.length != 0)
					{
						_callback(null, object);
					}
					else
					{
						_callback(null);
					}
				}
			);
		}
	);
}

