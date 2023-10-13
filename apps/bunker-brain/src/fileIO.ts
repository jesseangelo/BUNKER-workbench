const fs = require('fs');
// local
const path = './apps/bunker-brain/src/assets/';
// server
// const path = './';

export class FileIO {
  loaded_companies: []

  public init() {
    this.loadData();
  }

  getCompanies() {
    return this.loaded_companies;
  }

  loadData() {
    fs.readFile(path + 'companies.json', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Successfully read data from file');
      this.loaded_companies = JSON.parse(data);
    });
  }

  saveData(companies) {
    this.backUp();
    fs.writeFile(
      path + 'companies.json',
      JSON.stringify(companies, null, 2),
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Successfully written data to file');
        // We should then load here
      }
    );
  }

  backUp() {
    fs.writeFile(
      path + 'companies_backup.json',
      JSON.stringify(this.loaded_companies, null, 2),
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Successfully backed up data to file');
        // We should then load here
      }
    );
  }
};
