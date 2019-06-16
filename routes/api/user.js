const express = require('express');
const router = express.Router();
const db = require('../../bookshelf');

router.get('/', function(req, res) {
  db.select().from('users').orderBy('id').then((data) => {
    res.send(data);
  });
});

router.post('/', function(req, res) {
  db.insert(req.body).returning('*').into('users').then((data)=> {
    res.send(data);
  });
});

router.patch('/:id', (req, res) => {
  db('users')
    .where({id: req.params.id})
    .update(req.body)
    .returning('*').then((data) => {
      res.send(data);
    });
});

router.put('/:id', (req, res) => {
  db('users')
    .where({id: req.params.id})
    .update({
      name: req.body.name || null,
      total_win: req.body.total_win || 0,
    })
    .returning('*').then((data) => {
      res.send(data);
    });
});

router.delete('/:id', (req, res) => {
  db('users').where({id: req.params.id}).del().then(() => {
    res.json({success: true});
  });
});

router.get('/:id', (req, res) => {
  db('users').where({id: req.params.id}).select().then((data) => {
    res.send(data);
  });
});

module.exports = router;