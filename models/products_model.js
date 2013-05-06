/**
 * All user information object app needs.
 *
 */ 
var products, db;
var COLLECTION  = 'products';
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
	products = db.collection( COLLECTION );
}

/**
 * Get Categories to login form view
 * 
 * Params 
 *  - callback : Callback function to controller.  
 */ 
exports.getProducts = function( _callback )
{
	products.find( 
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

