
// // ROIC - probably have to refine and make sure we're getting correct data here
// async function roic(ticker) {
//     console.log('roic data called');
//     // try {
//     // Fetch HTML of the page we want to scrape
//     // const { data } = await axios.get("https://roic.ai/company/" + ticker + ":US");
//     // // Load HTML we fetched in the previous line
//     // const $ = cheerio.load(data);
  
//     // const ttm_roic = $(
//     //   "div.flex:nth-child(22) > div:nth-child(2) > div:nth-child(17)"
//     // ).text();
  
//     // console.log(ttm_roic);
//     return '12';
//   }

//   async function getEarningsDate(ticker) {
//     const { data } = await axios.get(
//       'https://www.earningswhispers.com/stocks/' + ticker
//     );
//     const $ = cheerio.load(data);
//     console.log('getting earnings date for', ticker);
  
//     const date = $('div#epsdate-act').text();
//     // console.log('date is', date);
  
//     return date;
//   }

//   app.get('/nextearnings', (req, res) => {
//     getEarningsDate(req.query.ticker).then((date) => {
//       // console.log('resolved')
//       console.log('found date', date);
//       res.send(date);
//     });
//   });
  
//   app.get('/roic', (req, res) => {
//     roic(req.query.ticker).then((roic) => {
//       // console.log('resolved')
//       // console.log("roic", ticker);
//       res.send(roic);
//     });
//   });