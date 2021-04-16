const db_connection = require('./config/db.js');
const { Client, Pool } = require('pg');

module.exports = {
  client: new Client(db_connection),
  pool: new Pool(db_connection),
  connect: () => {
    const client = new Client(db_connection);
    return client.connect(() => console.log('connected to db...'));
  },
};
