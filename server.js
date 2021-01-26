const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const url = require('url');
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();

app.use(cors());
app.use(cookieParser());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

require("./router.js")(app);

// simple route
app.get("/", (req, res) => {
    res.writeHead(200, {'Content-Type':'text/html'})
    fs.readFile('index.html',function(error, data){
        if(error){
            res.writeHead(404);
            res.write('page not found');
        }
        else {
            res.write(data);
        }

        res.end();
    });
});

app.get("/*?.css", (req, res) => {
    res.writeHead(200, {'Content-Type':'text/css'})
    let file=__dirname + req.url;
    fs.readFile(file,function(error, data){
        if(error){
            res.writeHead(404);
            res.write('page not found');
        }
        else {
            res.write(data);
        }

        res.end();
    });

});

app.get("/*?.js", (req, res) => {
    res.writeHead(200, {'Content-Type':'application/javascript'})
    let file=__dirname + req.url;
    fs.readFile(file,function(error, data){
        if(error){
            res.writeHead(404);
            res.write('page not found');
        }
        else {
            res.write(data);
        }

        res.end();
    });
});

app.get("/*?.jpg", (req, res) => {
    res.writeHead(200, {'Content-Type':'image/jpeg'})
    let file=__dirname + req.url;
    fs.readFile(file,function(error, data){
        if(error){
            res.writeHead(404);
            res.write('page not found');
        }
        else {
            res.write(data);
        }

        res.end();
    });
});

// set port, listen for requests
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
