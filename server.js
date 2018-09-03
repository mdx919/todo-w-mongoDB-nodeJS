var express         = require("express"),
    mongoose        = require("mongoose"),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    app             = express();

//import modules
var Todo = require("./todoSchema");

//intial use and conenction
mongoose.connect("mongodb://localhost:27017/todo_db")
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));


//create some initial data
// Todo.create({
//     text: "Do laundry",
//     created: new Date()
// })

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

//posting new todo
app.post("/home", function(req, res){
  Todo.create(req.body.todo, function(err, newTodo){
        if(err){
            console.log(err)
            res.render("home")
        } else {
            res.redirect("home")
        }
    })  
})

//deleting todo
app.delete("/home/:id", function(req, res){
    Todo.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log("error",err)
            console.log(req.params.id)
            res.redirect("/home")
        } else {
            res.redirect("/home")
        }
    })
})

//editing todo
app.get("/home/:id/edit", function(req, res) {
    Todo.findById(req.params.id, function(err, foundTodo){
        if(err) {
            console.log(err)
            res.redirect("/home")
        } else {
            res.render("edit", { todo: foundTodo })
        }
    })
})

//updating todo
app.put("/home/:id", function(req, res){
    Todo.findByIdAndUpdate(req.params.id, req.body.todo, function(err, updatedTodo){
        if(err){
            console.log(err);
            res.redirect("/edit")
        } else {
            res.redirect("/home")
        }
    })
})

//listen to server port
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Listening to port................")
})