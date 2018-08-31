var express         = require("express"),
    mongoose        = require("mongoose"),
    bodyParser      = require("body-parser"),
    app             = express();

//import modules
var Todo = require("./todoSchema");

//intial use and conenction
mongoose.connect("mongodb://localhost:27017/todo_db")
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//create some initial data
// Todo.create({
//     text: "Do laundry",
//     created: new Date()
// })

var lists = [
        {text: "list 1", created: "Mar 17"},
        {text: "list 2", created: "Apr 22"},
        {text: "list 3", created: "May 30"},
        {text: "list 4", created: "June 14"},
    ]

//index route
app.get("/", function(req, res){
    res.redirect("/home");
})

//home route
app.get("/home", function(req, res){
    Todo.find({}, function(err, todos){
        if (err){
            console.log(err)
        } else {
            res.render("home", { lists: todos })
        }
    })
})

//listen to server port
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Listening to port................")
})