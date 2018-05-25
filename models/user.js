const mongoose = require('mongoose'),
      bcrypt  = require('bcrypt-nodejs');

// user schema
var userSchema = new mongoose.Schema({
    local           : {         // credentials that will be used for signing up and logging in
        email       : String,
        username    : String,
        password    : String
    },

    firstName            : String,
    lastName             : String
});

// generates a hash
userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checks if password is valid
userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.local.password);
};

// export model
module.exports = mongoose.model("User", userSchema);
