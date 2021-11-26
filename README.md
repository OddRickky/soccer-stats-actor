
## Soccer Stats Scraper

Apify soccer-stats-scraper providing an API for the soccerstats.com website. This actor can extract data from soccerstats.com pages for the given inputs

**Note: You can follow the descriptions in the input editor to build your inputs easier.** 

There are 4 main types of data that you can gather: 

**League Table**: You can get league tables, using 'TABLES' as an input.

**Current Matchday**: You can get the results of the matchday for selected leagues, using 'CURRENTWEEK' as the input.

**Selected Matchdays**: You can get the results of matchdays between given weeks, using 'SELECTEDWEEKS' as the input. You should also provide two match weeks for startWeek and endWeek inputs. If you are using a different type, you can leave the those values as it is.

**Season Schedule**: You can get the entire season schedule, using 'FULLSCHEDULE' as the input. Note that this input does not provide match week numbers as the output, if you also want to include the matchday in your output, you can pass 'SELECTEDWEEKS' as the input and manually provide the start and the end week. e: [1,34]

### INPUT Example

```
{ 
    "type": "TABLES",
    "leagues": ["england", "france"],
    "season": "2021-2022",
    "startWeek": 1,
    "endWeek": 6,
    "useproxy": false
}
```

### Available type inputs:
"TABLES", "CURRENTWEEK", "SELECTEDWEEKS", "FULLSCHEDULE"

### Available season inputs:
 
"2021-2022", "2020-2021"

 ### Available league inputs:

"brazil", "czechrepublic", "germany", "germany2", "denmark", "england", "england2", "spain", "spain2", "france", "france2", "greece", "netherlands", "italy", "italy2", "poland", "portugal", "russia", "turkey"