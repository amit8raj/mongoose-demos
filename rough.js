/**
 * Created by amitraj on 04/07/14.
 */
//Requiring mongoose module
var mongoose = require('mongoose');
var async = require("async");

//Creating connection to first database
db = mongoose.createConnection('localhost', 'test');
db.on('error', function () {
console.log('Error! Database connection failed to first database.');
});
db.on('open', function (argument) {
console.log('Database connection established! to first database');
db.db.collectionNames(function (error, names) {
        if (error) {
            console.log('Error: '+ error);
        } else {
            console.log(names);
        };
    });
});

//Creating connection to second database
dbnew =mongoose.createConnection('localhost', 'copytest');
dbnew.on('error', function () {
    console.log('Error! Database connection failed to second database.');
});
dbnew.on('open', function (argument) {
    console.log('Database connection established! to second database');
    dbnew.db.collectionNames(function (error, names) {
        if (error) {
            console.log('Error: '+ error);
        } else {
            console.log(names);
        };
    });
});


//Creating connection to database
//    mongoose.connect(urlTest,function(err,result)
//    {
//
//        {
//            console.log("Error occurred while connecting to database and error is :" + err);
//        }
//        else
//        {
//            console.log("No error occurred...Database connection is done");
//        }
//    })

//Creating schema
var userSchema=new mongoose.Schema(
    {
        Name:{type:String, unique:true},
        Age:{type:Number,min:18,max:40},
        Salary:{type:Number}
    });

//Mapping schema to collection and saving the data
var newUsers = db.model('Users',userSchema)
var newCopyUsers = dbnew.model('persons',userSchema)
for(var i=0;i<10;i++)
{
obj = new newUsers({
    Name:'Amit'+i,
    Age:24+i,
    Salary: 10000+(i*500)
    })
    obj.save(function(err)
    {
        if(err)
        console.log("you have an error" + err);
    });
}
var errCheck=[];
newUsers.find({}).exec(function(err,copy)
{
    for(var i=0;i<copy.length;i++)
    {
        errCheck.push((copy))
        var emp=new newCopyUsers(copy[i])
        emp.save(function(err)
        {
            if(err)
            console.log("You have an error during copy and error is :" +err);
        })
    }
})


    async.series(errCheck,
        function (err,result) {
            if (err)
                console.log("You have an error in the program :" + err);
            else
                console.log("You have successfully copied the database");
        });

//Inserting values
/*function insertToDb()
{
    SampleUser=[];
    for(var i=0;i<10;i++)
    {
        SampleUser[i]= new newUsers(
        {
        Name:'Amit'+ i,
        Age:24 + i,
        Salary: 10000 + (i*500)
        })
    }
}
insertToDb();*/
//obj.save();
//Saving to database
//function funSavingToDb()
//{
//    for(var i;i<10;i++)
//    {
//    SampleUser.save(function(err)
//    {
//        if(err)
//        {
//            console.log("Error occurred while saving the file and error is : " +err);
//        }
//        else
//        {
//            console.log("Data saved successfully...");
//        }
//    })
//    }
//}
//funSavingToDb();

//Reading the values
//function funReadData()
//{
//    newUsers.where('Age').select({Name:1,Age:1,Designation:1}).exec(function(err,result)
//    {
//        if(err)
//        {
//            console.log("Reading of data not working "+err);
//        }
//        else
//        {
//            console.log("Reading of data done successfully and data is : " +result);
//        }
//    })
//}



var array = [];
for (var i = 0; i < u.length; i++) {
    array.push((function (data) {
        return function (callback) {
            new employeeModel1(data).save(function (err) {
                if (err) {
                    callback(err)
                    return
                }
                console.log(data);
                callback();
            })
        }
    })(u[i]))
}
//    for (var i = 0; i < array.length; i++) {
//        console.log(array[i])
//        // array.push(new employeeModel1(u[i]))
//    }
//    //
async.series(array,
    function (err) {
        if (err)
            console.log("error at final stage:" + err);
        else
            console.log("database copied");
    });