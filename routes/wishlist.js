var express  = require('express');
var router = express.Router();
var Wishlist = require('../models/doomout-wishlist');



router.post('/', function(req, res){
    if(req.body.name && req.body.email){
      let newWish = new Wishlist({
          name: req.body.name,
          email: req.body.email
      }) 
      Wishlist.addWish(newWish, function(err, wish){
          if(err) throw err
          res.send(wish);
      })
    }else{
        res.status(400).send();
    }
 });

module.exports = router;