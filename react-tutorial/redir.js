var http = require('http');
var fs = require('fs');
 
// create a http server
http.createServer(function (req, res) {
    var filePath = req.url.substring(1);
    fs.readFile(filePath,
        function(err, data) { 

		console.log("GOT HTTP, redir...", filePath);
            // if there is an error reading the file, redirect it to page-b.html
            if (err){
                // redirect to page-b.html with 302 HTTP code in response
                res.writeHead(302, { "Location": "https://test.deepfakequiz.com" });
                return res.end();
            }
            res.writeHead(200);
            res.write(data.toString('utf8'));
            return res.end();
    });
}).listen(80);
