/**
 * All user information object app needs.
 *
 */ 
var dao			= require('../helpers/dao');
var db;


/**
 * Establish data conection
 * 
 * Params 
 *  - app : App object has all aplication properties.
 *  - collection : Collection to connect 
 */
exports.init = function( app, collection )
{
	db = dao.initialize( app, db );
}

/**
 * Get data connection
 * 
 */
exports.get_conection = function()
{
	return db;
}