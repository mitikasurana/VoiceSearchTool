const express = require('express');
const cors = require('cors');
const pyClient = require('./runToken');
const dotenv = require('dotenv');
const getFQ = require('./utils/getFinalQuery');
const { RedisSearchService } = require('./services/RedisSearchService');

const app = express();
dotenv.config();

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

// endpoint for returning results back to React server
app.get('/api/results/', async (req, res) => {

  var finalQuery = null;

  console.log("requestQuery: ",req.query.command);

  // calling the py client for returning tokens
  const output = await pyClient.run(req.query.command)
  var tokenList = output.split(" ");
  tokenList = tokenList.slice(0, tokenList.length - 1);
  console.log("tokenList: ", tokenList);

  //getFinalQuery
  await getFQ.getFinalQuery(tokenList).then((val) => { finalQuery = val });
  console.log("finalQuery: ", finalQuery);

  //make Search to get results
  const searchObj = new RedisSearchService();
  searchObj.searchService(finalQuery.join("").toString()).then((results) => {
    console.log("results: ", results);
    res.send({ "results": results });
  })

})

app.listen(process.env.PORT || 8080);