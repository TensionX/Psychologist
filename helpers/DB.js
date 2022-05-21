const sql = require('mysql');
require('dotenv').config();
class DB {
  constructor(query) {
    this.query = query;
  }
  async ExecuteQuery(query) {
    console.log('query', query);
    return new Promise((resolve) => {
      try {
        this.connection = sql.createConnection({
          host: process.env.DB_SERVER,
          user: process.env.DB_USER,
          password: process.env.DB_PWD,
          database: process.env.DB_NAME,
        });
        this.connection.connect();
        this.connection.query(`${query}`, (error, results, fields) => {
          if (error) {
            console.log('query', query);
            console.log(error);
            resolve(error);
            return;
          }
          // console.log(results)
          // let result = {}
          // result.recordset = results
          // result.recordsets = results
          if (typeof results[Symbol.iterator] === 'function') {
            resolve([...results]);
            return;
          } else {
            resolve(results);
            return;
          }
        });
        this.connection.end();
      } catch (error) {
        console.log('query', query);
        console.error(error);
      }
    });
  }
}
module.exports = DB;