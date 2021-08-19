const Apify = require('apify');
const dataFactory = require('./dataObjects');

async function getMatchData(request, $) {
    const { league } = request.userData;
    let { season } = request.userData;
    season = season === '2021-2022' ? '2021-2022' : `${season}-${parseInt(season, 10) + 1}`; // takes season in the correct format for prev yrs

    // If it is the currentweek I have to take the matchweek number from DOM as the url stores total stored weeks as the current one
    let { matchWeek } = request.userData;
    matchWeek = matchWeek === 'CURRENT' ? ($('font[color="#fcfcfc"]').text()).replace(/\s+/g, ' ').split(' ')[2] : matchWeek;
    const dataset = await Apify.openDataset(`matches-${league}-season-${season}`);

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
            });
            matchDayInfo.push(gameInformation);
        } else if (date && !matchWeek) { // Full Schedule page doesn't have weeknames. To get full schedule with week, use SELECTEDWEEKS type input.
            const gameInformation = dataFactory.createData('gameInformation', {
                date,
                home,
                score,
                away,
                ht,
                season,
            });
            matchDayInfo.push(gameInformation);
        }
    });
    await dataset.pushData(matchDayInfo);
}

async function getTable(request, $) {
    const { league } = request.userData;
    let { season } = request.userData;
    season = season === '2021-2022' ? '2021-2022' : `${season}-${parseInt(season, 10) + 1}`; // takes season in the correct format for prev yrs

    // position of the table is changing depending on league, so trying to get the table as other selector always has less elements
    const tableOrderArray = season === '2021-2022' ? [7, 6] : [1, 5]; // possible table selector positions
    const firstSelector = ($(`#btable:eq(${tableOrderArray[0]})`).find(`.odd`));
    const secondSelector = ($(`#btable:eq(${tableOrderArray[1]})`).find(`.odd`));

    const tableIndex = firstSelector.length > secondSelector.length ? tableOrderArray[0] : tableOrderArray[1];
    const teams = ($(`#btable:eq(${tableIndex})`).find(`.odd`));

    const dataset = await Apify.openDataset(`tables-${league}-season-${season}`);

    const totalColumns = 9;
    const tableSummary = [];

    teams.each((index) => {
        const teamData = dataFactory.createData('tableInformation', { season });
        let row = 0;
        while (row <= totalColumns) {
            const information = $(`#btable:eq(${tableIndex})`).find(`.odd:eq(${index})`).find(`td:eq(${row})`);
            teamData[Object.keys(teamData)[row]] = information.text().trim().replace(/\s+/g, ' ');
            row++;
        }
        tableSummary.push(teamData);
    });

    await dataset.pushData(tableSummary);
}

module.exports = { getMatchData, getTable };
