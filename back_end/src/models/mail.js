const { Schema, model } = require("mongoose");

const MailSchema = new Schema({
  from: { type: String, required: true, unique: false },
  to: { type: String, required: true, unique: false },
  attach: { type: String },
  created_at: { type: Date, required: true, default: Date.now },
});

const MailModel = model("mail", MailSchema);
module.exports = MailModel;
