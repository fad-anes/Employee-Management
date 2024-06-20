import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const Employee = new Schema({
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      position: {
        type: String,
        required: true,
      },
      department: {
        type: String,
      },
      salary: {
        type: Number,
      },
    });

module.exports = mongoose.model('Employee', Employee);