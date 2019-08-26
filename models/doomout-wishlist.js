var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var Schema = mongoose.Schema;
var SchemaTypes = Schema.Types;

var validationSchema = new Schema({
    name:{
        type: String
    },
    email:{
        type:String
    }
});

 validationSchema.plugin(timestamps);
//  feedbackSchema.index({location: '2dsphere'});

var Wishlist = module.exports = mongoose.model('Wishlist', validationSchema); 

module.exports.addWish = function(wish, callback){
    wish.save(callback);
}


