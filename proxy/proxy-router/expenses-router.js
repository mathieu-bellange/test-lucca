const express = require('express');
const expenseItems = require('./expense-items.json');
const _ = require('lodash');

const router = express.Router();

router.get('', (req, res) => {
  res.send(expenseItems)
});

router.put('/:id', (req, res) => {
  const oldItem = _.find(expenseItems, { id: req.params.id });
  const newItem = _.assignIn(oldItem, req.body, { lastModifiedAt: new Date() });
  console.log(newItem);
  res.json(newItem);
});

module.exports = router;
