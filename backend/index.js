const express = require ('express');
const { createTodo, updateTodo} = require('./types');
const { todo } = require('./db');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.post('/todo', async function (req, res) { //this is an async function becasue it will take time to send the date to db
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    if(!parsedPayload.success){
        res.status(411).json({
            msg : " You have sent wrong inputs"
        }) 
        return;
    }

    //put in db
    await todo.create({
        title : createPayload.title,
        description : createPayload.description, 
        compeleted : false
    })

    res.json({
        msg : "Todo have been created"
    })
})

app.get('/todos', async function(req,res){
    const todos = await todo.find({}) // we do not need to put any thing inside it coz we want it all
    res.json({
        todos 
    })
})


app.put('/completed', async function(req, res) {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg : " You have sent wrong inputs"
        })
        return;
    }

    await todo.update({
        _id : req.body.id
    }, {
        completed : true
    })

    res.json({
        msg : "Todo completed"
    })
})

// app.delete('/delete', (req, res) => {
//     console.log("hello i am deleting this todo");
// })

app.listen(5000);