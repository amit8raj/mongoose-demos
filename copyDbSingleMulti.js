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
            console.log('Error: ' + error);
        } else {
            console.log(names);
        }
        ;
    });
});

//Creating connection to second database
dbnew = mongoose.createConnection('localhost', 'copytest');
dbnew.on('error', function () {
    console.log('Error! Database connection failed to second database.');
});
dbnew.on('open', function (argument) {
    console.log('Database connection established! to second database');
    dbnew.db.collectionNames(function (error, names) {
        if (error) {
            console.log('Error: ' + error);
        } else {
            console.log(names);
        }
        ;
    });
});

//Creating schema
var userSchema = new mongoose.Schema(
    {
        Name: {type: String, unique: true},
        Age: {type: Number, min: 18, max: 40},
        Salary: {type: Number}
    });

var userSchema1 = new mongoose.Schema(
    {
        companyName: {type: String, unique: true},
        openingYear: {type: Number, min: 1900, max: 2014},
        turnover: {type: Number, min: 10000}
    });

//Mapping schema to collection and saving the data
var newUsers = db.model('Users', userSchema)
var newUsers1 = db.model('company', userSchema1)
var newCopyUsers = dbnew.model('persons', userSchema)
var newCopyUsers1 = dbnew.model('organization', userSchema1)

//Entering information to first original table
function insertToFirstCollection(callback) {
    for (var i = 0; i < 10; i++) {
        obj = new newUsers({
            Name: 'Amit' + i,
            Age: 24 + i,
            Salary: 10000 + (i * 500)
        })
        obj.save(function (err) {
            if (err)
                console.log("you have an error" + err);
        });
    }
    callback();
}


//Entering information to second original table
function insertToSecondCollection(callback) {
    for (var i = 0; i < 10; i++) {
        obj1 = new newUsers1({
            companyName: 'Amit' + i + i + 'abc',
            openingYear: 1930 + (i * 18) / 2,
            turnover: 10000 + (i * 2500)
        })
        obj1.save(function (err) {
            if (err)
                console.log("you have an error" + err);
        });
    }
    callback();
}


//Copying first original collection to other database
function copyingFromFirstCollection(callback) {
    newUsers.find({}).exec(function (err, copy) {
        for (var i = 0; i < copy.length; i++) {
            var emp = new newCopyUsers(copy[i])
            emp.save(function (err) {
                if (err)
                    console.log("You have an error during copy and error is :" + err);
            })
        }
        console.log("You have successfully copied the data from first collection");
    })
    callback();
}

//Copying second original collection to other database
function copyingFromSecondCollection(callback) {
    newUsers1.find({}).exec(function (err, copynew) {
        for (var j = 0; j < copynew.length; j++) {
            var emp1 = new newCopyUsers1(copynew[j])
            emp1.save(function (err) {
                if (err)
                    console.log("You have an error during copy and error is :" + err);
            })
        }
        console.log("You have successfully copied the data from the second collection");
    })
    callback();
}

//Calling function in own way
async.series([async.parallel([insertToFirstCollection, insertToSecondCollection],
    function (err, result) {
        if (err)
            console.log(err);
        else
            console.log(result);

    }
),
    async.parallel([copyingFromFirstCollection, copyingFromSecondCollection],
        function (err, result) {
            if (err)
                console.log(err);
            else
                console.log(result);
        }
    )],
    function (err, result) {
        console.log("hello");
        if (err) {
            console.log(err);
        }
        else
            console.log(result);
    })
