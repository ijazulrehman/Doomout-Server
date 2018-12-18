var express  = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res){
    if(global.sockets.length > 0){
        res.sendFile(path.join(__dirname+'/../service-available.html'));
    }else{
        res.sendFile(path.join(__dirname+'/../service-interrupted.html'));
    }
});

module.exports = router;