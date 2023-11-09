const fs = require('fs');
// local
const path = './apps/bunker-brain/src/assets/';
// server
// const path = './';

export class FileIO {
  static loaded_companies: [];

  public init() {
    console.log('init file data called');
    this.loadData();
  }

  static getCompanies() {
    // if(!this.loaded_companies.length
    //   ) {
    //     this.init();
    //   }
    console.log('getCompanies called ', this.loaded_companies.length);
    return this.loaded_companies;
  }

  loadData() {
    fs.readFile(path + 'companies.json', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Successfully read data from file');
      FileIO.loaded_companies = JSON.parse(data);
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
    const time = Date.now();
    fs.writeFile(
      path + `companies_${time}.json`,
      JSON.stringify(FileIO.loaded_companies, null, 2),
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
}
