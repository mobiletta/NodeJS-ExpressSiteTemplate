
/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
}); 

app.get('/', routes.index);
app.get('/users', user.list);

const server = http.createServer(app);
const io = require('socket.io')(server);

io.on("connection", function (socket) {
    setInterval(function () {
      socket.emit('servermessage', Math.floor((Math.random() * 100000)));
    }, 1000);
  });

/* const getApiAndEmit = async socket => {
  try {
    socket.emit('servermessage', Math.floor((Math.random() * 100000)));
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
}; */

/* const getApiAndEmit = async socket => {
  try {
    const res = await axios.get("https://api.darksky.net/forecast/PUT_YOUR_API_KEY_HERE/43.7695,11.2558");
    socket.emit("FromAPI", res.data.currently.temperature);
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
}; */
server.listen(app.get('port'), () => console.log("Listening on port %s", app.get('port')));

module.exports = app;


