// Stateless: session luu tap trung tren MongoDB Atlas, KHONG luu trong RAM may chu
const session = require('express-session');
const MongoStore = require('connect-mongo');

module.exports = session({
  secret: process.env.SESSION_SECRET || 'dev-only-secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI_WRITE, // tai khoan co quyen tren collection 'sessions'
    collectionName: 'sessions',
    ttl: 14 * 24 * 60 * 60
  }),
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production', // Render chay HTTPS
    maxAge: 14 * 24 * 60 * 60 * 1000
  }
});
