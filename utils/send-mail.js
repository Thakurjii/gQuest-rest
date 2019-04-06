const sgMail = require('@sendgrid/mail')

module.exports = msg => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    sgMail.send(msg)
}
