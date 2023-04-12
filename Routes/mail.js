const router = require("express").Router()
const nodemailer = require('nodemailer')


router.post('/send-email', (req, res) => {
    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail'
    });

    const mailOptions = {
        from: email,
        to: 'gregorymark254@gmail.com',
        subject: subject,
        text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        console.log(error);
        res.send('Error sending email');
        } else {
        console.log('Email sent: ' + info.response);
        res.send('Email sent successfully');
        }
    });
});

module.exports = router