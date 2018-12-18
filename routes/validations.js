var express  = require('express');
var router = express.Router();
var Validation = require('../models/validation');
var crypto = require('crypto');
var otpGenerator = require('otp-generator');
var md5 = require('md5');


router.post('/code', function(req, res){
    let number = req.body.number;
    let country = req.body.country;
    let code = otpGenerator.generate(6, { specialChars: false, alphabets:false, upperCase:false });    

    let validation = new Validation({
        number: number,
        country: country
    });
    Validation.addValidation(validation, function(err, validation){
       if(err)  throw err;
    //    var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
        var algorithm = 'aes-128-ecb';
        var key = '$-&Aahj!.n12=.@';
        var cipher = crypto.createCipher(algorithm, key);  
        var encrypted = cipher.update(code, 'utf8', 'hex') + cipher.final('hex');
        // var decipher = crypto.createDecipher(algorithm, key);
        // var decrypted = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
        // console.log(encrypted);
        // console.log(decrypted);
       global.newValidation(validation._id, validation.number, encrypted, validation.country)
       res.json({ code:md5(code) });
    })
 });

module.exports = router;