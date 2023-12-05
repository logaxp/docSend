const nodemailer = require('nodemailer')

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: process.env.CI_EMAIL_HOST,
    port: process.env.CI_EMAIL_PORT,
    secure: process.env.CI_SECURE,
    ignoreTLS: true, //TLS
    auth: {
        user: process.env.CI_ADMIN_EMAIL_USER,
        pass: process.env.CI_ADMIN_EMAIL_PASS,
    },
});

// console.log("admin email", process.env.CI_ADMIN_EMAIL_USER)

const sendVerificationEmail = async (recipientEmail, recipientName, generateToken) =>{

    try{

        // send mail with defined transport object
        transporter.sendMail({
            from: `"DocSend" ${process.env.ADMIN_EMAIL_USER}`, // sender address
            to: recipientEmail, // list of receivers separate with commas.
            subject: "Account Password",
            html: `
                <html>
                    <body style="border-radius: 5px; box-shadow: 0px 0px 8px 0px #ccc;">
                        <div>
                            <div style="font-size: 14px;">
                                <h4>Thank you, ${recipientName} for choosen DocSend as your document manager</h4>
                                <p>Find below a code to activate your DocSend account</p>
                            </div>
                            <div style="width: 50vw; display: flex; flex-direction: row; justify-content: center; font-size: 50px; color: #e22;">
                                <p>${generateToken}</p>
                            </div>
                        </div>
                    </body>
                </html>`});
        return true
    }catch(error){
        console.log(error);
        return false
    }
}

const sendPasswordEmail = async (recipientEmail, recipientName, rawPassword) =>{

    try{

        // send mail with defined transport object
        transporter.sendMail({
            from: `"DocSend" ${process.env.ADMIN_EMAIL_USER}`, // sender address
            to: recipientEmail, // list of receivers separate with commas.
            subject: "Account verification mail",
            html: `
                <html>
                    <body style="border-radius: 5px; box-shadow: 0px 0px 8px 0px #ccc;">
                        <div>
                            <div style="font-size: 14px;">
                                <h4>Hi ${recipientName},</h4>
                                <p>Find below your DocSend account password</p>
                            </div>
                            <div style="width: 50vw; display: flex; flex-direction: row; justify-content: center; font-size: 20px; color: #e22;">
                                <p>${rawPassword}</p>
                            </div>
                        </div>
                    </body>
                </html>`});
        return true
    }catch(error){
        console.log(error);
        return false
    }
}


module.exports = {
    sendVerificationEmail,
    sendPasswordEmail,
}



