// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

AWS.config.loadFromPath('./awsconfig.json');



var db = new AWS.DynamoDB();

var item = {
    "id": {"S": "212fwerfes34"},
    "mail": {"S": "2pol@pipo.nl"},
    "name": {"S": "Sjaakie de Clown nummer 2"},
    "group": {"S": "438mfrow8e44o89"}
}


db.putItem({TableName: 'peeps', Item: item}, function(err, data){
    if (err) {
    console.log(err); // an error occurred
    } else {
    console.log(data); // successful response
    }
});

