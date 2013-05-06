/**
 * All user information object app needs.
 *
 */ 
var shopping_list, db;
var moment 		= require('moment');
var COLLECTION  = 'shopping_list';
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
	shopping_list = db.collection( COLLECTION );
}

/**
 * Create shopping list in database
 * 
 * Params 
 *  - listData : Object with list data
 *  - callback : Callback function to controller.  
 */ 
exports.createList = function( listData, callback )
{
	listData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
	shopping_list.insert(listData, {safe: true}, callback);
}

/**
 * Get User list from user
 * 
 * Params 
 *  - _id : User to get data
 *  - callback : Callback function to controller.  
 */ 
exports.getUserLists = function( _id, _callback )
{
	shopping_list.find({id_user:_id},
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

/**
 * Get User specific list from user
 * 
 * Params 
 *  - _id : User to get data
 *  - _list : List to get data
 *  - callback : Callback function to controller.  
 */ 
exports.getUserSpecificLists = function( _id, _list, _callback )
{
	shopping_list.find({id_user:_id, name_list:_list},
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

/**
 * Delete list from shopping table
 * 
 * Params 
 *  - _list : List to remove from database
 *  - callback : Callback function to controller.  
 */ 
exports.delete_list = function( _list, _callback )
{
	shopping_list.remove({name_list:_list}, _callback);
}

/**
 * Delete item list from shopping table
 * 
 * Params 
 *  - _id : id to remove from database
 *  - _list : _list to remove from database
 *  - callback : Callback function to controller.  
 */ 
exports.delete_item = function( id, _list, _callback )
{
	shopping_list.remove({_id : _getObjectId(id), name_list:_list}, _callback);
}

// ---------------------------------------
//  PRIVATE FUNCTION
// ---------------------------------------

var _getObjectId = function(id)
{
	return shopping_list.db.bson_serializer.ObjectID.createFromHexString(id)
}
