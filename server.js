let express = require('express')
let app, server,
	path = require('path'),
    port = process.env.PORT || 3000,
    public = path.resolve(__dirname + "/public");
app = express();
app.use(express.static(public));

//Handle git on the server:


const simpleGit = require('simple-git')(path.resolve(__dirname));

// console.log(simpleGit.status());
simpleGit.commit('Add new data from server again')
simpleGit.push("origin", "master")
console.log("Pushed")
// console.log(simpleGit.branchLocal);


// try{
// 	simpleGit.clone("https://github.com/jameshosken/useless-data.git", "github-files")
// }
// catch(e){
// 	console.log(simpleGit.branchLocal);
// 	// simpleGit.clone("https://github.com/jameshosken/useless-data.git")
// }


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

	handleNewData(user, res);
	
	
})

app.get('*', function(req,res){
	res.send("No data at this URL");
})

//Start server
server = app.listen(process.env.PORT || 3000);
console.log('Server started', process.env.HOST || '127.0.0.1', process.env.PORT || 3000);
    console.log('Root directory', public);
    console.log('Press Ctrl+C to exit...\n');


////////////////////////////
////////////////////////////

function readContents(user, res){
	try{
		let fileContents = "";
		fs.readFile('data/raw.txt', function(err, buf )  {
				//fileContents += buf.toString();
				fileContents += buf.toString();
				if(fileContents.length > 0){
					console.log('>>> file found')
			  		console.log("READING: " + fileContents);
			  		writeContents(fileContents, user, res)
			  		//Todo parse from JSON
				}	
		});
	}catch(e){
		//No file?
		console.log('>>> no file found')
		writeContents("", user);
	}
}

function writeContents(originalContents, user, res){
	console.log("Writing File");

	//Append new data to content
	//Overwrite previous file if exists
	let outputData = originalContents + JSON.stringify(user) + ",";

	//Todo parse to JSON
	fs.writeFile('data/raw.txt', outputData, function(err, data){
	    if (err) console.log(err);
	    console.log("Successfully Written to File:");
	    console.log(outputData);


	    //After contents are written, commit changes
		simpleGit.add('data/raw.txt')
		simpleGit.commit("Add new data from server")
		console.log("Successfully commited changes")

		//Finally push to origin
		simpleGit.push(origin, master)
		console.log("Successfully pushed to origin!")

	});
}



function handleNewData(user, res){

	//First fetch latest data
	simpleGit.fetch(origin);
	console.log("fetching remote")

	//Then change data
	readContents(user, res);

}
