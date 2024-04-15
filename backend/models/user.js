// Import necessary modules from mongoose and bcryptjs
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Create a schema for users
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Encrypt password before saving it to the database
UserSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12); // Hash the password with a salt round of 12
  }
  next(); // Go to the next middleware
});

// Export the model so it can be used in other parts of your project
module.exports = mongoose.model('User', UserSchema);
