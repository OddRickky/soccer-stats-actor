const { utilLabels, types, seasons, url } = require('./enum');

async function buildCurrentWeek(userData, requestQueue) { // adds request url and userdata to get to page where it can access the matchweek number
    const { leagues, season } = userData;
    for (const league of leagues) {
        await requestQueue.addRequest({ url: `${url.RESULTS}${league}`,
            userData: { label: utilLabels.CURRENT, league, season } });
    }
}

async function buildSelectedWeeks(userData, requestQueue) { // adds request url and userdata for the current week
    const { season, leagues } = userData;

    for (const league of leagues) {
        let startWeek = userData.selectedWeeks[0];
        const endWeek = userData.selectedWeeks[1];
        const leagueYear = season === seasons.SEASON2022 ? `${league}` : `${league}_${season}`;

        while (startWeek <= endWeek) {
            await requestQueue.addRequest({ url: `${url.RESULTS}${leagueYear}&pmtype=round${startWeek}`,
                userData: { label: utilLabels.SCHEDULE, league, season, matchWeek: startWeek } });
            startWeek++;
        }
    }
}

async function buildFullSchedule(userData, requestQueue) { // adds request url and userdata for the season schedule
    const { leagues, season } = userData;
    for (const league of leagues) {
        const leagueYear = season === seasons.SEASON2022 ? `${league}` : `${league}_${season}`;
        await requestQueue.addRequest({ url: `${url.RESULTS}${leagueYear}&pmtype=bydate`,
            userData: { label: utilLabels.SCHEDULE, league, season } });
    }
}

async function buildTables(userData, requestQueue) { // adds request url and userdata to build the league table
    const { leagues, season } = userData;
    for (const league of leagues) {
        const leagueYear = season === seasons.SEASON2022 ? `${league}` : `${league}_${season}`;
        await requestQueue.addRequest({ url: `${url.LATEST}${leagueYear}`,
            userData: { label: utilLabels.LEAGUETABLES, league, season } });
    }
}

function invalidParam(label) {
    throw new Error(`${label} is an invalid input, please check your inputs.`);
}

async function buildRequests(userData, requestQueue) {
    const label = userData.type;
    switch (label) {
        case types.SELECTEDWEEKS:
            return buildSelectedWeeks(userData, requestQueue);
        case types.CURRENTWEEK:
            return buildCurrentWeek(userData, requestQueue);
        case types.FULLSCHEDULE:
            return buildFullSchedule(userData, requestQueue);
        case types.TABLES:
            return buildTables(userData, requestQueue);
        default:
            return invalidParam(label);
    }
}

module.exports = buildRequests;
