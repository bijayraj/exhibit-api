const { sendApprovalRequestEmail, sendUserCreationEmail } = require('./emailer_old')

let userInfo = {
    username: 'bijaybzzay@gmail.com',
    firstName: 'Bijay',
    lastName: 'Paudel',
    password: 'testPassword'

}

let artWork = {
    id: 1,
    title: 'Some title'
}


// let result = sendUserCreationEmail(userInfo)
// console.log(result)

let result = sendApprovalRequestEmail(artWork, userInfo);