const express = require('express');
const scoring = require('./scoring');
const data = require('./data');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

router.post('/scoring', (req, res) => {
  const { name, input } = req.body;
  const salt = data.getSalt();
  const score = scoring(input, salt);
  data.updateRanking(name, input, score);
  data.updateHistory(name, input, score);
  res.json({ score });
});

router.get('/getData', (req, res) => {
  const ranking = data.getRanking();
  const history = data.getHistory();
  res.json({ ranking, history });
});

module.exports = router;
