const express = require('express');
const { BookRead, BookWrite } = require('../models/book');
const tax = require('../utils/tax');

const router = express.Router();

// READ -> tai khoan chi doc
router.get('/', async (req, res, next) => {
  try {
    req.session.visits = (req.session.visits || 0) + 1; // chung minh session luu tren Atlas
    const books = await BookRead.find().sort({ createdAt: -1 }).lean();
    const flash = req.session.flash;
    delete req.session.flash;
    res.render('home', {
      books, flash,
      visits: req.session.visits,
      codePrefix: tax.CODE_PREFIX
    });
  } catch (err) { next(err); }
});

// WRITE -> tai khoan chi ghi
router.post('/books', async (req, res, next) => {
  try {
    const code = (req.body.code || '').trim();
    const title = (req.body.title || '').trim();
    const author = (req.body.author || '').trim();
    const price = Number(req.body.price);

    const fail = (msg) => { req.session.flash = { type: 'error', msg }; return res.redirect('/'); };

    if (!tax.isValidCode(code)) return fail(`Ma san pham phai bat dau bang "${tax.CODE_PREFIX}". Tu choi xu ly.`);
    if (!title) return fail('Ten sach khong duoc de trong.');
    if (!Number.isFinite(price) || price < 0) return fail('Gia khong hop le.');
    if (await BookRead.exists({ code })) return fail(`Ma "${code}" da ton tai.`);

    await BookWrite.create({
      code, title, author, price,
      vatRate: tax.VAT_RATE,
      priceWithVat: tax.priceWithVat(price)
    });

    req.session.flash = { type: 'ok', msg: `Da them "${title}" (VAT ${tax.VAT_RATE}%).` };
    res.redirect('/');
  } catch (err) { next(err); }
});

module.exports = router;
