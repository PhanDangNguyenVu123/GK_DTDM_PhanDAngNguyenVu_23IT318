// Thuat toan ca nhan hoa theo MSSV
const STUDENT_ID = process.env.STUDENT_ID || '23IT318';
const STUDENT_NAME = process.env.STUDENT_NAME || 'Ho Ten Cua Ban';

const CODE_PREFIX = STUDENT_ID.slice(-3);              // 3 so cuoi MSSV -> "318"
const LAST_DIGIT = parseInt(STUDENT_ID.slice(-1), 10); // chu so cuoi   -> 8
const VAT_RATE = LAST_DIGIT + 6;                       // VAT = (8 + 6)% = 14%

function isValidCode(code) {
  return typeof code === 'string' && code.startsWith(CODE_PREFIX) && code.length > CODE_PREFIX.length;
}

function priceWithVat(price) {
  return Math.round(price * (1 + VAT_RATE / 100));
}

module.exports = { STUDENT_ID, STUDENT_NAME, CODE_PREFIX, VAT_RATE, isValidCode, priceWithVat };
