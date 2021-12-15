
## SoccerSTATS.com Scraper

**Description:** Actor to get football data from popular football leagues for 2021-2022 and 2020-2021 seasons. Soccer data includes matchweeks, tables, and schedules from 15+ European football leagues. 



Our SoccerSTATS.com Scraper provides an unofficial SoccerSTATS API for extracting the data on match results, schedules, progress over the weeks, etc. Using this scraper, you can pull data from the soccerstats.com website; it works best with leagues and matches pages.

## Features

So far, there are *four* main types of soccer stats data you can collect:

 - results from **league tables** containing statistics of how every team has been performing within the current league: the games played, wins vs. losses, goal differences, etc. It can contain leagues happening in one or different countries.
 - the entire **season schedule** for one or multiple leagues.
 - all available statistics of the **current matchday** for selected leagues. 
 - get the soccer games data from a specific **range of matchdays**— for instance, data from week 1 till week 7. 


## Cost of usage

Following our basic plan, the scraper's run will extract you **1,000 results for less than 1 USD credits**. For more details about the plans we offer, platform credits, and usage, see the  [platform pricing page](https://apify.com/pricing/actors).

If you're not sure how much credit you've got on your plan and whether you might need to upgrade, you can always check your limits in the  _Settings_  ->  _Usage and Billing_  tab in  [your Console](https://console.apify.com/). The easiest way to know how many credits your actor will need is to perform a test run. 

## Tutorial

For a more detailed explanation on how to scrape Soccerstats.com, see a quick [How to scrape SoccerSTATS tutorial](https://blog.apify.com/how-to-scrape-football-data-soccerstats/).  And if you need more ideas on how to use extracted data, check out our [industries pages](https://apify.com/industries)  showing examples of how enterprises use data scraped from the web in their workflows, projects, and missions. 

## Input parameters

If this actor is run on our [Platform](https://console.apify.com/), our brand new user-friendly interface will help you out in configuring all the necessary and optional parameters of this scraper before running it. This scraper recognizes the following input parameters:

 - **informationType** will define what category of information you're scraping from SoccerSTATS:
	 `TABLES` will scrape the entire **league table** and form a separate data block for every team with their names, current position on the chart, the number of games played, won, lost, points gained, etc. 
	 - `CURRENTWEEK`  corresponds with the **current matchday** feature. Matchday, in this case, is a relative term since some games happen a few days apart. This parameter will deliver a dataset containing all games happening at home and away this week, + which week number it is of the season, halftime, and final scores. It will also contain the results of planned games that don't have scores yet. 
	 - `SELECTEDWEEKS` corresponds with the **range of matchdays** feature and will allow getting matchday results within a time range of choice, e.g., from week 2 till 7 of this season. The time range can be defined using the `startWeek` and `endWeek` inputs. If you are using a different **Information type** input - `TABLES`, for example, you can safely ignore this pair of values.
	 - `FULLSCHEDULE` will get you the entire **season schedule** from start to finish, with scores and who was playing home/away. Note that this parameter provides everything but the matchday digit. So if you really need the matchday number as a part of your output, you can instead run the `SELECTEDWEEKS` and manually add the first and the last weeks. For example "1" as `startWeek` and "34" as `endWeek` parameter. 

 - **selectedLeagues** (*optional*). You can scrape these available leagues (with numbered countries being the lower league divisions): `brazil`, `czechrepublic`, `germany`, `germany2`, `denmark`, `england`, `england2`, `spain`, `spain2`, `france`, `france2`, `greece`, `netherlands`, `italy`, `italy2`, `poland`, `portugal`, `russia`, `turkey`.

 - **season** - lets you scrape the data from current or past seasons. So far, the available season inputs are: `2021-2022`, `2020-2021`.

**Note: You can follow the descriptions in the input editor to build your inputs easier.**

###  Example

```javascript
{  
	"informationType":  "CURRENTWEEK",  
	"selectedLeagues":  ["England"],  
	"startWeek":  1,  
	"endWeek":  10,  
	"proxyConfig": {  
		"useApifyProxy":  true 
	},  
	"season":  "2021-2022"  
}
```


## Output

The output from SoccerSTATS.com Scraper is stored in the  _Apify Dataset_. After the run is finished, you can choose to present and download the contents of the dataset in various data formats (JSON, XML, RSS, HTML Table).

###  Example

Here's the piece of the output you'd get if you run a task with the input parameters above:

```javascript
{
  "matchWeek": "14",
  "date": "30-11",
  "home": "Newcastle Utd",
  "score": "1 - 1",
  "away": "Norwich City",
  "ht": "0 - 0",
  "season": "2021-2022",
  "league": "england"
},
{
  "matchWeek": "14",
  "date": "30-11",
  "home": "Leeds Utd",
  "score": "1 - 0",
  "away": "Crystal Palace",
  "ht": "0 - 0",
  "season": "2021-2022",
  "league": "england"
},
{
  "matchWeek": "14",
  "date": "01-12",
  "home": "Southampton",
  "score": "2 - 2",
  "away": "Leicester City",
  "ht": "2 - 1",
  "season": "2021-2022",
  "league": "england"
},
...
```

**How to use the extracted football stats data:**

-  **Quickly collect the sports data** from the current and previous season and use it for news and sports journalism. 
-  **Combine automatic monitoring** of football stats with other sports-related websites for better sports insights.
-  **Scrape the match history** for the most accurate game forecasts.
-  **Build your own SoccerSTATS database** - for customized sports analysis dashboards.
-  **Back up your sports betting decisions with data**  in sports arbitrage tactics. 
-  **Support team performance monitoring**  to help identify the causes, correlations, and shifts in betting decisions. 

## Planned features

 - We're planning to add more leagues and more league divisions. 
 - Add more season inputs (the website offers soccer season data till 2013).
 - Add a possibility to scrape data on players. 
 - Scraping live scores.

## Other sports scrapers

We've got a few other football APIs and sport-related scrapers in stock for you; for instance, see this  [Transfermarkt Scraper.](https://apify.com/petr_cermak/transfermarkt)

## Your feedback

We're always working on improving the performance of our actors. So if you've got any feedback about the work of our SoccerSTATS API, do not hesitate to drop a line to [Apify support](mailto:support@apify.com). If you stumble upon a bug, feel free to create an issue on the  [Github page](https://github.com/levent91/soccer-stats-actor), and we'll get right to it.
