// --------------------------------------------------------------------
// --------------------------------------------------------------------
//          SHOPPING APP - MAIN ENTRY POINT
// --------------------------------------------------------------------
// --------------------------------------------------------------------

/**
 * Node.js Shopping app
 *
 * Declare module dependencies
 */
var express = require('express')
  , http = require('http')
  , path = require('path')
  , app = express()
  , config = require('./config/config.js');

/**
 * Declare enviroments.
 */
app.configure(function()
{
	app.set('views', __dirname + '/views'); 
	app.set('port', process.env.PORT || 3000);
	app.set('view engine', 'jade');
	app.engine('html', require('ejs').renderFile);
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.session({ secret: 'shopping_session' }));
	app.use(app.router);
	app.use(express.methodOverride());
	app.use(require('stylus').middleware(__dirname + '/public'));
	app.use(express.static(path.join(__dirname, 'public')));
});

require('./controller/controller.js')(app, config);

/**
 * INIT SERVER
 */
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
