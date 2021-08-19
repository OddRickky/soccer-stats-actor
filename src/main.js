const Apify = require('apify');
const buildRequests = require('./requestBuilders');
const typeCheck = require('./typeCheck');
const { handleTables, handleSchedule, handleCurrentWeek } = require('./routes');
const { utilLabels } = require('./enum');

const { utils: { log } } = Apify;

Apify.main(async () => {
    const rawInput = await Apify.getInput();

    const input = {
        type: rawInput.type.toUpperCase(), // TABLES //SELECTEDWEEKS // CURRENTWEEK // // FULLSCHEDULE
        leagues: rawInput.leagues.map((league) => league.toLowerCase()),
        selectedWeeks: rawInput.selectedWeeks, // array of two items
        season: rawInput.season, // or '2021-2022' '2020'
        useProxy: rawInput.useProxy, // boolean
    };
    typeCheck(input);

    const requestQueue = await Apify.openRequestQueue();
    const proxyConfiguration = await Apify.createProxyConfiguration({ useApifyProxy: input.useProxy });
    await buildRequests(input, requestQueue);

    const crawler = new Apify.CheerioCrawler({
        requestQueue,
        proxyConfiguration,
        useSessionPool: true,
        persistCookiesPerSession: true,
        sessionPoolOptions: {
            maxPoolSize: 100,
        },
        maxConcurrency: 5,
        handlePageFunction: async (context) => {
            const { url, userData: { label } } = context.request;
            log.info('Page opened.', { label, url });
            switch (label) {
                case utilLabels.LEAGUETABLES:
                    return handleTables(context);
                case utilLabels.CURRENT:
                    return handleCurrentWeek(context, requestQueue);
                case utilLabels.SCHEDULE:
                    return handleSchedule(context);
                default:
                    throw new Error('Invalid label');
            }
        },
        handleFailedRequestFunction: async ({ request }) => { // need to learn here a bit more
            log.error(`request: ${request.url} has failed`);
        },
    });
    log.info('Starting the crawl.');
    await crawler.run();
    log.info('Crawl finished.');
});
