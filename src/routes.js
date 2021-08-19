const { getMatchData, getTable } = require('./matchFunctions');
const { utilLabels, seasons, types } = require('./enum');

exports.handleTables = async ({ request, $ }) => {
    await getTable(request, $);
};

exports.handleCurrentWeek = async ({ request, $ }, requestQueue) => { // gets the week number of the current week, url stores the total recorded weeks
    const currentMatchWeek = $('td[style*="background-color:#99c2ff"]'); // td[style*="background-color:#abebc6"] //background-color:#bbbbbb
    const currentMatchWeekText = currentMatchWeek.children().attr('href');
    const { league } = request.userData;

    await requestQueue.addRequest({ url: `http://www.soccerstats.com/${currentMatchWeekText}`,
        userData: {
            label: utilLabels.SCHEDULE, season: seasons.SEASON2022, league, matchWeek: types.CURRENTWEEK } });
};

exports.handleSchedule = async ({ request, $ }) => {
    await getMatchData(request, $);
};
