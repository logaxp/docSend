const bodyParser = require('body-parser');
const db = require('../../domain/models/index');
const { Op } = require('sequelize');
const { SharedDocument, User, Permissions, Documents } = db;

class ShareDocumentRepository{
    async shareDocument(data){
        try{
            // console.log(data)
            const result = await SharedDocument.create(data)
            if(result.length == 0){
                throw new Error('Error sharing document')
            }
            return { success: true, msg: 'Document shared successfully' }
        }catch(error){
            console.error(error);
            throw new Error(error);
        }
    }

    async fetchDocumentStaff(query) {
        try {
            const sharedDocument = await SharedDocument.findAll({
                where: { sender_id: query.creator_id, access_token: query.access_token }
            });
    
            if (sharedDocument.length === 0) {
                return { success: false, msg: 'Document not found', status: 404 };
            }
            
    
            const result = await Promise.all(
                sharedDocument.map(async (_staff) => {
                    const {
                        dataValues: { receiver_email, permission },
                    } = _staff;

                    // Get staff's current permission types
                    const _permission = await Permissions.findOne({ 
                        where: { id: permission },
                        attributes: ['id', 'name', 'createdAt', 'updatedAt'], // Include only the needed columns
                    });
    
                    // Get staff information
                    const user = await User.findOne({
                        where: { email: receiver_email }
                    });
                    
                    if (_permission && user) {
                        const { id, firstname, lastname, email } = user;
                        return { id, firstname, lastname, email, current_permission: _permission.name };
                    }
    
                    return null;
                })
            );
    
            const filteredResult = result.filter((staff) => staff !== null);

            if (filteredResult.length > 0) {
                return { success: true, status: 200, data: filteredResult };
            }
            
            return { success: false, msg: 'No access has been given to the document', status: 404 };
        } catch (error) {
            console.error('Error getting the list of staff with access to the document:', error);
            return { success: false, msg: 'Internal Server Error', status: 500 };
        }
    }

    async fetchAllSharedDocument(email){
        try{

            const sharedDocument = await SharedDocument.findOne({
                where: { receiver_email: email }
            });

            if(sharedDocument === null){
                return { success: false, msg: "No shared document found", status: 404 }
            }

            const result = await Documents.findAll({
                where: { access_token: sharedDocument.access_token }
            });

            return result;


        }catch(error){
            console.log(error);
        }
    }

}


module.exports = new ShareDocumentRepository();






