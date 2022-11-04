var mongo = require("mongoose");  
var db =   
mongo.connect("mongodb://0.0.0.0:27017/addressBook", function(err, response){  
   if(err){ console.log('Failed to connect to ' + err); }  
   else{ console.log('Connected to ' + db, ' + ', response); }  
});  
   
module.exports = db;  
