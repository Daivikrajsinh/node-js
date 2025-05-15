let http = require("http")
let PORT = 8080;
let fs = require("fs");

http.createServer((req, res) => {
    let filename = ""
    switch (req.url) {
        case "/": filename = "home.html";
        break;

        case "/about":filename ="about.html";
        break;

        case "/services":filename = "services.html";
        break;

        case "/contact" : filename = "contact.html";
        break;
        
        default:
            break;
    }
    fs.readFile(filename, (err, data) => {
        if (!err) {
            res.end(data)
        }
    })
})
    .listen((PORT), (error) => {
        if (error) {
            console.log("Server is not connected");
            return;
        }
        console.log("Server is Connected",PORT)
    })