const { performance } = require('perf_hooks');
const { plsParseArgs } = require('plsargs');
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const letters = {
	// Lowercase
	a: 'ɐ',
	b: 'q',
	c: 'ɔ',
	d: 'p',
	e: 'ǝ',
	f: 'ɟ',
	g: 'ƃ',
	h: 'ɥ',
	i: 'ᴉ',
	j: 'ɾ',
	k: 'ʞ',
	l: 'l',
	m: 'ɯ',
	n: 'u',
	o: 'o',
	p: 'd',
	q: 'b',
	r: 'ɹ',
	s: 's',
	t: 'ʇ',
	u: 'n',
	v: 'ʌ',
	w: 'ʍ',
	x: 'x',
	y: 'ʎ',
	z: 'z',
	// Uppercase
	A: '∀',
	B: 'q',
	C: 'Ɔ',
	D: 'p',
	E: 'Ǝ',
	F: 'Ⅎ',
	G: 'פ',
	H: 'H',
	I: 'I',
	J: 'ſ',
	K: 'ʞ',
	L: '˥',
	M: 'W',
	N: 'N',
	O: 'O',
	P: 'Ԁ',
	Q: 'Q',
	R: 'ɹ',
	S: 'S',
	T: '┴',
	U: '∩',
	V: 'Λ',
	W: 'M',
	X: 'X',
	Y: '⅄',
	Z: 'Z',
};

/**
 * This will flip the string backwards.
 * @param {string} str - The string.
 * @returns - A flipped string.
 */
const flip = (str) => {
	if (!str) throw new TypeError('A string was not specified.');
	let newStr = '';
	for (let i = str.length - 1; i >= 0; i--) {
		if (str[i] === ' ') newStr += ' ';
		for (const letter of Object.keys(letters)) {
			const flipped = letters[letter];
			if (str[i] === letter) newStr += flipped;
		}
	}
	return (newStr);
};

/**
 * Generate a random string.
 * @param {number} length - The length of the generated string.
 * @returns {string}
 */
const generateString = (length) => {
	let result = '';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

/**
 * Parses a command out of the given text.
 * @param {string} text The given text to parse the command.
 * @returns {string}
 */
const parseCommand = (text) => {
	const [, a, b] = text.match(/(^[^\s]+)(\s+([^]*))?$/);
	return [a.trim(), b ? b.trim() : ''];
};

/**
 * This will capitalize the given string.
 * @param {string} string - The String.
 * @returns {string} The string.
 */
const capitalize = (string) => {
	return string.split(' ').map(str => str.slice(0, 1).toUpperCase() + str.slice(1)).join(' ');
};

/**
 * This will be the ternary operator for true or false statments.
 * @param {bool} bool - The Boolean
 * @returns The boolean value translated into emojis.
 */
const checkOrCross = (bool) => bool ? '<a:hb_check:814637252759912478>' : '<a:hb_cross:823305093452529674>';

/**
 * Type-name of the object.
 * @param {object} obj - The object.
 * @returns typeName object.
 */
const typeName = (obj) => {
	if (obj === undefined) {return 'undefined';}
	if (obj === null) {return 'null';}
	return obj.constructor?.name || typeof obj;
};

/**
 * Finds all keys inside nested objects. (wip)
 * @param {Object|Array} obj The item to find a key in.
 * @param {string} toFind The key to find.
 * @param {function} callback A callback for the resulting value.
 */
const findAll = (obj, toFind, callback) => {
	if (typeof callback === 'function') {callback(obj);}

	if (Object.prototype.hasOwnProperty.call(obj, toFind)) {
		const prop = obj[toFind];
		if (Array.isArray(prop)) {
			for (const sub of prop) {
				findAll(sub, toFind, callback);
			}
		} else if (!!prop && prop.constructor === Object) {
			findAll(prop, toFind, callback);
		} else {
			throw new Error('Property is not an Object or an Array.');
		}
	}
};

/**
 * Parses quotes and flags in a string.
 * @param {string | string[]} text The text to parse.
 * @returns {Object}
 */
const parseArgs = (text) => {
	const args = plsParseArgs(text);
	const flagsList = [...Object.keys(args.raw)].slice(1);
	const flags = {};
	for (const flag of flagsList) {
		flags[flag] = args.get(flag);
	}

	return {
		flags: flags,
		flagsList: flagsList,
		args: args._,
		raw: text,
		content: args._.join(' '),
		get(key) {
			return args.has(key)
				? args.get(key)
				: null;
		},
		has(key) { return args.has(key); },
	};
};

/**
 * Returns the text, stripping codeblocks.
 * @param {string} text
 * @returns {string}
 */
const parseCode = (text) => {
	const match = text.match(/(?<block>```|`)\w*(?<code>[^]+)\k<block>/);
	return match
		? match.groups['code'].trim()
		: text;
};

/**
 * Formats a Discord Permission to be more readable.
 * @param {string} perm A discord permission name.
 * @returns The formatted permission.
 */
const formatPerm = (perm) => {
	return perm
		.replace(/_/g, ' ')
		.replace(/guild/ig, 'server')
		.title();
};

/**
 * Trims a string to the specified length, adding '...'
 * @param {string} text The text to trim.
 * @param {number} max Max length of the text
 * @returns {string}
 */
const trim = (text, max) => {
	if (text.length > (max - 3)) {text = text.substring(0, max) + '...';}
	return text;
};

/**
 * Gets a random number between min and max. (both inclusive)
 * @param {number} min the minimum number
 * @param {number} max the maximum number
 * @returns {number}
 */
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Tests the performance of a function in ms.
 * @param {function} func The function to call.
 * @param {number} amount The amount of times to run the function.
 * @returns {Object} An object with the time and results.
 */
const timeit = async (func, amount = 1) => {
	const t1 = performance.now();
	let res = amount === 1 ? undefined : [];
	for (let i = 0; i < amount; i++) {
		let ret = func();
		if (ret && ret.constructor === Promise) {ret = await ret;}

		if (amount === 1) {res = ret;} else {res.push(ret);}
	}
	const t2 = performance.now();
	return { time: t2 - t1, result: res };
};

/**
 * Shows the time left in seconds, minutes, etc.
 * @param {number} timestamp - The timestamp.
 * @returns - A time left string.
 */
const timeleft = (timestamp) => {
	const timeLeft = timestamp - Date.now();
	const days = Math.floor(timeLeft / 86400000);
	const hours = Math.floor(timeLeft / 3600000) - (days * 24);
	const minutes = Math.floor(timeLeft / 60000) - (days * 1440) - (hours * 60);
	const seconds = Math.floor(timeLeft / 1000) - (days * 86400) - (hours * 3600) - (minutes * 60);
	const mseconds = (timeLeft / 1000) - (days * 86400) - (hours * 3600) - (minutes * 60);
	let string = '';
	if (days) string = string + `${days} ${days == 1 ? 'Day' : 'Days'}`;
	if (hours) string = string + `${hours} ${hours == 1 ? 'Hour' : 'Hours'}`;
	if (minutes) string = string + `${minutes} ${minutes == 1 ? 'Minute' : 'Minutes'}`;
	if (seconds) string = string + `${seconds} ${seconds == 1 ? 'Second' : 'Seconds'}`;
	if (!string.length) string = `${mseconds.toFixed(1)} Second(s)`;
	return string;
};

/**
 * Shows the number of bytes and size.
 * @param {number} bytes - The number of bytes.
 * @returns {string}
 */
const formatBytes = (bytes) => {
	if (bytes === 0) return '0 Bytes';
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	const i = Math.floor(Math.log(bytes) / Math.log(1024));
	return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Formats the given array.
 * @param {array} array - The array.
 * @param {type} type - Type.
 * @returns {array}
 */
const formatArray = (array, type = 'conjunction') => {
	return new Intl.ListFormat('en-GB', { style: 'short', type: type }).format(array);
};

/**
 * Removes a duplicated object.
 * @param {array} arr - The array.
 * @returns {array}
 */
const removeDuplicates = (arr) => {
	return [...new Set(arr)];
};

/**
 * This will delay a certain amount of miliseconds.
 * @param {number} ms - The time in miliseconds.
 * @returns - Delayed function.
 */
const delay = (ms) => new Promise(res => setTimeout(res, ms));

/**
 * @param {number} num - the reference number
 * @param {string} unit - singular unit
 * @param {string} [unitplural] - Optional. plural unit (if not provided, singular unit is suffixed with "s" instead)
 * @returns {string}
 */
const pluralize = (num, unitSingular, unitplural) => {
	if (!unitplural) unitplural = unitSingular + 's';
	const isPlural = num !== 1;
	const text = `${num} ${isPlural ? unitplural : unitSingular}`;
	return text;
};

// From Dauntless7's GitHub repository: https://github.com/Dauntless7/CommunityBot/blob/main/src/utils/parse.js
/**
 * Parse a time.
 * @param {string} time - The time.
 * @returns {string}
 */
const parseTime = (time) => {
	const methods = [
		{ name: 'd', count: 86400 },
		{ name: 'h', count: 3600 },
		{ name: 'm', count: 60 },
		{ name: 's', count: 1 },
	];

	const timeStr = [
		Math.floor(time / methods[0].count).toString() + methods[0].name,
	];
	for (let i = 0; i < 3; i++) {
		timeStr.push(
			Math.floor(
				(time % methods[i].count) / methods[i + 1].count,
			).toString() + methods[i + 1].name,
		);
	}
	return timeStr.filter((t) => !t.startsWith('0')).join(' ');
};

// From Dauntless7's GitHub repository: https://github.com/Dauntless7/CommunityBot/blob/main/src/utils/parse.js
/**
 * Parse a date.
 * @param {string} date - The date.
 * @returns {string}
 */
const parseDate = (date) => {
	date.toLocaleString('utc', {
		hour: 'numeric',
		minute: 'numeric',
		weekday: 'long',
		day: 'numeric',
		year: 'numeric',
		month: 'long',
	});
};

/**
 * Easily setup hyperlinks.
 * @param {string} name - The hyperlink name.
 * @param {string} url - A URL.
 * @returns The hyperlink
 */
const link = (name, url) => {
	return `[${name}](${url})`;
};

module.exports = { parseCommand, findAll, parseArgs, parseCode, formatPerm, trim, random, timeit, timeleft, capitalize, formatBytes, formatArray, removeDuplicates, typeName, checkOrCross, flip, delay, pluralize, generateString, parseTime, parseDate, link };