// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  username: { type: String, unique: true, default: function() {
    return this.name.toLowerCase().replace(/\s+/g, '') + Date.now();
  }}
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);