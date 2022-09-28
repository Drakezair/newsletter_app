const { Schema, model } = require("mongoose");

const recipientSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  created_at: { type: Date, required: true, default: Date.now },
});

const recipientModel = model("Recipient", recipientSchema);
module.exports = recipientModel;
