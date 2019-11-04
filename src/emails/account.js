const sgMail = require('@sendgrid/mail')
//const sendGRIDApi = '';
//npm i @sendgrid/mail@6.3.1
//sgMail.setApiKey(sendGRIDApi)
sgMail.setApiKey(process.env.SENDGRID_API_KEY)



const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to:email,
        from: 'rehaancool796@gmail.com',
        subject:'Thank you for joining In!',
        text:`Welcome to the app ${name}. Let me know for any sort of help :)`
    })
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to:email,
        from: 'rehaancool796@gmail.com',
        subject:'We are Sorry for Providing a Bad Experience!',
        text:`Sorry, ${name}. Is there anything we could have done to keep you OnBoard ?`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}