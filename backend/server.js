const express = require('express');
const cors = require('cors');
const pyClient = require('./runToken');
const dotenv = require('dotenv');
dotenv.config()
const { RedisSearchService } = require('./services/RedisSearchService');
const words = require('./utils/SimilarWords').words;

const app = express();

//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(express.json());

// BASE-URL
app.get('/', function (req, res) {
    console.log("Server running");
    return res.send('Search Results api');
});

var similar_words ;

// endpoint for returning results back to React server
app.get('/api/results/', async (req,res)=> {
   
    const output = await pyClient.run(req.query.command);
    var tokenList = output.split(" ");

    console.log(tokenList);

    const searchObj = new RedisSearchService();

    tokenList = tokenList.slice(0,tokenList.length - 1)

    console.log(tokenList);

    tokenList.forEach(async (keyword) => {
      keyword = keyword.trim()
      await new Promise(function(resolve,reject){
        resolve(searchObj.searchService(keyword));
      }).then((results)=>{
        if(results === [] || results === undefined ){
            similar_words = words[keyword];
            console.log(similar_words);
            res.send({"results":null , "options":similar_words})
        }
        else{
          console.log(results);
          res.send({"results": results , "options":null})
        }
      })
    })

})

app.get('/api/weatherfilter/results/',async(req,res)=>{
  
    const searchObj = new RedisSearchService();
    await new Promise(function(resolve,reject){
      resolve(searchObj.searchService(req.query.command));
    }).then((results)=>{
          console.log(results);
          res.send({"results": results});
    })

})

app.listen(process.env.PORT || 8080);