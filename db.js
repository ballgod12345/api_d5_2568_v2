const mysql = require('mysql2/promise');

// สร้าง connection pool เพื่อให้รองรับหลายคำสั่งพร้อมกัน
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'd5',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = db;