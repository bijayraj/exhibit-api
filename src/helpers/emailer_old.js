

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

sendApprovalRequestEmail({ id: 1, title: 'Test title' }, { username: 'bijayraj' })

// send({
//     to: 'bijaybzzay@gmail.com',
//     subject: 'Hello World',
//     text: 'Hello World'
// });


module.exports = send;