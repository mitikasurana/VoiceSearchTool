/**
 * this function checks if keyword/token is present or not in the data.
 */

const { RedisSearchService } = require('../services/RedisSearchService');
const searchObj = new RedisSearchService();

function isPresent(query){
    return new Promise(async (resolve,reject)=>{
        var retVal ;
        await searchObj.searchService(query).then((results)=>{
                console.log("checkTokenResult: ",results);
                if(results.length == 0){
                    retVal = false;
                }
                else{
                    retVal = true;
                }
          }) 
        resolve(retVal);
    });
}

module.exports = {isPresent};