const { Schema, model } = require("mongoose");
const Recipient = require("./recipient");
const recipientListSchema = new Schema({
  name: { type: String, required: true, unique: true },
  recipients: [{ type: Schema.Types.ObjectId, ref: "Recipient" }],
  created_at: { type: Date, required: true, default: Date.now },
});

const recipientListModel = model("recipientlist", recipientListSchema);
module.exports = recipientListModel;
