// Hai ket noi doc lap, moi ket noi dung 1 tai khoan Atlas rieng (Least Privilege)
const mongoose = require('mongoose');

function makeConnection(uri, label) {
  if (!uri) throw new Error(`Thieu bien moi truong cho ket noi ${label}`);
  const conn = mongoose.createConnection(uri, { serverSelectionTimeoutMS: 10000 });
  conn.on('connected', () => console.log(`[DB] ${label} connected`));
  conn.on('error', (e) => console.error(`[DB] ${label} error:`, e.message));
  return conn;
}

const readConn = makeConnection(process.env.MONGO_URI_READ, 'READ');
const writeConn = makeConnection(process.env.MONGO_URI_WRITE, 'WRITE');

module.exports = { readConn, writeConn };
