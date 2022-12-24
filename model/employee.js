const mongoose =require('mongoose');

const Schema =mongoose.Schema({
    name:String,
    location:String,
    position:String,
    salary:Number
});

const Employee=mongoose.model('employee',Schema);
module.exports=Employee;