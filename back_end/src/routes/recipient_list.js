const express = require("express");
const RecipientList = require("../models/recipient_list");
const Recipient = require("../models/recipient");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const recipient = await RecipientList.create(req.body);
    res.send(recipient);
  } catch (err) {
    res.status(400).send({ msg: err });
  }
});

router.post("/add_recipient/:id", async (req, res) => {
  try {
    const recipient = await Recipient.create(req.body);
    let recipientList = await RecipientList.findById(req.params.id);

    recipientList.recipients.push(recipient._id);
    await recipientList.save();
    res.send(recipientList);
  } catch (err) {
    res.status(400).send({ msg: err });
  }
});

router.get("/", async (req, res) => {
  try {
    const recipient = await RecipientList.find().populate("recipients");
    res.send(recipient);
  } catch (err) {
    res.status(400).send({ msg: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const recipient = await RecipientList.findByIdAndDelete(req.params.id);
    res.send(recipient);
  } catch (err) {
    res.status(400).send({ msg: err });
  }
});

module.exports = router;
