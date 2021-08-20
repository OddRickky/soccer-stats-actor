const Apify = require('apify');
const { buildRequests, findCurrentWeek } = require('./requestBuilders');
const typeCheck = require('./typeCheck');
const { getMatchData, getTable } = require('./matchFunctions');
const { utilLabels } = require('./enum');

const { utils: { log } } = Apify;

Apify.main(async () => {
    const input = await Apify.getInput();

    const {
        type = input.informationType.toUpperCase(),
        leagues = input.selectedLeagues.map((league) => league.toLowerCase()),
        startWeek,
        endWeek,
        season,
        proxyConfig,
    } = input;

    typeCheck(type, leagues, startWeek, endWeek, season, proxyConfig);

    const requestQueue = await Apify.openRequestQueue();
    const proxyConfiguration = await Apify.createProxyConfiguration(proxyConfig);

    await buildRequests(type, leagues, season, startWeek, endWeek, requestQueue);

    const crawler = new Apify.CheerioCrawler({
        requestQueue,
        proxyConfiguration,
        useSessionPool: true,
        persistCookiesPerSession: true,
        handlePageFunction: async (context) => {
            const { $, request } = context;
            const { url, userData: { label } } = request;
            log.info('Page opened.', { label, url });
            switch (label) {
                case utilLabels.LEAGUETABLES:
                    return getTable(request, $);
                case utilLabels.CURRENT:
                    return findCurrentWeek(context, requestQueue);
                case utilLabels.SCHEDULE:
                    return getMatchData(request, $);
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
