let express = require('express')
let app, server,
	path = require('path'),
    port = process.env.PORT || 3000,
    public = path.resolve(__dirname + "/public");
app = express();
app.use(express.static(public));

//User agent parsing
var useragent = require('useragent');

//File system
var fs = require('fs');

//Routes
app.get('/', function(req,res){

	console.log('New visit!');

	let user = {
		agent: useragent.parse(req.header('user-agent')), // User Agent we get from headers
		referrer: req.header('referrer'), //  Likewise for referrer
		ip: req.header('x-forwarded-for') || req.connection.remoteAddress, // Get IP - allow for proxy
	};

	console.log(user);

	try{
		let fileContents = "";
		fs.readFile('data/raw.txt', function(err, buf )  {
				//fileContents += buf.toString();
				fileContents += buf.toString();
				if(fileContents.length > 0){
					console.log('>>> file found')
			  		console.log("READING: " + fileContents);
			  		writeContents(fileContents, user)
			  		//Todo parse from JSON
				}	
		});
	}catch(e){
		//No file?
		console.log('>>> no file found')
		writeContents("", user);
	}
	res.sendfile('index.html');
})

app.get('*', function(req,res){
	res.send("No data at this URL");
})

//Start server
server = app.listen(process.env.PORT || 3000);
console.log('Server started', process.env.HOST || '127.0.0.1', process.env.PORT || 3000);
    console.log('Root directory', public);
    console.log('Press Ctrl+C to exit...\n');


function writeContents(originalContents, user){
	console.log("Writing File");

	//Append new data to content
	//Overwrite previous file if exists
	let outputData = originalContents + JSON.stringify(user) + ",";

	//Todo parse to JSON
	fs.writeFile('data/raw.txt', outputData, function(err, data){
	    if (err) console.log(err);
	    console.log("Successfully Written to File:");
	    console.log(outputData);
	});

	//Todo commit new content to github and push to master.
	//This'll be easy, right?
}

