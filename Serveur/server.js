"use strict";

var http = require('http');
var url = require("url");
var PORT = process.argv[2];
var fs = require("fs");
var querystring = require('querystring');


http.createServer(function(req, res){
  var my_Path = url.parse(req.url).pathname;
  var myPath = my_Path.slice(1, my_Path.length);
  var myUrl = url.parse(req.url);

  console.log("*******************************");
  console.log(myPath);

  if (myPath==""){
    res.writeHeader(200, {'Content-Type' :'text/html'});
    res.write('No request was asked.\n', 'utf8');
    res.end();
    return;
  }

  if (myPath=="exit"){
    res.writeHeader(200, {'Content-Type' :'text/html'});
    res.write('The Server will stop now.\n', 'utf8', process.exit, 0);
    res.end();
    return;
  }

  if (myPath.slice(0,6) == "files/"){
    if (myPath.includes("/../")){
      res.writeHeader(403, {"Content-Type":"text/html"});
      res.write('ERROR 403 Forbidden');
      res.end();
      return;
    }
    myPath = myPath.slice(6);
      if (!fs.existsSync(myPath)){
        res.writeHeader(404, {"Content-Type":"text/html"});
        res.write('ERROR 404 File Not Found');
        res.end();
        return;
      }
      else {
        var header = {};

        if (myPath.slice(-4)=='.jpg' || myPath.slice(-5) == "jpeg"){
          header["Content-Type"] = "image/jpeg";
        }

        if (myPath.slice(-4)=='.css'){
          header["Content-Type"] = "text/css";
        }

        if (myPath.slice(-5)=='.html'){
          header["Content-Type"] = "text/html";
        }

        if (myPath.slice(-3)=='.js'){
          header["Content-Type"] = "application/javascript";
        }

        if (myPath.slice(-5)=='.json'){
          header["Content-Type"] = "application/json";
        }

        if (myPath.slice(-4)=='.png'){
          header["Content-Type"] = "image/png";
        }

        if (myPath.slice(-4) == '.svg'){
          header["Content-Type"] = "image/svg+xml";
        }

        if (myPath.slice(-4)=='.txt'){
          header["Content-Type"] = "text/html";
        }

        fs.readFile(myPath, function(error, data) {
          if (error){
            res.writeHeader(500 , {"Content-Type": "text/plain, charset= UTF-8"});
            res.write(error + "\n");
            res.end();
          }
          else {
            res.writeHeader(200, header);
            res.write(data);
            res.end();
        }});

      }
       return;
    }
    if (myPath =="hello"){
      var name = querystring.parse(myUrl.query).name;
      res.writeHeader(200, {"Content-Type":"text/html; charset=UTF-8"});
      res.write('Hello '+name+'!');
      res.end();
      return;
    }

    if (myPath =="hello2"){
      var name = querystring.parse(myUrl.query).name;
      console.log(name);
      var names = "None";
      if (name !== undefined)
      {
        //WRITE HISTORY OF ALL USERS PREVIOUSLY CONNECTED
        if (fs.existsSync('names.txt'))
        {
          try
          {
            if (name.includes("</script>" ))
            {
              res.writeHeader(200 , {"Content-Type": "text/html, charset= UTF-8"});
              res.write('Name was filtered')
              res.end();
            }
            else
            {
            res.writeHeader(200 , {"Content-Type": "text/html, charset= UTF-8"});
            names = fs.readFileSync('names.txt', 'utf8').toString().replace(/\n/g, ", ");
            res.write('Hello '+name+', the following users have already visited this page:');
            res.write(names, 'utf-8');
            res.end();
          }
          }
          catch(err)
          {
            res.writeHeader(500 , {"Content-Type": "text/plain, charset= UTF-8"});
            res.write(err + "\n");
            res.end();
            }
          }

          //WRITE THE USER IN THE DATABASE FILE
          try
          {
            res.writeHeader(200 , {"Content-Type": "text/html, charset= UTF-8"});
            fs.writeFileSync('names.txt', name+"\n", {encoding: 'utf-8', flag: "a"});
            res.end();
          }
          catch(err)
          {
            res.writeHeader(500 , {"Content-Type": "text/plain, charset= UTF-8"});
            res.write(err + "\n");
            res.end();
          }
        }
        return;
     }

     if(myPath =="clear"){
       var names = "None";

       fs.writeFile('names.txt','', function(error){
        if (error)
        {
          res.writeHeader(500 , {"Content-Type": "text/plain, charset= UTF-8"});
          console.log('The file could not be deleted');
          res.write(error + "\n");
          res.end();
        }
        else
        {
          res.writeHeader(200 , {"Content-Type": "text/plain, charset= UTF-8"});
          res.write('The file was successfully deleted');
          console.log('The file was successfully deleted');
          res.end();
        }
      });
      return;
    }

}).listen(PORT, '127.0.0.1');

console.log('http://localhost:' + PORT);
