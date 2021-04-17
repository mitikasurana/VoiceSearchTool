/**
 * This function return the final query after appending the similar words.
**/

const check = require('./isPresent');
const words = require('./SimilarWords').words;

function getFinalQuery(tokenList){
    const returnQuery = [];
    return new Promise (async (resolve,reject)=>{
        var final_query="";
        await tokenList.every( async function (token) {
                token = token.trim();
                returnQuery.push(token);
                await check.isPresent(token).then((val) => {
                    console.log("isPresent: ",val);
                    if (!val) {
                        var simlar_words = words[token];
                        console.log("similar_words_array: ",simlar_words);
                        similar_words = simlar_words.join(" | ");
                        console.log("similar_words_string: ",similar_words);
                        returnQuery.push(similar_words);
                    }
                    resolve(returnQuery);
                });
            })
    });
}

module.exports = {getFinalQuery};