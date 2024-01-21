const db = require('../models/index');
const { User, SharedDocument } = db;
const shareDocumentRepository = require('../repositories/shareDocumentRepository')
const outMail = require('../../infrastructure/external-services/emailService');


class ShareDocumentUseCase{
    async shareDocument(documentData){
        try{
            // Business logic
            const documentLink = `http://localhost:3000/login?tenant/document=${documentData.access_token}`

            const isUserOnDocSend = await User.findOne({where: {email: documentData.receiver_email}});
            const sender = await User.findOne({where: {id: documentData.sender_id}});

            // Check if document has been shared to the receiver prior
            const sharedDocument = await SharedDocument.findOne({
                where: { 
                    access_token: documentData.access_token,
                    sender_id: sender.id,
                    receiver_email: documentData.receiver_email,
                    state: 0
                }
            });

            if(sharedDocument){
                return {
                    success: false, 
                    msg: "This document has already been shared with this receipient",
                    tips: "You can reshare this document by deleting the initial shared record"
                }
            }
            if(!isUserOnDocSend){
                if(sender){
                    const data = { ...documentData, status: 0, tenant_id: sender.tenant_id }
                    const response = await shareDocumentRepository.shareDocument(data)
                    if(response.success === true){
                        const senderName = sender.firstname+' '+sender.lastname;
                        const sendmail = await outMail.sendShareDocumentEmail(data.receiver_email, senderName, data.message, documentLink)
                        if(!sendmail){
                            throw new Error("System had issues while process document sharing request");
                        }
                        return response;
                    }
                }
            }
            if(sender){
                const data = { ...documentData, status: 1, tenant_id: sender.tenant_id }
                const response = await shareDocumentRepository.shareDocument(data)
                if(response.success === true){
                    const senderName = sender.firstname+' '+sender.lastname;
                    const sendmail = await outMail.sendShareDocumentEmail(data.email, senderName, data.message, documentLink)
                    if(!sendmail){
                        throw new Error("System had issues while process document sharing request (email)");
                    }
                    return response;
                }
            }
        }catch(error){
            console.error(error)
        }
    }
}

module.exports = new ShareDocumentUseCase()
