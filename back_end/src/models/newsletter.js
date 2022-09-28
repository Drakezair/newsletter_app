const { Schema, model } = require("mongoose");

const NewsletterSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true, unique: true },
  image: { type: String },
  recipients: [{ type: Schema.Types.ObjectId, ref: "Recipient" }],
  recipient_lists: [{ type: Schema.Types.ObjectId, ref: "Recipientlist" }],
  mails: [{ type: Schema.Types.ObjectId, ref: "Mails" }],
  email_config: { type: String, required: true },
  created_at: { type: Date, required: true, default: Date.now },
});

const NewsletterModel = model("newsletter", NewsletterSchema);
module.exports = NewsletterModel;
