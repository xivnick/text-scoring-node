
const crypto = require('crypto');

const MAX_RANKING_SIZE = 10;
const MAX_HISTORY_SIZE = 10;

let salt = null;
let ranking = [];
let history = [];

const initializeSalt = () => {
	// generate a random salt and store it in the salt variable
	salt = crypto.randomBytes(16).toString('hex');
};

const updateRanking = (name, input, score) => {
  // check if the input already exists in the ranking
  const existingIndex = ranking.findIndex((item) => item.input === input);
  if (existingIndex === -1) {
    // if it doesn't, add it to the ranking (if the ranking is not full)
    if (ranking.length < MAX_RANKING_SIZE) {
      ranking.push({ name, input, score });
    } else {
      // if the ranking is full, check if the new score is higher than the lowest score
      const lowestScore = ranking[ranking.length - 1].score;
      if (score > lowestScore) {
        ranking[ranking.length - 1] = { name, input, score };
        // sort the ranking by score in descending order
      }
    }

    ranking.sort((a, b) => b.score - a.score);
  }
};

const updateHistory = (name, input, score) => {
  // add the new score to the history (if the history is not full)
  if (history.length < MAX_HISTORY_SIZE) {
    history.unshift({ name, input, score });
  } else {
    // if the history is full, remove the oldest score and add the new score
    history.pop();
    history.unshift({ name, input, score });
  }
};

const getRanking = () => {
  return ranking;
};

const getHistory = () => {
  return history;
};

const getSalt = () => {
	// if the salt is null, initialize it
	if (salt === null) {
		initializeSalt();
	}
	return salt;
};

module.exports = {
	updateRanking,
	updateHistory,
	getRanking,
	getHistory,
	getSalt,
};
