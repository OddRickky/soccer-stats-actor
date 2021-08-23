const { utilLabels, types, seasons, baseUrl } = require('./enum');

async function buildRequestOptions(urlType, label, league, season, matchWeek) {
    return {
        url: urlType,
        userData: {
            label,
            league,
            season,
            matchWeek,
        },
    };
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

exports.buildRequests = async (type, leagues, season, startWeek, endWeek) => {
    const label = type;
    const requestOptionsArray = [];
    switch (label) {
        case types.SELECTEDWEEKS:
            for (const league of leagues) {
                let start = startWeek;
                const end = endWeek;
                const leagueYear = season === seasons.SEASON2022 ? `${league}` : `${league}_${season}`;

                while (start <= end) {
                    const url = `${baseUrl.RESULTS}${leagueYear}&pmtype=round${start}`;
                    const requestOptions = await buildRequestOptions(url, utilLabels.CURRENT, league, season, start);
                    requestOptionsArray.push(requestOptions);
                    start++;
                }
            }
            return requestOptionsArray;

        case types.CURRENTWEEK:
            for (const league of leagues) {
                const url = `${baseUrl.RESULTS}${league}`;

                const requestOptions = await buildRequestOptions(url, utilLabels.CURRENT, league, season);
                requestOptionsArray.push(requestOptions);
            }
            return requestOptionsArray;

        case types.FULLSCHEDULE:
            for (const league of leagues) {
                const leagueYear = season === seasons.SEASON2022 ? `${league}` : `${league}_${season}`;
                const url = `${baseUrl.RESULTS}${leagueYear}&pmtype=bydate`;

                const requestOptions = await buildRequestOptions(url, utilLabels.SCHEDULE, league, season);
                requestOptionsArray.push(requestOptions);
            }
            return requestOptionsArray;

        case types.TABLES:
            for (const league of leagues) {
                const leagueYear = season === seasons.SEASON2022 ? `${league}` : `${league}_${season}`;
                const url = `${baseUrl.LATEST}${leagueYear}`;

                const requestOptions = await buildRequestOptions(url, utilLabels.LEAGUETABLES, league, season);
                requestOptionsArray.push(requestOptions);
            }
            return requestOptionsArray;

        default:
            return invalidParam(label);
    }
};
