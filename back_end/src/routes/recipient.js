const express = require("express");
const Recipient = require("../models/recipient");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const exist = await Recipient.findOne({ email: req.body.email }).exec();
    if (exist) {
      res.send(exist);
    } else {
      const recipient = await Recipient.create(req.body);
      res.send(recipient);
    }
  } catch (err) {
    res.status(400).send({ msg: err });
  }
});

router.get("/", async (req, res) => {
  try {
    const recipients = await Recipient.find();
    res.send(recipients);
  } catch (err) {
    res.status(400).send({ msg: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const recipient = await Recipient.findById(req.params.id);
    res.send(recipient);
  } catch (err) {
    res.status(400).send({ msg: err });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const recipient = await Recipient.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.send(recipient);
  } catch (err) {
    res.status(400).send({ msg: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const recipient = await Recipient.findByIdAndDelete(req.params.id);
    res.send(recipient);
  } catch (err) {
    res.status(400).send({ msg: err });
  }
});
router.get("uns/:id", async (req, res) => {
  try {
    const recipient = await Recipient.findByIdAndDelete(req.params.id);
    res.send(recipient);
  } catch (err) {
    res.status(400).send({ msg: err });
  }
});



module.exports = router;
