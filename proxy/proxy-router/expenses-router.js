const express = require('express');
const expenseItems = require('./expense-items.json');

const router = express.Router();

router.get('', (req, res) => {
  res.send(expenseItems)
});

module.exports = router;
