import 'dotenv/config'
import nodemailer from "nodemailer";


// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "jason.conkle5@gmail.com",
        pass: process.env.nodemailerPass,
    },
    tls: {
        ciphers: SSLv3
    }
  });

  try {
    const mailOptions = {
      from: process.env.nodemailerEmail,
      to: "jason.conkle5@gmail.com",
      subject: 'Pop Quiz',
      text: `text`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error('Error:', error);
        res.status(500).send("Failed to send email");
      } else {
        console.log('Email sent:', info.response);
        res.json({success : req.body.emailBody, status : 200, info: info.response});
      }
    });
 
  } catch (error) {
    console.error('Error in /register:', error);
    res.status(500).send("Internal Server Error");
  }