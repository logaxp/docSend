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
        console.error('Error outbound email OTP task failed:', error.message);
        return { success: false, msg: 'Inernal Server Error', status: 500 }
    }
}

const sendPasswordEmail = async (recipientEmail, recipientName, rawPassword) =>{

    try{

        // send mail with defined transport object
        transporter.sendMail({
            from: `"DocSend" ${process.env.ADMIN_EMAIL_USER}`, // sender address
            to: recipientEmail, // list of receivers separate with commas.
            subject: "Account Login Credential",
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
        console.error('Error outbound email password task failed:', error.message);
        return { success: false, msg: 'Inernal Server Error', status: 500 }
    }
}


const sendShareDocumentEmail = async (recipientEmail, senderName, mailBody, documentLink) =>{
    try {
        // send mail with defined transport object
        transporter.sendMail({
            from: `"DocSend" ${process.env.ADMIN_EMAIL_USER}`,
            to: recipientEmail,
            subject: "Document shared with you: DocSend",
            html: `
                <html>
                    <body style="border-radius: 5px; box-shadow: 0px 0px 8px 0px #ccc;">
                        <div style="width: 400px; height: 600px">
                            <div style="font-size: 14px;">
                                <h4>Hi,</h4>
                                <p>${senderName} shared a document</p>
                            </div>
                            <div style="width: 50vw; display: flex; flex-direction: row; justify-content: center; font-size: 20px; color: #e22;">
                                <p>${mailBody}</p>
                                <p>
                                    <a href=${documentLink}>Open</a>
                                </p>
                            </div>
                        </div>
                    </body>
                </html>`
        });
        return true;
    } catch (error) {
        if (error.code === 'EENVELOPE' && error.command === 'API') {
            throw new Error('No recipients defined. Please provide at least one recipient.');
        } else {
            throw new Error(`An unexpected error occurred: ${error.message}`);
        }
    }
    
}


module.exports = {
    sendVerificationEmail,
    sendPasswordEmail,
    sendShareDocumentEmail
}



