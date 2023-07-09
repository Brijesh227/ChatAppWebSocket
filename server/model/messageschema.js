const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    messageText: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    groupName: {
      type: String,
      required: true,
      enum: ['IT', 'Sales', 'HR'],
    }
},{
  timestamps: true
});

module.exports = mongoose.model('Message', messageSchema);
