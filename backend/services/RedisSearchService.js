const dotenv = require('dotenv');
dotenv.config({ path: '/media/sushmita/New Volume/myntra/MyntraMate/backend/.env'})

const redis = require("redis");
const rediSearchClient = require('redisearchclient');
const my_data = rediSearchClient(redis, 'myntra', { clientOptions: { port: 6379, host:"127.0.0.1", no_ready_check: true, password:process.env.REDIS_PASSWORD} });

const dataset = require('../data/testData').dataset;
const dp = require('../processor/DataProcessor');
const ef = require('../processor/ExtractFields');

/**
 * This service uses REDISEARCH.
 * it is a service which matches the query keywords with the ones we have in our product data
 * and returns the best matched product objects.
 */

class RedisSearchService {
   
    constructor (){
        this.finalProducts = null;
    }

    searchService=(query)=>{

        const productList = dp.processData(dataset.data);
    
        //index the data
        my_data.createIndex([
            my_data.fieldDefinition.text('title', true),
            my_data.fieldDefinition.text('link', true),
            my_data.fieldDefinition.text('size', true),
            my_data.fieldDefinition.text('brand', true),
            my_data.fieldDefinition.text('dominant_material', true),
            my_data.fieldDefinition.text('actual_color', true),
            my_data.fieldDefinition.text('dominant_color', true),
            my_data.fieldDefinition.text('product_type', true),
            my_data.fieldDefinition.text('images', true),
            my_data.fieldDefinition.text('body', true),
            my_data.fieldDefinition.text('product_details', true),
            my_data.fieldDefinition.text('complete_the_look', true),
            my_data.fieldDefinition.text('type', true),
            my_data.fieldDefinition.text('ideal_for', true),
            my_data.fieldDefinition.text('specifications', true),
            my_data.fieldDefinition.text('inventory',true)
        ],
            function (err) {
                if (err) {
                    console.log('error1', err.message, err.stack);
                }
            })
        productList.forEach((product, index) => {
    
        //add items to index
            // console.log("PRO_INDEX: ",product,index);
        my_data.add(`doc${index}`, product, function (err) {
                if (err) {
                    console.log('error2', err.message, err.stack);
                }
            })
        })
    
        //search for a query 
        return new Promise( function(resolve, reject){
            my_data.search(query, (err, results) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                // console.log(JSON.stringify(results));
                resolve(ef.extract(results.results));
    
        }).dropIndex() 
        })
    }  
}
module.exports = {RedisSearchService};