

const nodemailer = require('nodemailer');
const config = require('../config');
const auth = require('../config/email.json')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: auth
});


async function send(message) {
    const message_template = {
        from: 'taptouring@gmail.com',
        ...message
    };
    const result = await transporter.sendMail(message_template);
    // console.log(JSON.stringify(result, null, 4));
    return result
}


async function sendApprovalRequestEmail(artwork, user) {
    const artworkLink = `${config.webuiPath}/artwork/${artwork.id}`;

    const plainMsg = `Hello,${user.username} is requesting to review the entry "${artwork.title}". 

    Click on the link below to review the request: \n
    ${artworkLink}
    \n
    If the link is not clicable, copy and paste the above link in the browser.
    `;

    const msg = `Hello,<br /> <strong>${user.username}</strong> is requesting to review the entry <strong>"${artwork.title}"</strong>. 
    <br />
    Click on the link below to review the request:<br />

    <a href="${artworkLink}">${artworkLink}</a>

    <br />
    If the link is not clicable, copy and paste the above link in the browser.
    `;
    console.log(msg);
    const emailResult = await send({
        to: 'bijaybzzay@gmail.com',
        subject: 'Tap Tour: Approval Requst',
        html: msg,
        text: msg
    });
    console.log(emailResult)

}

// sendApprovalRequestEmail({ id: 1, title: 'Test title' }, { username: 'bijayraj' })

// send({
//     to: 'bijaybzzay@gmail.com',
//     subject: 'Hello World',
//     text: 'Hello World'
// });


async function sendUserCreationEmail(userInfo) {
    const plainMsg = `Hi ${userInfo.firstName} ${userInfo.lastName},\n 
    Welcome to Tap Touring. \n
    New user has been created for your email address. Please use the following details to login: \n

    Username: ${userInfo.username}
    Password: ${userInfo.password}
    `;

    const msg = ` Hi ${userInfo.firstName} ${userInfo.lastName},
    <br /> 
    Welcome to Tap Touring. <br />
    New user has been created for your email address. Please use the following details to login: <br />
    <strong>Username: </strong> ${userInfo.username}
    <strong>Password: </strong> ${userInfo.password}
    `;
    console.log(msg);
    const emailResult = await send({
        to: userInfo.username,
        subject: 'Tap Touring: New User Created',
        html: msg,
        text: plainMsg
    });
    return emailResult;
}


module.exports = { sendUserCreationEmail, sendApprovalRequestEmail };