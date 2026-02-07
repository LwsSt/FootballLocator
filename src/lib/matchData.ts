import ICAL from 'ical.js';
import { MatchData, Location } from "./types";
import { Stadia } from "./stadia";

const parseTeams = (summary:string):[string, string]|null => {
  const regex = /([\w ]+) vs? ([\w ]+)/
  const result = summary.match(regex);

  if (result) {
    return [result[1].trim(), result[2].trim()];
  } else {
    return null;
  }
}

const getStadium = (name:string):Location => {
  return Stadia.getInstance().getStadium(name);
}

const parseMatchData = (icalData:ICAL.Event[]):MatchData[] => {
  return icalData.map(i => {
    const teams = parseTeams(i.summary);
    const location = getStadium(i.location);

    if (teams) {
      return {
        uid: i.uid,
        teams: teams,
        location: location,
        end: i.endDate.toJSDate(),
        start: i.startDate.toJSDate(),
      };
    } else {
      return null;
    }
  })
  .filter(i => i != null);
}


export const getMatchData = (icalData:ICAL.Event[]) : MatchData[] => {
  const matchData = parseMatchData(icalData);

  return matchData;
}
