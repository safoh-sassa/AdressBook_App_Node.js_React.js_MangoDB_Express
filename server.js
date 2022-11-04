var express = require("express");  
var path = require("path");  
var bodyParser = require('body-parser');   
require("./config.js");  
  
var app = express();  
var port = process.env.port || 5000;  
var srcpath  =path.join(__dirname,'/public') ;  
app.use(express.static('public'));  
app.use(bodyParser.json({limit:'5mb'}));    
app.use(bodyParser.urlencoded({extended:true, limit:'5mb'}));  
  
  
var mongoose = require('mongoose');  
var Schema = mongoose.Schema;  
var personSchema = new Schema({      
    name: { type: String   },       
    address: { type: String   },     
    email: { type: String },       
    contact: { type: String },       
},{ versionKey: false });  
   
  
var model = mongoose.model('person', personSchema, 'person');  
  
//Select All
app.get("/api/getdata",function(req,res){   
 model.find({},function(err,data){  
            if(err){  
                res.send(err);  
            }  
            else{             
                res.send(data);  
                }  
        });  
})  
  
  
//Delete
app.post("/api/Removedata",function(req,res){   
 model.remove({ _id: req.body.id }, function(err) {  
            if(err){  
                res.send(err);  
            }  
            else{    
                   res.send({data:"Record has been Deleted..!!"});             
               }  
        });  
})  
  
  
//Update
app.post("/api/Updatedata",function(req,res){   
 model.findByIdAndUpdate(req.body.id, { name:  req.body.name, address: req.body.address, contact: req.body.contact,email:req.body.email },   
function(err) {  
 if (err) {  
 res.send(err);  
 return;  
 }  
 res.send({data:"Record has been Updated..!!"});  
 });  
})    
  
  
//Insert
app.post("/api/savedata",function(req,res){   
       
    var mod = new model(req.body);  
        mod.save(function(err,data){  
            if(err){  
                res.send(err);                
            }  
            else{        
                 res.send({data:"Record has been Inserted..!!"});  
            }  
        });  
})  
      
//Call index.html page  
app.get("*",function(req,res){   
    res.sendFile(srcpath +'/index.html');  
})  
  

app.listen(port,function(){   
    console.log("server start on port"+ port);  
})  