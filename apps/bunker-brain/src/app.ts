const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
// const Company = require('./Types/company');
import { Updates } from './updates';
import { Gets } from './gets';

const app = express();
app.use(cors());
app.use(express.json());

var jsonParser = bodyParser.json();

// VARS
let constituents = [];
let running = false;
let updates, gets;

function init() {
  populateList();
  running = true;

  // setup updates
  updates = new Updates(app, gets);
  gets = new Gets(app);
}

init();

// populate SP500; get data
async function populateList() {
  const { data } = await axios.get(
    'https://en.wikipedia.org/wiki/List_of_S%26P_500_companies'
  );
  const $ = cheerio.load(data);

  $('#constituents tbody tr > td:nth-child(1) > a:nth-child(1)').each(function (
    n,
    e
  ) {
    constituents.push($(this).text());
  });
  console.log('SP500 loaded');
}

function isSP500(ticker) {
  if (!constituents.length) {
    console.error('NO CONSITUENTS');
  }
  const isInSP500 = constituents.indexOf(ticker) !== -1;
  console.log(ticker + ' in SP500? ' + isInSP500);
  return isInSP500;
}

// ENDPOINTS
//

app.listen(8080, () => {
  console.log('server started');
});

app.get('/isSP500', (req, res) => {
  console.log(req.query);
  const isSP = isSP500(req.query.ticker);
  res.send(isSP);
});
