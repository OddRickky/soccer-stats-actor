const baseUrl = {
    RESULTS: 'http://www.soccerstats.com/results.asp?league=',
    LATEST: 'http://www.soccerstats.com/latest.asp?league=',
};

const types = {
    TABLES: 'TABLES',
    SELECTEDWEEKS: 'SELECTEDWEEKS',
    CURRENTWEEK: 'CURRENTWEEK',
    FULLSCHEDULE: 'FULLSCHEDULE',
};
// naming here might change

const utilLabels = {
    SCHEDULE: 'SCHEDULE',
    LEAGUETABLES: 'LEAGUETABLES',
    CURRENT: 'CURRENT',
};

// will expand for small leagues & leagues that have two seasons (apertura/clasura)

const seasons = {
    SEASON2022: '2021-2022',
    SEASON2021: '2020',
};

// available leagues so far, smaller/different leagues have different dom elements and selectors, to be expanded.

const leagues = {
    BRAZIL: 'brazil',
    CZECHREPUBLIC: 'czechrepublic',
    GERMANY: 'germany',
    GERMANY2: 'germany2',
    DENMARK: 'denmark',
    ENGLAND: 'england',
    ENGLAND2: 'england2',
    SPAIN: 'spain',
    SPAIN2: 'spain2',
    FRANCE: 'france',
    FRANCE2: 'france2',
    GREECE: 'greece',
    NETHERLANDS: 'netherlands',
    ITALY: 'italy',
    ITALY2: 'italy2',
    POLAND: 'poland',
    PORTUGAL: 'portugal',
    RUSSIA: 'russia',
    TURKEY: 'turkey',
};

module.exports = { types, seasons, utilLabels, leagues, baseUrl };
