const { random } = require('./Utils');

const regexChar = /[\\^$.*+?()[\]{}|]/g;
const hasRegexChar = new RegExp(regexChar.source);

RegExp.escape = (text) => {
	return (text && hasRegexChar.test(text))
		? text.replace(regexChar, '\\$&')
		: (text || '');
};

Array.prototype.random = function() {
	return this[random(0, this.length)];
};

String.prototype.title = function() {
	const str = this.toLowerCase().split(/ +/);
	for (let i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}
	return str.join(' ');
};