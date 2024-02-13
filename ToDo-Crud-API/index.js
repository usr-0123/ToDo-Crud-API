import express from "express";
import bodyParser from "body-parser"
import dataDB from "./data/data.json" assert {type:"json"}

const app = express();
const port = 8000;

app.use(bodyParser.json())

app.get('/',(req,res) => {
    console.log(res)
    res.status(200).json(dataDB);
})

app.get('/todo/:id', (req,res)=>{
    const{id}=req.params
    const todo = dataDB.find(todo=>todo.id==id);
todo? res.status(200).json(todo):res.status(404).json({"message":"todo does not exist"})
})

app.get('/todo/status/:completed',(req,res)=>{
    const{completed}=req.params;
    const todo=dataDB.find(todo=>todo.completed==completed);
    todo?res.status(200).json(todo) : res.status(404).json({"message":"todo does not exist"});
})

app.post('/todo/add',(req, res)=>{
    const{todo,completed}=req.body;
   if (req.body) {
    let id=dataDB.length+1
    const updateddataDb=dataDB.push({id,todo,completed})
    res.status(201).json(dataDB)
}
   else{
    console.log(res.body);
    res.status(404).json({"message":"There are missing parameters"})
   }
})

app.put('/todo/:id',(req,res)=>{
    const{id}=req.params
    const{todo}=req.body
    let updated = false
    dataDB.forEach((todoItem,index)=>{
        if(todoItem.id==id){
                   todoItem.todo=todo            
            updated =true
        }
        else{
            return ({"msg":"no updates done"})
        }
    })
    if(updated){
     res.status(200).json(dataDB)
    }
    else{
        res.status(400).json("todo not found")
    }
})

app.delete ('/todo/:id',(req,res)=>{
    const{id}=req.params
    console.log(id);

    //chjeck if the id exists

    const todoBeDeleted=dataDB.find((todo)=>todo.id==id)

    if(todoBeDeleted){
        dataDB.splice(todoBeDeleted,1)[0]
        res.status(200).json({"message":"Deleted successful","data":dataDB})
    } 
     else    {
        res.status(400).json(dataDB)
     }
})

app.listen(port,() => {
    console.log(`Server is running on port http://localhost:${port}`);
})