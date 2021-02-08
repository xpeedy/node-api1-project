// BUILD YOUR SERVER HERE
const express = require("express")
const generate = require("shortid").generate
const model = require("../api/users/model")

const app = express();
app.use(express.json())

let users = [
    {id:generate(), name:"hairo", bio:"Web Dev"},
]

app.get("/api/users", (req, res)=>{
    model.find().then((users)=>{
        res.status(200).json(users)
    })
    .catch((err)=>{
        res.status(500).json({message:`server error: ${err.message}`})
    })
})

app.get("/api/user/:id",(req,res)=>{
    const id = req.params.id;
    model.findById(id).then((user) => {
        if(!user) {
            res.status(404).json({message:"not found"})
        }else {
            res.status(200).json(user)
        }
    })
    .catch(() =>{
        res.status(500).json({message:`the user information fail to load`})
    })
})

app.post("/api/user", (req,res)=>{
    const {name,bio} = req.body
    model.insert({name,bio}).then(() => {
        if(!name || !bio){
            res.status(404).json({message:`enter name and bio`})
        }else{
            res.status(201).json()
        }
    })
    .catch(err =>{
        res.status(500).json({message:`server error 500`})
    })
})

app.put("/api/user/:id",(req, res)=>{
    const {id} = req.params;
    const body = req.body;
    model.update(id,body).then((update) =>{
        if(!body.name || !body.bio){
            res.status(400).json({message:`enter changes`})
        }else{
            res.status(200).json(update)
        }
    })
    .catch((err) =>{
        res.status(500).json({message:`server error 500`})
    })
})

app.delete("/api/user/:id",(req,res)=>{
    const id = req.params.id;
    model.remove(id).then(() =>{
        if(!id){
            res.status(404).json({message:`user doesn't exit`})
        }else{
            res.status(200).json({message:`user deleted`})
        }
    })
    .catch((err)=>{
        res.status(500).json({message:`server error: ${err.message}`})
    })
})

app.use("*",(req,res)=>{
    res.status(404).json({message:"404 Not found"})
})
module.exports = app; // EXPORT YOUR SERVER instead of {}
