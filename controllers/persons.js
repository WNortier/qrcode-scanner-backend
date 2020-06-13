//@ts-nocheck
const express = require('express');
const router = express.Router();
const Person = require('../models/person');

router.post('/capture-qr', async (req, res, next) => {
  try {
    console.log(req.body);
    console.log('hello from Cordova');
    const person = await new Person(
      req.body.id,
      req.body.name,
      req.body.temp,
      req.body.sick,
      req.body.contact
    );
    await person.save();
    res.json({
      status: 'success',
    });
  } catch (err) {
    res.json({
      status: 'error',
      error: err.stack,
    });
  }
});

router.get('/person/:id', (req, res, next) => {
  try {
    let id = req.params.id;
    const person = Person.getPersonFromFile(id);
    res.json({
      status: 'success',
      person: person,
    });
  } catch (err) {
    res.json({
      status: 'error',
      error: err.stack,
    });
  }
});

exports.routes = router;
