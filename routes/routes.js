/**
 * Created by shivamchopra on 25/03/16.
 */

var requests = require('./requests');
var request = require('request');

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.end("Node Android GCM project");
    });
    app.post('/login', function (req, res) {

        var name = req.body.name;
        var mobileNo = req.body.mobile_no;
        var regId = req.body.reg_id;

        requests.login(name, mobileNo, regId, function (found) {
            console.log(found);
            res.json(found);
        });
    });

    app.post('/send', function (req, res) {
        var fromName = req.body.from_name;
        var fromU = req.body.fromu;
        var to = req.body.to;
        var message = req.body.message;

        requests.send(fromName, fromU, to, message, function (found) {
            console.log(found);
            res.json(found);
        });
    });

    app.post('/getUser', function (req, res) {
        var mobileNo = req.body.mobile_no;

        requests.getUser(mobileNo, function (found) {
            console.log(found);
            res.json(found);
        });
    });

    app.post('/logout', function (req, res) {
        var mobileNo = req.body.mobile_no;

        requests.removeUser(mobileNo, function (found) {
            console.log(found);
            req.json(found);
        });
    });
}