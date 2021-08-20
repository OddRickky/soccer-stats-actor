const { utilLabels, types, seasons, url } = require('./enum');

// adds request url and userdata to get to page where it can access the matchweek number
async function buildCurrentWeek(leagues, season, requestQueue) {
    for (const league of leagues) {
        await requestQueue.addRequest({ url: `${url.RESULTS}${league}`,
            userData: { label: utilLabels.CURRENT, league, season } });
    }
}
// adds request url and userdata for the current week
async function buildSelectedWeeks(leagues, season, startWeek, endWeek, requestQueue) {
    let start = startWeek;
    const end = endWeek;
    for (const league of leagues) {
        start = startWeek;
        const leagueYear = season === seasons.SEASON2022 ? `${league}` : `${league}_${season}`;

        while (start <= end) {
            await requestQueue.addRequest({ url: `${url.RESULTS}${leagueYear}&pmtype=round${start}`,
                userData: { label: utilLabels.SCHEDULE, league, season, matchWeek: start } });
            start++;
        }
    }
}
// adds request url and userdata for the season schedule
async function buildFullSchedule(leagues, season, requestQueue) {
    for (const league of leagues) {
        const leagueYear = season === seasons.SEASON2022 ? `${league}` : `${league}_${season}`;
        await requestQueue.addRequest({ url: `${url.RESULTS}${leagueYear}&pmtype=bydate`,
            userData: { label: utilLabels.SCHEDULE, league, season } });
    }
}
// adds request url and userdata to build the league table
async function buildTables(leagues, season, requestQueue) {
    for (const league of leagues) {
        const leagueYear = season === seasons.SEASON2022 ? `${league}` : `${league}_${season}`;
        await requestQueue.addRequest({ url: `${url.LATEST}${leagueYear}`,
            userData: { label: utilLabels.LEAGUETABLES, league, season } });
    }
}
// gets the week number of the current week, url stores the total recorded weeks
exports.findCurrentWeek = async ({ request, $ }, requestQueue) => {
    const currentMatchWeek = $('td[style*="background-color:#99c2ff"]'); // td[style*="background-color:#abebc6"] //background-color:#bbbbbb
    const currentMatchWeekText = currentMatchWeek.children().attr('href');
    const { league } = request.userData;

    await requestQueue.addRequest({ url: `http://www.soccerstats.com/${currentMatchWeekText}`,
        userData: {
            label: utilLabels.SCHEDULE, season: seasons.SEASON2022, league, matchWeek: utilLabels.CURRENT } });
};

function invalidParam(label) {
    throw new Error(`${label} is an invalid input, please check your inputs.`);
}

exports.buildRequests = async (type, leagues, season, startWeek, endWeek, requestQueue) => {
    const label = type;
    switch (label) {
        case types.SELECTEDWEEKS:
            return buildSelectedWeeks(leagues, season, startWeek, endWeek, requestQueue);
        case types.CURRENTWEEK:
            return buildCurrentWeek(leagues, season, requestQueue);
        case types.FULLSCHEDULE:
            return buildFullSchedule(leagues, season, requestQueue);
        case types.TABLES:
            return buildTables(leagues, season, requestQueue);
        default:
            return invalidParam(label);
    }
};
