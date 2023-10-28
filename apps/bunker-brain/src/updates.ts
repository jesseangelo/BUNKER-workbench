import { FileIO } from './fileIO';

export class Updates {
  io = null;
  gets;

  constructor(app, gets) {
    this.io = new FileIO();
    this.gets = gets;
    
    // console.log('hell UPPPPdates', app);
    app.post('/adjust-holdings', (req, res) => {
      console.log('updating with um... ', req.body);
      this.updateHoldings(req, res);
      res.status(200);
    });
    // app.post('/update')
  }

  updateHoldings(req, res) {
    // this.io.init();

 
      console.log('Method called is -- ', req.method);
      console.log(req.body);
      res.status(200);
      res.send('update req ' + req.body);

      //
      const all:any = FileIO.getCompanies();
      console.log('found companies', all)
      const allUpdated = [];
      let isFound = false;

      for (let i = 0; i < all.length; i++) {
        if (all[i].ticker == req.body.ticker) {
          console.log('fond');
          isFound = true;
          allUpdated.push(req.body);
        } else {
          console.log('not');
          allUpdated.push(all[i]);
        }
      }

      if (!isFound) {
        allUpdated.push(req.body);
      }

      console.log('saving all', allUpdated);
      // const allUpdated = []
      this.io.saveData(allUpdated);
      // init();
      this.gets.reloadCompanies()
      // res.end()
    };
}
