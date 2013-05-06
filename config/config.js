// --------------------------------------------------------------------
// --------------------------------------------------------------------
//          SHOPPING APP - CONFIG OBJECT
// --------------------------------------------------------------------
// --------------------------------------------------------------------

/**
 * In the start command line, add "NODE_ENV" and this process reads the correct database enviroment.
 * Config enviroment.
 */

module.exports = 
{
	enviroments: function ( app ) 
	{
		// DEV enviroment
		if ('dev' == process.env.NODE_ENV) 
		{
			// MONGOLAB_URI: mongodb://heroku_app15518339:to2qo7p3f9fkuvam4jro6o1tev@ds063177.mongolab.com:63177/heroku_app15518339
			app.set('dbHost', 'ds063177.mongolab.com');
			app.set('dbPort', 63177);
			app.set('dbName', 'heroku_app15518339');
			app.set('user', 'heroku_app15518339');
			app.set('password', 'to2qo7p3f9fkuvam4jro6o1tev');
		}
		
		// localhost enviroment.
		if ('localhost' == process.env.NODE_ENV) 
		{
			app.set('user', 'pepe');
			app.set('password', '');
			app.set('dbHost', 'localhost');
			app.set('dbPort', 27017);
			app.set('dbName', 'shopping');
		}
	}
};