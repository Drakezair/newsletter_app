const express = require("express");
const nodemailer = require("nodemailer");
const Newletter = require("../models/newsletter");
const Recipient = require("../models/recipient");
const RecipientList = require("../models/recipient_list");
const MailModel = require("../models/mail");

const router = express.Router();
const template = require("../helpers/mail");

const transporter = nodemailer.createTransport({
  host: "smtp.freesmtpservers.com", //HOST
  port: 25, // Port
  secure: false,
});

router.post("/single", async (req, res) => {
  try {
    let newsletter = await Newletter.findById(req.body.newsletter);
    let recipient = await Recipient.findById(req.body.recipient);
    let message = {
      from: newsletter?.email_config,
      to: recipient.email,
      subject: `${newsletter.name} - test`,
      html: template(
        `Hi ${recipient.first_name}`,
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer malesuada eros ut ligula accumsan cursus. Suspendisse fermentum quis erat a interdum. Duis et elementum risus, eget scelerisque diam",
        newsletter?.name,
        newsletter?.image,
        `http://localhos:3001/uns/${recipient?._id}`
      ),
    };

    let mail = await MailModel.create({
      from: newsletter?.email_config,
      to: recipient.email,
    });

    if (req?.body?.attach) {
      message.attachments = [{ path: req?.body?.attach }];
      mail.attach = req?.body?.attach;
      await mail.save();
    }

    newsletter.mails.push(mail?._id);
    await newsletter.save();
    await transporter.sendMail(message);
    res.send(mail);
  } catch (err) {
    res.status(400).send({ msg: err });
  }
});

router.post("/multi", async (req, res) => {
  try {
    let newsletter = await Newletter.findById(req.body.newsletter);
    let recipientList = await RecipientList.findById(
      req.body.recipient_list
    ).populate("recipients");

    recipientList.recipients.map(async (item) => {
      let message = {
        from: newsletter?.email_config,
        to: item.email,
        subject: `${newsletter.name} - test`,
        html: template(
          `Hi ${item.first_name}`,
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer malesuada eros ut ligula accumsan cursus. Suspendisse fermentum quis erat a interdum. Duis et elementum risus, eget scelerisque diam",
          newsletter?.name,
          newsletter?.image,
          `http://localhos:3001/uns/${item?._id}`
        ),
      };

      let mail = await MailModel.create({
        from: newsletter?.email_config,
        to: item.email,
      });

      if (req?.body?.attach) {
        message.attachments = [{ path: req?.body?.attach }];
        mail.attach = req?.body?.attach;
        await mail.save();
      }

      newsletter.mails.push(mail?._id);
      await newsletter.save();
      await transporter.sendMail(message);
    });

    res.send(true);
  } catch (err) {
    res.status(400).send({ msg: err });
  }
});

module.exports = router;
