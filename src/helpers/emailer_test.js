const { sendApprovalRequestEmail, sendUserCreationEmail } = require('./emailer_old')

let userInfo = {
    username: 'bijaybzzay@gmail.com',
    firstName: 'Bijay',
    lastName: 'Paudel',
    password: 'testPassword'

}
let result = sendUserCreationEmail(userInfo)
console.log(result)