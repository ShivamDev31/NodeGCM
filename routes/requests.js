/**
 * Created by shivamchopra on 24/03/16.
 */

var request = require('request');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'gcm_test'
});

connection.connect();

exports.login = function (name, mobile_no, reg_id, callback) {
    var details = {
        name: name,
        mobileNo: mobile_no,
        regId: reg_id
    };

    // a statement to select user with mobile no
    var queryStm = ('select * from users where mobile_no=', mobileNo);

    var query = connection.query(queryStm, function (err, rows) {
        // if no users return with mobile number then insert a user with that mobile no
        if (rows.length == 0) {
            var query = connection.query('insert into users set ? ', details, function (err, rows) {
                callback({'response': "Sucessfully Registered"});
            });
        } else {
            callback({'response': "User already Registered"});
        }
    });
}

exports.getUser = function (mobileNo, callback) {
    var query = connection.query('select * from users', function (err, rows) {
        if (rows == 0) {
            callback({'response': "No registered users"});
        } else {
            callback(removeUser(rows, mobileNo));
        }
    });
}

exports.removeUser = function (mobileNo, callback) {
    var queryStm = "delete from users where mobile_no=" + mobileNo;
    connection.query(queryStm, function (err, callback) {
        if (!err) {
            callback({'response': "Removed Sucessfully"});
        } else {
            callback({'response': "Error"});
        }
    });
}

exports.send = function (fromName, fromu, to, message, callback) {
    var queryStm = 'select * from users where mobile_no =' + to;

    connection.query(queryStm, function(err, rows) {
        if (rows == 0) {
            callback({'response' : "Failure while sending message"});
        } else {
            var toId = rows[0].reg_id;
            var name = rows[0].name;
            request({
                method:'POST',
                uri: 'https://android.googleapis.com/gcm/send',
                headers : {
                    'Content-Type': 'application/json',
                    'Authorization':'key=Ap8JldMmFDVyxZ8'
                },
                body: JSON.stringify({
                    "registration_ids" : [toId],
                    "data" : {
                        message : message,
                        fromu : fromu,
                        name : fromName
                    },
                    "time_to_live" : 108
                })
            }, function (error, response, callback) {
                callback({'response' : "Successfully sent gcm message"});
            });
        }
    });
}

function removeUser(arr, val) {
    for(var i=0; i<arr.length; i++) {
        if(arr[i].mobileNo == val) {
            arr.splice(i, 1);
            return arr;
            break;
        }
    }
}