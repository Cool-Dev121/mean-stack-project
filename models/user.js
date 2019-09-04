const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const userSchema = new Schema({
        email: { type: String, required: true, unique: true, lowercase: true},
        username: { type: String, required: true, unique: true, lowercase: true},
        password: { type: String, required: true },
        saltSecret: {type: String}
  });

  userSchema.pre('save', function(next)  {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            if(err) throw error;
            this.password = hash;
            this.saltSecret = salt;
            next();
          });
    });    
  });

  userSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  userSchema.methods.generateJwt = function() {
    return jwt.sign({ _id: this._id },
            config.JWT_SECRET,
            {
              expiresIn: config.JWT_EXP
            });
  }


  /* module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
  }

  module.exports.getUserByUsername = function(username, callback){
    const query = {username: username};
    User.findOne(query, callback);
  } */

  
  module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if(err) throw err;
      callback(null, isMatch);
    });
  }

  module.exports = User = mongoose.model('user', userSchema);
  ;
  