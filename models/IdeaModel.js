const crypto = require('crypto');
const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
  ipAddress: { type: String },
  comment : String ,
  profile: {
    name: String,
    gender: String,
    location: String,
    website: String,
    email : String ,
    emailVerified : Boolean,
    picture: String
  }
}, 
{ timestamps: true });


/**
 * Helper method for getting user's gravatar.
 */
 ideaSchema.methods.gravatar = function gravatar(size) {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

const  Idea = mongoose.model('Ideas', ideaSchema);

module.exports =  Idea;