const mongoose = require('mongoose');
const { readConn, writeConn } = require('../config/db');

// Tai khoan ghi khong co quyen createIndex/createCollection tren 'books'
const schema = new mongoose.Schema(
  {
    code: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    author: { type: String, trim: true, default: '' },
    price: { type: Number, required: true, min: 0 },
    vatRate: { type: Number, required: true },
    priceWithVat: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { collection: 'books', autoIndex: false, autoCreate: false }
);

// Cung 1 schema, 2 model gan vao 2 ket noi khac nhau
const BookRead = readConn.model('Book', schema);   // chi dung de find/exists
const BookWrite = writeConn.model('Book', schema); // chi dung de create

module.exports = { BookRead, BookWrite };
