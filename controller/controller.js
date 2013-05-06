// --------------------------------------------------------------------
// --------------------------------------------------------------------
//          SHOPPING APP - CONTROLLER VIEWS
// --------------------------------------------------------------------
// --------------------------------------------------------------------

/**
 * In this file, are declared all controller functions aplication needs.
 * 
 * This file is called by require in entry file "app.js".
 */
var users_model = require('../models/users_model');
var shopping_model = require('../models/shopping_model');
var products = require('../models/products_model');
var categories = require('../models/categories_model');
var init_model	= require('../models/init_model.js');
var db;
 
module.exports = function (app, config) 
{
	// Init config and controller enviroments
	config.enviroments( app );
	controller.init( config, app );
	
	// GET CALLS
	app.get('/', controller.index);
	app.get('/register', controller.go_register);
	
	// POST CALLS
	app.post('/', controller.login);
	app.post('/shopping_list', controller.create_shopping_list);
	app.post('/register', controller.register);
	app.post('/historico', controller.historico);
	app.post('/list', controller.list);
	app.post('/delete_list', controller.delete_list);
	app.post('/delete_item', controller.delete_item);
	
	// Errors handling
	app.use(function(err, req, res, next)
	{
		console.error(err.stack);
		res.send(500, 'Something went wrong');
	});
}

/**
 * Objecto controller
 *
 * It has all functional methods.
 */
var controller = 
{
	config:null,
	
	/**
	 * Init configuration
	 * Params 
	 *  - _config : App configuration database connection.
	 *  - _app : Aplication data. 
	 */ 
	init: function ( _config, _app )
	{
		config = _config;
		init_model.init( _app ); // Init model in singelton pattern.
		users_model.init( _app ); // Init database collection users
		shopping_model.init( _app ); // Init database collection shopping_list
		categories.init( _app ); // Init database collection categories
		products.init( _app ); // Init database collection categories
	},
	
	/**
	 * Get user logged historic shopping list.
	 *
	 * Params 
	 *  - req : request
	 *  - res : response
	 */ 
	historico: function ( req, res ) 
 	{
 		shopping_model.getUserSpecificLists
		(
			req.cookies.id, 
			req.param('name-list-select-historic'),
			function(e, object)
			{
				if (e)
				{
					_send_error ( res, e );
				}
				else
				{
					res.render('historico', {
						data : object,
						name_list : req.param('name-list-select-historic')
					});
				}
			}
		);
	},
	
	/**
	 * Go register page
	 *
	 * Params 
	 *  - req : request
	 *  - res : response
	 */ 
	go_register: function ( req, res ) 
	{
		res.render('register');
	},
	
	/**
	 * Create shopping list. If user logged before, create in database. If not, create in local storage.
	 *
	 * Params 
	 *  - req : request
	 *  - res : response
	 */ 
	create_shopping_list: function ( req, res ) 
	{
		var list = 
		{
			categories 		: req.param('categorias'),
			products 		: req.param('productos'),
			measure			: req.param('measure'),
			x_geoposition	: req.param('jb_point'),
			y_geoposition	: req.param('kb_point'),
			realized	: 0
		};
		
		var user_stored_in_cookies_before = (req.cookies.user != undefined || req.cookies.pass != undefined);
		
		// Get name list from form...
		if (req.param('name-list-input') != "")
		{
			list.name_list = req.param('name-list-input');
		}
		else
		{
			list.name_list = req.param('name-list-select');
		}
		
		if (user_stored_in_cookies_before)
		{
			list.id_user	= req.cookies.id;
			list.user		= req.cookies.user;
			
			shopping_model.createList
			(
				list, 
				function(e)
				{
					if (e)
					{
						_send_error ( res, e );
					}
					else
					{
						res.send('Producto añadido a la lista de la compra >>>' + list.name_list + '<<<. Comprueba tu historico de compras', 200);
					}
				}
			);
		}
		else
		{
			list.user = 'anonymous';
			var user_list_in_cookies_not_exists = (req.cookies.user_list == undefined);
			
			if (user_list_in_cookies_not_exists)
			{
				res.cookie('user_list', list, { maxAge: 9000000 });
				res.send('Producto añadido a la lista de la compra. Registrate para realizar la compra', 200);
			}
			else
			{
				var text = 'Producto añadido a la lista >>>>> ' + req.cookies.user_list.name_list +' <<<<< .Solo puedes almacenar una lista de la compra de muestra. ';
				text += 'Registrate para realizar mas listas de la compra.';
				res.send(text, 200);
			}
		}
	},
	
	/**
	 * Get shopping list from COOKIE
	 *
	 * Params 
	 *  - req : request
	 *  - res : response
	 */ 
	list: function ( req, res )
	{
		var list;
		var user_stored_in_cookies_before = (req.cookies.user_list != undefined);
		
		if (user_stored_in_cookies_before)
		{
			list = req.cookies.user_list;
		}
		else
		{
			list = null;
		}
		
		res.render('listas', {
			obj_list : list
		});
	},
	
	/**
	 * User registration controller.
	 *
	 * Params 
	 *  - req : request
	 *  - res : response
	 */ 
	register: function ( req, res ) 
	{
		users_model.addNewAccount
		(
			{
				name 	: req.param('name'),
				email 	: req.param('email'),
				user 	: req.param('user'),
				pass	: req.param('pass')
			}, 
			function(e, data)
			{
				if (e)
				{
					_send_error ( res, e );
				}
				else
				{
					var user_list_in_cookies_exists = (req.cookies.user_list != undefined);
					
					// If user created free list before login, we insert this list to database.
					if (user_list_in_cookies_exists)
					{
						// Save real user nick and real user id.
						req.cookies.user_list.user		= data[0].user;
						req.cookies.user_list.id_user	= data[0]._id.toString();
						
						shopping_model.createList
						(
							req.cookies.user_list, 
							function(e)
							{
								if (e)
								{
									_send_error ( res, e );
								}
								else
								{
									res.send('ok', 200);
								}
							}
						);
					}
					
					res.send('ok', 200);
				}
			}
		);
	},
	
	/**
	 * Delete user list.
	 *
	 * Params 
	 *  - req : request
	 *  - res : response
	 */ 
	delete_list: function ( req, res ) 
	{
		shopping_model.delete_list
		(
			req.param('name_list'), 
			function(e)
			{
				if (e)
				{
					_send_error ( res, e );
				}
				else
				{
					res.send('Lista borrada >>>' + req.param('name_list') + '<<<', 200);
				}
			}
		);
	},
	
	/**
	 * Delete list item
	 *
	 * Params 
	 *  - req : request
	 *  - res : response
	 */ 
	delete_item: function ( req, res ) 
	{
		shopping_model.delete_item
		(
			req.param('id_item'), 
			req.param('name_list'),
			function(e)
			{
				if (e)
				{
					_send_error ( res, e );
				}
				else
				{
					res.send('Item borrado en >>>' + req.param('name_list') + '<<<', 200);
				}
			}
		);
	},
	
	/**
	 * Delete cookie list
	 *
	 * Params 
	 *  - req : request
	 *  - res : response
	 */ 
	delete_cookie_list: function ( req, res ) 
	{
		res.clearCookie('user_list');
	},
	
	/**
	 * User login process
	 *
	 * Params 
	 *  - req : request
	 *  - res : response
	 */ 
	login: function ( req, res ) 
	{
		users_model.manualLogin( req.param('user'), req.param('pass'), 
			function(e, o)
			{
				// User not exist
				if (!o)
				{
					_send_error ( res, e );
				}
				else
				{
					// Add user to session
					req.session.user = o;
					
					// If user checked remember ckeck before
					if (req.param('remember-me') == 'true')
					{
						res.cookie('id', o._id, { maxAge: 9000000 });
						res.cookie('user', o.user, { maxAge: 9000000 });
						res.cookie('pass', o.pass, { maxAge: 9000000 });
					}
					
					_send_ok ( o, res ); // Send http 200 found
				}
			}
		);
	},
	
	/**
	 * HOME PAGE
	 *
	 * Params 
	 *  - req : request
	 *  - res : response
	 */ 
	index: function ( req, res ) 
	{
		// If user selected logout or come from register
		var request_logout_param = req.query["logout"] == '1';
		// If user came from register page
		var request_register = req.query["register"] == '1';
		
		if (request_register)
		{
			res.clearCookie('user_list');
		}
		
		if (request_logout_param)
		{
			res.clearCookie('id');
			res.clearCookie('user');
			res.clearCookie('pass');
		}
		
		// Get categories and products and render view.
		categories.getCategories
		( 
			function(e, categories_ddbb)
			{
				if (e)
				{
					_send_error ( res, e );
				}
				else
				{
					// Get categories and products.
					products.getProducts
					( 
						function(e, products_ddbb)
						{
							if (e)
							{
								_send_error ( res, e );
							}
							else
							{
								var user_not_stored_not_logged = (req.cookies.user == undefined || req.cookies.pass == undefined);
								
								if (user_not_stored_not_logged)
								{
									_go_not_stored_home( req, res, products_ddbb, categories_ddbb );
								}
								else
								{
									// Get user list stored in database
									shopping_model.getUserLists
									(
										req.cookies.id, 
										function(e, user_lists)
										{
											var name_list = _get_distinct_shopping_list_names( user_lists );
											
											if (e)
											{
												_send_error ( res, e );
											}
											else
											{
												_go_stored_home( req, res, products_ddbb, categories_ddbb, name_list );
											}
										}
									);
								}
							}
						}
					);
				}
			}
		);
	}
};

// --------------------------------------------------------
// PRIVATE FUNCIONS
// --------------------------------------------------------

function _get_distinct_shopping_list_names( user_lists )
{
	var name_list = new Array();
	if (user_lists != null)
	{
		for (var i=0;i<user_lists.length;i++)
		{
			if (name_list.length == 0)
			{
				name_list.push(user_lists[i].name_list);
			}
			else
			{
				var found = false;
				for (var j=0;j<name_list.length;j++)
				{
					if (user_lists[i].name_list == name_list[j] && !found) 
					{
						found = true;
					}
				}
				
				if (!found)
				{
					name_list.push(user_lists[i].name_list);
				}
			}
		}
	}
	
	return name_list;
}

function _go_not_stored_home( req, res, products_ddbb, categories_ddbb )
{
	var user_lists;
	
	// Check if user has list in cookie.
	if (req.cookies.user_list != null)
	{
		user_lists = req.cookies.user_list.name_list;
	}
	else
	{
		user_lists = null;
	}
	
	res.render('login', {
		logged : 'false',
		categories: categories_ddbb,
		products: products_ddbb,
		user_lists : user_lists
	});
}

function _go_stored_home( req, res, products_ddbb, categories_ddbb, name_list )
{
	// Try automatic login
	users_model.autoLogin(req.cookies.user, req.cookies.pass, 
		function( object )
		{
			if (object != null)
			{
			    req.session.user = object;
				res.render('login', {
					user	: req.cookies.user,
					logged	: 'true',
					categories: categories_ddbb,
					products: products_ddbb,
					user_lists : name_list
				});
			}
			else
			{
				res.render('login', {
					logged : 'false',
					categories: categories_ddbb,
					products: products_ddbb,
					user_lists : name_list
				});
			}
		}
	);
}

function _send_error ( res, e )
{
	res.send(e, 400);
}

function _send_ok ( o, res )
{
	res.send(o, 200);
}

