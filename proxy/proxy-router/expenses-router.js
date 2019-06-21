const express = require('express');
const expenseItems = require('./expense-items.json');
const _ = require('lodash');

const router = express.Router();
let id = 1;

router.get('', (req, res) => {
  res.send(expenseItems)
});

router.post('', (req, res) => {
  const newItem = _.assignIn({}, req.body, { lastModifiedAt: new Date(), createdAt: new Date(), id: id++ + '' });
  expenseItems.items.push(newItem);
  expenseItems.count += 1;
  console.log(newItem);
  res.json(newItem);
});

router.put('/:id', (req, res) => {
  const oldItem = _.find(expenseItems.items, { id: req.params.id });
  const newItem = _.assignIn(oldItem, req.body, { lastModifiedAt: new Date() });
  console.log(newItem);
  res.json(newItem);
});

router.delete('/:id', (req, res) => {
  _.remove(expenseItems.items, item => item.id === req.params.id);
  expenseItems.count -= 1;
  res.sendStatus(204);
});

module.exports = router;
