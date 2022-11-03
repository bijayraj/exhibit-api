const nodemailer = require('nodemailer');
const config = require('../config');
const auth = require('../config/email.json');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: auth
});

async function sendEmail(message) {
    const message_template = {
        from: 'taptouring@gmail.com',
        ...message
    };
    const result = await transporter.sendMail(message_template);
    // console.log(JSON.stringify(result, null, 4));
    return result
}

async function sendForgotPasswordEmail(userInfo) {
    const artworkLink = `${config.webuiPath}/reset-forgot-password?token=${userInfo.resetToken}`;

    const msg = ` Hi ${userInfo.firstName} ${userInfo.lastName},
    <br /> 
    Use the following link to reset your password. The link will expire in one hour.<br />
    <a href="${artworkLink}">${artworkLink}</a>
    `;

    console.log(msg);
    const emailResult = await sendEmail({
        to: userInfo.username,
        subject: 'Tag Touring: Forgot Password',
        html: msg,
        text: msg
    });
    return emailResult;
}

module.exports = { sendEmail, sendForgotPasswordEmail }