import 'dotenv/config'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  // host: 'smtp.gmail.com',
  // port: 465,
  service: "gmail",
  auth: {
  user: "barrycumbie@gmail.com",
  pass: process.env.GOOGLE_APP_PASSWORD,
    },
  secure: true, // true => TLS on connection (SMTPS)
 
  tls: {
    // don't override ciphers unless you know what you're doing
    // rejectUnauthorized: true // default true; set false only for testing with self-signed certs
  }
});
// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "barrycumbie@gmail.com",
//       pass: process.env.GOOGLE_APP_PASSWORD,
//     },
//     tls: {
//         ciphers:'SSLv3'
//     }
//   });

try {
   
    console.log('tryin');
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: 'bcumbie@una.edu',
      subject: 'CIS 486 MEGA POP QUIZ POINTZZZZ',
      text: 'Hi Barry.'
    };

    
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error('Error:', error);
      } else {
        console.log('Email sent:', info.response)
      }
    });
 
        console.log('transporrter set ');
  } catch (error) {
    console.error('Error in /register:', error);
    res.status(500).send("Internal Server Error");
  } 
