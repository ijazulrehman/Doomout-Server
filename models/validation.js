var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var Schema = mongoose.Schema;
var SchemaTypes = Schema.Types;

var validationSchema = new Schema({
    number:{
        type: String
    },
    country:{
        type:String
    },
    status:{
        type:String
    }    
});

 validationSchema.plugin(timestamps);
//  feedbackSchema.index({location: '2dsphere'});

var Validation = module.exports = mongoose.model('Validation', validationSchema); 

module.exports.addValidation = function(validation, callback){
    validation.save(callback);
}


module.exports.updateStatus = function(validation_id, newStatus, callback){
    console.log(validation_id);
    Validation.findByIdAndUpdate(
        validation_id,
        {
          $set: {
            status: newStatus
          }
        },
        callback
      );
}