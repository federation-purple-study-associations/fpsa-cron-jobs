require('dotenv').config();
const mariadb = require('mariadb');

function start() {
  mariadb.createConnection({
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    user:process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    rowsAsArray: true,
  }).then(async (conn) => {
    const date = new Date();
    const today = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + 'T00:00:00';
    
    if((await conn.query('SELECT id FROM page_view WHERE date = ?', [today])).length === 0) {
      await conn.query('INSERT INTO page_view VALUES (?, ?,?)', [null, today, 0])
    }
  
    await conn.end();
  });
}

start();