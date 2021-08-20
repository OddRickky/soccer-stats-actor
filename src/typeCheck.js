const { types, seasons, leagues } = require('./enum');

function typeCheck(inputType, inputLeagues, inputStartWeek, inputEndWeek, inputSeason, inputProxyConfiguration) {
    // checking if the type input is correct
    if (!Object.values(types).includes(inputType)) throw new Error(`Wrong type input: Parameter should be one of those: ${Object.values(types)}`);

    // checking if selectedweeks are correct
    if (inputType === types.SELECTEDWEEKS) {
        if ((typeof inputStartWeek !== 'number') || (typeof inputEndWeek !== 'number')) {
            throw new Error('Wrong selected weeks input:Input should include 2 numbers, starting and an end week.');
        }

        if (!(isInteger(inputStartWeek)) || !(isInteger(inputEndWeek))) {
            throw new Error('Wrong selected weeks input: Input can\'t be a float number');
        }

        if (inputStartWeek > inputEndWeek) throw new Error('Wrong selected weeks input: endWeek should be greater than the startWeek');
    }

    // checking if the league input is correct
    if (!Array.isArray(inputLeagues)) throw new Error(`Wrong league input: League values should be stored in an array`);

    for (const league of inputLeagues) {
        if (!Object.values(leagues).includes(league)) {
            throw new Error(`Wrong league input: Parameter ${league} does not exist. Available league inputs: ${Object.values(leagues)}`);
        }
    }

    // checking if seasons are correct
    if (!Object.values(seasons).includes(inputSeason)) throw new Error(`Wrong season input: Available season inputs - ${Object.values(seasons)}`);

    // checking if proxy settings are in an object
    if (!(typeof inputProxyConfiguration === 'object')) throw new Error(`Wrong proxy input: Configuration settings must be stored in an object`);

    // checking if proxy settings has useApifyProxy
    if (!('useApifyProxy' in inputProxyConfiguration)) throw new Error(`Wrong proxy input: Configuration object should have a key 'useApifyProxy'`);
}

function isInteger(n) {
    return parseInt(n, 10) === n;
}

module.exports = typeCheck;
