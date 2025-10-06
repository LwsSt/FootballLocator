import { Fetch } from "@11ty/eleventy-fetch";
import ical from "ical";
import leagues from "./leagues.json" with { type: "json" };

interface LeagueData {
  name: string,
  link: string
}

interface Match {
  teams: [string, string],
  location: string,
  startDate: Date,
  endDate: Date
}

const parseTeams = (summary:string):[string, string] => {
  const regex = /([\w ]+) v ([\w ]+)/
  const result = summary.match(regex);

  if (result) {
    return [result[1].trim(), result[2].trim()];
  } else {
    return ['', ''];
  }
}

const getMatchData = async (leagueData:LeagueData):Promise<Match[]> => {

  const link = leagueData.link;

  const request = Fetch(link, {
      type: "text",
      duration: "0s",
      verbose: false,
      responseType: "response"
  });

  const rawData = await request.fetch();

  const icalData = ical.parseICS(rawData);

  const entries = Object.entries(icalData)
  //   //.slice(0, 1)
    .map(([key, evt]) => {
      return {
        teams: parseTeams(evt.summary),
        location: evt.location,
        startDate: evt.start,
        endDate:evt.end
      }
  });

  // //console.log(rawData);
  // console.log(entries);

  return entries;
}


const getData = async () :Promise<Match[]> => {
  const matches = leagues.map(l => getMatchData(l))
  return (await Promise.all(matches)).flat();
}

module.exports.getData = getData