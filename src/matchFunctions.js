const Apify = require('apify');
const dataFactory = require('./dataObjects');
const { utilLabels, seasons } = require('./enum');

async function getMatchData(request, $) {
    const { league } = request.userData;
    let { season } = request.userData;
    // the code below is to format the output into the proper format. Current season value is 2021-2022, but previous seasons only have starting year
    // e: 2020, 2019 etc. So to format them in a more proper way, season-(season+1) was used here.
    season = season === seasons.SEASON2022 ? seasons.SEASON2022 : `${season}-${parseInt(season, 10) + 1}`;

    let { matchWeek } = request.userData;
    if (matchWeek === utilLabels.CURRENT) {
        const currentMatchWeek = ($('font[color="#fcfcfc"]').text()).replace(/\s+/g, ' ').split(' ')[2];
        matchWeek = currentMatchWeek;
    }
    // const dataset = await Apify.openDataset(`matches-${league}-season-${season}`); path for sdk

    const matchInformationRow = $('#btable:eq(0)').find('.odd');
    const matchDayInfo = [];
    Object.entries(matchInformationRow).forEach(([i]) => {
        const date = ($('#btable:eq(0)').find(`.odd:eq(${i})`).find(`td:eq(0)`).text())
            .trim();
        const home = (($('#btable:eq(0)').find(`.odd:eq(${i})`).find(`td:eq(1)`).text()))
            .trim();
        const score = (($('#btable:eq(0)').find(`.odd:eq(${i})`).find(`td:eq(2)`).text()))
            .trim();
        const away = (($('#btable:eq(0)').find(`.odd:eq(${i})`).find(`td:eq(3)`).text()))
            .trim();
        const ht = (($('#btable:eq(0)').find(`.odd:eq(${i})`).find(`td:eq(5)`).text()))
            .trim();
        if (date && matchWeek) {
            const gameInformation = dataFactory.createData('gameInformation', {
                matchWeek,
                date,
                home,
                score,
                away,
                ht,
                season,
                league,
            });
            matchDayInfo.push(gameInformation);
        } else if (date && !matchWeek) { // Full Schedule page doesn't have weeks. To get full schedule with week, use SELECTEDWEEKS type input.
            const gameInformation = dataFactory.createData('gameInformation', {
                date,
                home,
                score,
                away,
                ht,
                season,
                league,
            });
            matchDayInfo.push(gameInformation);
        }
    });
    await Apify.pushData(matchDayInfo);
}

async function getTable(request, $) {
    const { league } = request.userData;
    let { season } = request.userData;

    // the code below is to format the output into the proper format. Current season value is 2021-2022, but previous seasons only have starting year
    // e: 2020, 2019 etc. So to format them in a more proper way, season-(season+1) was used here.
    season = season === seasons.SEASON2022 ? seasons.SEASON2022 : `${season}-${parseInt(season, 10) + 1}`;

    // position of the table is changing depending on league, so trying to get the table as other selector always has less elements
    const tableOrderArray = season === seasons.SEASON2022 ? [7, 6] : [1, 5]; // possible table selector positions
    const firstSelector = ($(`#btable:eq(${tableOrderArray[0]})`).find(`.odd`));
    const secondSelector = ($(`#btable:eq(${tableOrderArray[1]})`).find(`.odd`));

    const tableIndex = firstSelector.length > secondSelector.length ? tableOrderArray[0] : tableOrderArray[1];
    const teams = ($(`#btable:eq(${tableIndex})`).find(`.odd`));

    // const dataset = await Apify.openDataset(`tables-${league}-season-${season}`); path for sdk

    const totalColumns = 9;
    const tableSummary = [];

    teams.each((index) => {
        const teamData = dataFactory.createData('tableInformation', { season, league });
        let row = 0;
        while (row <= totalColumns) {
            const information = $(`#btable:eq(${tableIndex})`).find(`.odd:eq(${index})`).find(`td:eq(${row})`);
            teamData[Object.keys(teamData)[row]] = information.text().trim().replace(/\s+/g, ' ');
            row++;
        }
        tableSummary.push(teamData);
    });
    await Apify.pushData(tableSummary);
}

module.exports = { getMatchData, getTable };
