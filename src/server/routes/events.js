const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.post('/', async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).send(event);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
