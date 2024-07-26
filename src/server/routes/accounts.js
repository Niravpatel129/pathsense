const express = require('express');
const router = express.Router();
const Account = require('../models/Account.js');

router.post('/', async (req, res) => {
  try {
    const account = new Account(req.body);
    await account.save();
    res.status(201).send(account);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) {
      return res.status(404).send({ error: 'Account not found' });
    }
    res.send(account);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const account = await Account.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!account) {
      return res.status(404).send({ error: 'Account not found' });
    }
    res.send(account);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const account = await Account.findByIdAndDelete(req.params.id);
    if (!account) {
      return res.status(404).send({ error: 'Account not found' });
    }
    res.send(account);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
