const db = require('../../domain/models/index');
const { SharedDocument } = db;

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
}


module.exports = new ShareDocumentRepository();






