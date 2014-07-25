/**
 * Created by amitraj on 30/6/14.
 */
//Requiring mongoose module
var mongoose = require('mongoose');
var async = require("async");
var urlTest="mongodb://localhost/intelligrape";
console.log("Node js server started and CURD practice is being done");

//Creating connection to database
mongoose.connect(urlTest,function(err,result)
{
    if(err)
    {
        console.log("Error occurred while connecting to database ad error is :" + err);
    }
    else
    {
        console.log("No error occurred...Database connection is done");
    }
})

//Creating schema
var userSchema=new mongoose.Schema(
{
    Name:{type:String},
    Age:{type:Number,min:18,max:30},
    Designation:{type:String},
    Salary:{type:Number},
    Address:{type:String},
    ContactNumber:{type:Number}
});

//Mapping schema and collection
var newUsers = mongoose.model('Users',userSchema)

//Inserting values
var SampleUser= new newUsers(
{
    Name:'Amit',
    Age:24,
    Designation:'Trainee',
    Salary: 10000,
    Address:"Laxminagar",
    ContactNumber:9654049268
})

//Saving to database
function funSavingToDb()
{
    SampleUser.save(function(err)
    {
        if(err)
        {
            console.log("Error occurred while saving the file and error is : " +err);
        }
        else
        {
            console.log("Data saved successfully...");
        }
    })
}

//Updating value
function funUpdateValue()
{
    newUsers.update({Name:'Amit'},{Name:'Kushal',Age:29,Designation:'Vertical Head',Salary:100000,Address:'Delhi',ContactNumber:9999999999}).exec(function(err,result)
    {
        if(err)
        {
            console.log("Error while updating the collection and error is : " +err);
        }
        else
        {
            console.log("Updated done successfully and data is " + result );
        }
    });
}

//Reading the values
function funReadData()
{
        newUsers.where('Age').select({Name:1,Age:1,Designation:1}).exec(function(err,result)
        {
            if(err)
            {
                console.log("Reading of data not working "+err);
            }
            else
            {
                console.log("Reading of data done successfully and data is : " +result);
            }
        })
}


//Deleting database
function funDeleteDatabase()
{
    mongoose.connection.dropDatabase();
}

//Deleting session
function funDeleteSession()
{
    db.collection('session',function(err, collection){
        collection.remove({
                "expire": {"$lte": Date.now()}
            },
            function(err, removed)
            {
                if(err)
                {
                    console.log("There was some error while deleting the records and error is :" +err);
                }
                else
                {
                    console.log("Collection deleted successfully" +removed);
                }
            });
    });
}

//Deleting single collection from database
function funRemoveSingleCollection()
{
    mongoose.remove({}, function(err)
    {
        if(err)
        {
            console.log("You have encountered some error while removing one collection and error is :" +err);
        }
        else
        {
        console.log("A single collection has been removed");
        }
    });
}


//Copying to other database
function funCopyToDb()
{
    mongoose.connection.copyDatabase()
    console.log("Your Database is being copied to new Database");
}

//async function calls
async.series([funUpdateValue(),funSavingToDb(),funReadData(),funDeleteDatabase(),funDeleteSession(),funRemoveSingleCollection(),unCopyToDb],function(err,result)
{
    if(err)
    {
        console.log("There was an error while running the code asynchronously and error is :" +err);
    }
    else
    {
        console.log("You have successfully completed the async call");
    }
});


console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
console.log("PROGRAM executed successfully");