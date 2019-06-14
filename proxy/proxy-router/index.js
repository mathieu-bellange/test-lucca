const express = require('express');
const router = express.Router();
const expensesRouter = require('./expenses-router');

router.use('/expenseItems', expensesRouter);

module.exports = router;
