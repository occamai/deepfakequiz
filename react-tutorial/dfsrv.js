var http = require('http');
var fs = require('fs');

var server = http.createServer ( function(request,response){

    console.log("got request",request.method);

    if(request.method == "GET")
    {
		console.log("get");
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

		fs.writeFileSync("./data/results_" + obj.id, body,{encoding:'utf8',flag:'w'})
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
