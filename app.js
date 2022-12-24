// Task1: initiate app and run server at 3000
const express = require("express");
const app = new express();
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Import Model file
const Employee = require('./model/employee');

const path = require('path');
app.use(express.static(path.join(__dirname + '/dist/FrontEnd')));

// Task2: create mongoDB connection 
mongoose.connect('mongodb+srv://pvshafeeq:5wb35gEKSC6eMJfa@cluster0.4bum7bd.mongodb.net/EmployeeDB?retryWrites=true&w=majority');

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below







//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.send(employees);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});


//TODO: get single data from db  using api '/api/employeelist/:id'
app.get('/api/employeelist/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        res.send(employee);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})


//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.post('/api/employeelist', async (req, res) => {
    const data = new Employee({
        name: req.body.name,
        location: req.body.location,
        position: req.body.position,
        salary: req.body.salary
    });

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
})


//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete('/api/employeelist/:id', (req, res) => {
        const id = req.params.id;
        const data = req.body;
        Employee.findOneAndDelete({"_id":id},data,(err,data)=>{
            if(err){
                res.json({"status":"Error","Error":err})
            }
            else
            {
                let msg=`Employee with Name ${data.name} has been deleted.`;
                res.json({"status":"Success","Message":msg})
            }
        });
    });
   

//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist', (req,res)=>{
    var id =req.body._id;
    var data = req.body;

    Employee.updateOne({"_id":id},data,(err,data)=>{
        if(err){
            res.status(400).json({ message: err.message });
        }
        else
        {
           res.json({"status":"Updated", "Data":data})
        }
    })
})

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

app.listen(3000, () => {
    console.log('Server started at port 3000');
});



