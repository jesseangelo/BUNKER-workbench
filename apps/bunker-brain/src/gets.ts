import { External } from './external_APIs';
import { Alphavantage } from './alphaVantage_APIs';
import { FileIO } from './fileIO';

export class Gets {
  exAPIs;
  av;
  io;
  constituents = [];

  constructor(app) {
    this.exAPIs = new External();
    this.av = new Alphavantage();
    this.io = new FileIO();

    this.reloadCompanies();

    app.get('/healthCheck', (req, res) => {
      console.log('health check called', true);
      res.send(true);
    });

    app.get('/companies', (req, res) => {
      res.send(FileIO.getCompanies());
    });

    app.get('/', (req, res) => {
      res.status(200);
      res.send({ value: 'API working' });
    });

    app.get('/fearGreed', (req, res) => {
      this.exAPIs.fearGreed().then((response) => {
        console.log(response.data.fear_and_greed);
        res.send(response.data.fear_and_greed);
      });
    });

    app.get('/companyOverview', (req, res) => {
      this.av.companyOverview(req.query.ticker).then((response) => {
        res.send(response.data);
      });
    });

    app.get('/balanceSheet', (req, res) => {
      this.av.balanceSheet(req.query.ticker).then((response) => {
        res.send(response.data);
      });
    });

    app.get('/cashFlow', (req, res) => {
      this.av.cashFlow(req.query.ticker).then((response) => {
        res.send(response.data);
      });
    });

    app.get('/incomeStatement', (req, res) => {
      this.av.incomeStatement(req.query.ticker).then((response) => {
        res.send(response.data);
      });
    });
  }

  public reloadCompanies() {
    this.io.init();
    console.log('YEAH RELOOOOAD');
  }
}
