const crypto = require('crypto');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Seed the random number generator
Math.seed = 1;
Math.random = function() {
  const x = Math.sin(Math.seed++) * 10000;
  return x - Math.floor(x);
};

const salt = Math.random().toString();

const table = Array.from({ length: 1000 }, () => Math.random());

function getHashValue(text) {
  const hash = crypto.createHash('md5').update(text).digest('hex');
  return parseInt(hash.slice(0, 5), 16) / 1048575;
}

function sample(text, s) {
  const s1 = Math.floor(s / 100) % 10;
  const s2 = Math.floor(s / 10) % 10;
  const s3 = s % 10;

  return text[s1] + text[s2] + text[s3];
}

function weight(s) {
  const s1 = Math.floor(s / 100) % 10;
  const s2 = Math.floor(s / 10) % 10;
  const s3 = s % 10;

  const ms = Math.max(s1, s2, s3);

  return 1 - ms / 15;
}

function calcValue(text) {
  let value = 0;

  text += ' '.repeat(10);

  for (let i = 0; i < 1000; i++) {
    const sampleText = sample(text, i);

    value += getHashValue(sampleText + i.toString() + salt) * table[i] * weight(i);
  }

  return value;
}

// Initialize an empty array for storing top scores
const topScores = [];

function updateTopScores(name, score, inputText) {
  topScores.push({ name, score, inputText });
  topScores.sort((a, b) => b.score - a.score);
  if (topScores.length > 10) {
    topScores.pop();
  }
}

app.use(express.static('public'));

app.post('/test', (req, res) => {
  const name = req.body.name;
  const inputText = req.body.inputText;
  const score = calcValue(inputText);
  updateTopScores(name, score, inputText);
  res.json({ score });
});

app.get('/ranking', (req, res) => {
  res.json(topScores);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
