var express = require('express');
var fs = require('fs');
var app = express();

app.get('/', function(req, res){
	fs.readFile('index.html', function(err, file) {
		res.setHeader('Content-Type', 'text/html');
		res.setHeader('Content-Length', file.length);
		res.end(file);
	});
});


app.use('/lib', express.static('lib'));
app.use('/resource', express.static('resource'));
app.use('/scripts', express.static('scripts'));

var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log("Listening on " + port);
});