const fs = require('fs');
// local
const path = './src/api/';
// server
// const path = './';

module.exports = {
  loaded_companies: [],

  init: function () {
    this.loadData();
  },

  getCompanies() {
    return loaded_companies;
  },

  loadData: function () {
    fs.readFile(path + 'companies.json', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Successfully read data from file');
      loaded_companies = JSON.parse(data);
    });
  },

  saveData: function (companies) {
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
  },

  backUp: function () {
    fs.writeFile(
      path + 'companies_backup.json',
      JSON.stringify(loaded_companies, null, 2),
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Successfully backed up data to file');
        // We should then load here
      }
    );
  },
};
