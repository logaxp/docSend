const { Op } = require("sequelize");


module.exports = {
    basicSearch: async () => {
        // const keyword = searchData.search_keyword;
        // const byEmail = searchData.by_email;
        // const byFirstname = searchData.by_firstname;
        // const byLastname = searchData.by_lastname;
        // const byPhone = searchData.by_phone;
        // const byRole = searchData.by_role;
    },
    advanceTenantStreamSearch: async (queryData, tenantId) => {
        try{
            const searchConditions = {};

            // Iterate over the query keys in the Object
            Object.keys(queryData).forEach((key) => {
                
                // Append every key in the search queryData and skip search keyword(keyword)
                if(key !== 'search_keyword' && queryData[key] === 'true'){
                    searchConditions[key] = {
                        [Op.like]: `%${queryData.search_keyword}%`,
                    }
                }
            });

            // Search condition where clause
            const whereClause = {
                [Op.and]: [
                    {[Op.or]: searchConditions},
                    {tenant_id: tenantId},
                ]
            }
            return whereClause;
        }catch(error){
            return console.error(error.message)
        }
    }
}
