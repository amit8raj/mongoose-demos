/**
 * Created by amitraj on 30/6/14.
 */
var mongoose = require('mongoose');
var urlTest="mongodb://localhost/testMongoose";
console.log("node js server started and practice is being done")
mongoose.connect(urlTest,function(err){
    if(err)
    console.log("error occurred");
    else
    console.log("no error occurred...connection created");
})

var userSchema=new mongoose.Schema({
    name:{type:String,index:{unique:true}},
    age:{type:Number,min:18,max:30}
});


var newUsers = mongoose.model('Users',userSchema)
var SampleUser = new newUsers({
    name:'Amit',
    age:24
})

SampleUser.save(function(err){
    if(err)
    console.log("error occured while saving the file");
    else
    console.log("data saved successfully");
})

newUsers.find({}).sort({age:1}).limit(0).exec(function(err,result){
 if(err)
 console.log("error while finding data")
    else
 console.log("data found successfully" + result);
})

newUsers.update({name:'Amit'},{name:'vineeta',age:23}).exec(function(err,result){
    if(err)
    console.log("error while updating");
    else
    console.log("no error...successfully updated"+result);
});


newUsers.where('age').select('age').gte(20).exec(function(err,result){
    if(err)
    console.log("new way of updation not working");
    else
    console.log("working fine....new way worked"+result);
})