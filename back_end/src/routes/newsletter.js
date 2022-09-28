const express = require("express");
const Newletter = require("../models/newsletter");
const Recipient = require("../models/recipient");
const RecipientList = require("../models/recipient_list");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newsletter = await Newletter.create(req.body);
    res.send(newsletter);
  } catch (err) {
    res.status(400).send({ msg: err });
  }
});

router.get("/", async (req, res) => {
  try {
    const newsletter = await Newletter.find().populate("recipients");
    res.send(newsletter);
  } catch (err) {
    res.status(400).send({ msg: err });
  }
});

router.post("/:id/recipient", async (req, res) => {
  try {
    const recipient = await Recipient.create(req.body);
    let newsletter = await Newletter.findById(req.params.id);
    newsletter?.recipients.push(recipient?._id);
    await newsletter.save();

    res.send(newsletter);
  } catch (err) {
    res.status(400).send({ msg: err });
  }
});

router.post("/:id/recipient_list", async (req, res) => {
  try {
    const recipientList = await RecipientList.create(req.body);
    let newsletter = await Newletter.findById(req.params.id);
    newsletter?.recipient_lists.push(recipientList?._id);
    await newsletter.save();

    res.send(newsletter);
  } catch (err) {
    res.status(400).send({ msg: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let newsletter = await Newletter.findById(req.params.id).populate(
      "recipients"
    );

    const lists = await Promise.all(
      newsletter.recipient_lists.map(async (item) =>
        RecipientList.findById(item).populate("recipients")
      )
    );

    const data = {
      ...newsletter._doc,
      recipient_lists: lists.filter((item) => item !== null),
    };

    res.send(data);
  } catch (err) {
    res.status(400).send({ msg: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const newsletter = await Newletter.findByIdAndDelete(req.params.id);
    newsletter.recipients.map(async (item) => {
      await Recipient.findByIdAndDelete(item);
    });
    res.send(newsletter);
  } catch (err) {
    res.status(400).send({ msg: err });
  }
});

module.exports = router;
