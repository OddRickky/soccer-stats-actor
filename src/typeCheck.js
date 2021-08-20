const { types, seasons, leagues } = require('./enum');
// || startWeek > endWeek || startWeek < 0 || endWeek > 50) {
function typeCheck(input) {
    // checking if the type input is correct
    if (!Object.values(types).includes(input.type)) throw new Error({ zzz: `Parameter should be one of those: ${Object.values(types)}` });

    // checking if selectedweeks are correct
    if (input.type === types.SELECTEDWEEKS) {
        if (input.selectedWeeks.length !== 2) throw new Error('Input should include 2 numbers, starting and an end week.');

        if (!Number.isInteger(input.selectedWeeks[0]) || !Number.isInteger(input.selectedWeeks[1])) throw new Error('Input should be integers');

        if (input.selectedWeeks[0] > input.selectedWeeks[1]) throw new Error('Second value should be greater than the first one');
    }

    // checking if the league input is correct
    if (!Array.isArray(input.leagues)) throw new Error(`League values should be stored in an array`);

    for (const league of input.leagues) {
        if (!Object.values(leagues).includes(league)) {
            throw new Error(`League ${league} does not exist. Available leagues: ${Object.values(seasons)}`);
        }
    }

    // checking if seasons are correct
    if (!Object.values(seasons).includes(input.season)) throw new Error(`Parameter should be one of those: ${Object.values(seasons)}`);

    // checking if proxy is boolean
    if (!isBoolean(input.useProxy)) throw new Error('proxy setting should be boolean');
}

function isBoolean(val) {
    return val === false || val === true;
}

module.exports = typeCheck;
