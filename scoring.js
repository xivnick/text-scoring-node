const crypto = require('crypto');
const Hangul = require('hangul-js');

const scoring = (input, salt) => {

	const str = Hangul.disassemble(input).join('');
	const n = str.length;
	let totalScore = 0;

	for (let i = 0; i < n; i++) {
		for (let j = i + 1; j <= n; j++) {
			const substring = str.slice(i, j);
			const saltedSubstring = substring + salt + i;

			const md5Hash = crypto.createHash('md5').update(saltedSubstring).digest('hex');
			const hashNumber = parseInt(md5Hash, 16);
			const score = Math.round(((hashNumber / (2**128 - 1)) * 200) - 100);

			const weight = Math.min(3 / i, 1) * Math.min(3 / (j - i), 1);
			const weightedScore = score * weight;

			totalScore += weightedScore;
		}
	}

    totalScore = Math.max(totalScore / 20 + 30, 0);

	return Math.round(totalScore * 10000) / 10000;   
}

module.exports = scoring;
