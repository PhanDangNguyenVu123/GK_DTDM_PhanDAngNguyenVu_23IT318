require('dotenv').config();
const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');

const sessionMiddleware = require('./config/session');
const bookRoutes = require('./routes/books');
const tax = require('./utils/tax');

const app = express();
app.set('trust proxy', 1); // Render dung reverse proxy

app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  helpers: {
    money: (v) => Number(v).toLocaleString('vi-VN') + ' đ'
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(sessionMiddleware);

// Bien dung chung cho footer
app.use((req, res, next) => {
  res.locals.studentName = tax.STUDENT_NAME;
  res.locals.studentId = tax.STUDENT_ID;
  res.locals.vatRate = tax.VAT_RATE;
  next();
});

app.get('/healthz', (req, res) => res.send('ok'));
app.use('/', bookRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Loi may chu: ' + err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server chay tai cong ${PORT}`));
