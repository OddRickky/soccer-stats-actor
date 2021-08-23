const { types, seasons, leagues } = require('./enum');

function typeCheck(inputType, inputLeagues, inputStartWeek, inputEndWeek, inputSeason, inputProxyConfiguration) {
    // checking if the type input is correct
    if (!Object.values(types).includes(inputType)) throw new Error(`Wrong type input: Parameter should be one of those: ${Object.values(types)}`);

    // checking if selectedweeks are correct
    if (inputType === types.SELECTEDWEEKS) {
        if ((typeof inputStartWeek !== 'number') || (typeof inputEndWeek !== 'number')) {
            const message = 'Input should include 2 numbers, starting and an end week.';
            throw new Error(`Wrong ${inputType} input: ${message}`);
        }

        if (!(isInteger(inputStartWeek)) || !(isInteger(inputEndWeek))) {
            const message = 'Input can\'t be a float number';
            throw new Error(`Wrong startWeek or endWeek input: ${message}`);
        }

        if (inputStartWeek > inputEndWeek) {
            const message = 'endWeek should be greater than the startWeek';
            throw new Error(`Wrong selected weeks input: endWeek ${message}`);
        }
    }

    // checking if the league input is correct
    if (!Array.isArray(inputLeagues)) {
        const message = `League values should be stored in an array`;
        throw new Error(`Wrong league input: ${message}`);
    }

    for (const league of inputLeagues) {
        if (!Object.values(leagues).includes(league)) {
            const message = `Parameter ${league} does not exist. Available league inputs: ${Object.values(leagues)}`;
            throw new Error(`Wrong league input: ${message}`);
        }
    }

    // checking if seasons are correct
    if (!Object.values(seasons).includes(inputSeason)) {
        const message = `Available season inputs - ${Object.values(seasons)}`;
        throw new Error(`Wrong season input: ${message}`);
    }

    // checking if proxy settings are in an object
    if (!(typeof inputProxyConfiguration === 'object')) {
        const message = `Configuration settings must be stored in an object`;
        throw new Error(`Wrong proxy input: ${message}`);
    }

    // checking if proxy settings has useApifyProxy
    if (!('useApifyProxy' in inputProxyConfiguration)) {
        const message = `Configuration object should have a key 'useApifyProxy'`;
        throw new Error(`Wrong proxy input: ${message}`);
    }
}

function isInteger(n) {
    return parseInt(n, 10) === n;
}

module.exports = typeCheck;
