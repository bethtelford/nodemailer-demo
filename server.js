require('dotenv').config();
const express = require('express'),
      bodyParser = require('body-parser'),
      nMailer = require('nodemailer'),
      PORT = 4000;

const app = express();
app.use(bodyParser.json());

app.get('/api/test', (req, res) => {
  console.log('server responding');
  res.status(200).send();
});


app.post('/api/mail', (req, res) => {
  let email = req.body;
  console.log('service:', process.env.SERVICE, 'email:', process.env.USEREMAIL, 'password:', process.env.USERPASS);
  console.log('req.body', req.body);

  let transporter = nMailer.createTransport({
    // Note to Self: When using the Gmail service and authentication you must go into your Google account settings and allow less-secure apps
    // for this to work
    service: process.env.SERVICE,
    auth: {
      user: process.env.USEREMAIL,
      pass: process.env.USERPASS
    }
  });

  let mailOptions = {
    from: `Myself <${ process.env.USEREMAIL }>`,
    to: email.to,
    subject: email.subject,
    text: 'Gif or Jif?',
    html: `<p>${ email.message }</p>`
  };
  
  transporter.sendMail(mailOptions, (err, info) => {
    err ? res.status(500).send(err) : null;
    console.log('Message sent', info.messageId, info.response);
    res.status(200).send(info)
  });
  
});


app.listen(PORT, _=> console.log(`Housten we have lift off on port ${PORT}`));