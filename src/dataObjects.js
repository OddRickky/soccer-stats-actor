const gameInformation = function ({ matchWeek, date, home, score, away, ht, season }) {
    this.matchWeek = matchWeek;
    this.date = date || '';
    this.home = home || '';
    this.score = score.includes(':') ? '' : score || ''; // if game is not played, this selector shows hour, like 19:45
    this.away = away || '';
    this.ht = ht || '';
    this.season = season || '';
};

const tableInformation = function ({ position, name, played, win, draw, lose, goalsFor, goalsAgainst, goalDifference, points, season }) {
    this.position = position || '';
    this.name = name || '';
    this.played = played || '';
    this.win = win || '';
    this.draw = draw || '';
    this.lose = lose || '';
    this.goalsFor = goalsFor || '';
    this.goalsAgainst = goalsAgainst || '';
    this.goalDifference = goalDifference || '';
    this.points = points || '';
    this.season = season || '';
};

const data = { gameInformation, tableInformation };

module.exports = {
    createData(type, attributes) {
        const SoccerData = data[type];
        return new SoccerData(attributes);
    },
};
