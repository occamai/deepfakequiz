var http = require('https');
var fs = require('fs');

var nonce = "16yu43";

var server = http.createServer (

	/*
	{
	  key: fs.readFileSync('/Users/george/Desktop/BLACKHAT/ssl/private-key.pem'),
	  cert: fs.readFileSync('/Users/george/Desktop/BLACKHAT/ssl/252239439.crt'),
	  ca: fs.readFileSync('/Users/george/Desktop/BLACKHAT/ssl/252239439.ca-bundle')
	},
	*/

	{
	  key: fs.readFileSync('/home/ubuntu/ssl/private-key.pem'),
	  cert: fs.readFileSync('/home/ubuntu/ssl/252239439.crt'),
	  ca: fs.readFileSync('/home/ubuntu//ssl/252239439.ca-bundle')
	},

    	function(request,response){

	    console.log("got request",request.method);

	    if(request.method == "GET")
	    {
			console.log("get");
                        response.setHeader('Access-Control-Allow-Origin', '*');
                        response.setHeader('Access-Control-Request-Method', '*');
                        response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
                        response.setHeader('Access-Control-Allow-Headers', request.headers.origin);
                        response.setHeader('Access-Control-Allow-Headers', 'authorization, content-type');
                        response.writeHead(200,{"Content-Type":"text\plain"});

		    response.end("received GET request.")
	    }
	    else if(request.method == "POST")
	    {
		console.log("post");
		var query = require('url').parse(request.url,true).query;
		console.log("query", query.id);

		let body = '';
		request.on('data', chunk => {
			body += chunk.toString(); // convert Buffer to string
			console.log("chunk");
		});
		request.on('end', () => {
			console.log("body",body);

			obj = JSON.parse(body);
			console.log(obj);

			if ( obj.nonce != nonce ) {
				console.log("nonce check failed.");
				response.end("invalid POST request.");
				return;
			}

			dt = new Date().getTime()
			fs.writeFileSync("./data/results_" + obj.id + "_" + dt, body,{encoding:'utf8',flag:'w'})
			console.log("wrote file");

			response.setHeader('Access-Control-Allow-Origin', '*');
			response.setHeader('Access-Control-Request-Method', '*');
			response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
			response.setHeader('Access-Control-Allow-Headers', request.headers.origin);
			response.setHeader('Access-Control-Allow-Headers', 'authorization, content-type');
			response.writeHead(200,{"Content-Type":"text\plain"});
			response.end("received POST request.");
		})
	    }
	    else if(request.method == "OPTIONS" )
	    {
		console.log("option", request.headers.origin);
		response.setHeader('Access-Control-Allow-Origin', '*');
		response.setHeader('Access-Control-Request-Method', '*');
		response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
		response.setHeader('Access-Control-Allow-Headers', request.headers.origin);
		response.setHeader('Access-Control-Allow-Headers', 'authorization, content-type');
		if ( request.method === 'OPTIONS' ) {
			response.writeHead(200);
			response.end();
			return;
		}
	    }
	    else
	    {
		    response.end("Undefined request .");
	    }
});

server.listen(3001);
console.log("Server running...");
