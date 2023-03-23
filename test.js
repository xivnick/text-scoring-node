
const scoring = require('./scoring');

// const readline = require('readline').createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// const qna = () => {
// 	readline.question('Enter a string: ', (str) => {
// 	  console.log(scoring(str, 0));
// 	  qna();
// 	});
// }

// qna();


let totalScore = 0;
let maxScore = -Infinity;
let minScore = Infinity;

for (let i = 1; i <= 100; i++) {
  const randomString = Math.random().toString(36).substring(2, 12) + Math.random().toString(36).substring(2, 12) + Math.random().toString(36).substring(2, 12);
  const score = scoring(randomString, 0);
  totalScore += score;
  maxScore = Math.max(maxScore, score);
  minScore = Math.min(minScore, score);
  console.log(`String ${i}: ${randomString} - Score: ${score}`);
}

const avgScore = totalScore / 100;
console.log(`Maximum score: ${maxScore}`);
console.log(`Minimum score: ${minScore}`);
console.log(`Average score: ${avgScore}`);