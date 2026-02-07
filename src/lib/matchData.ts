import ICAL from 'ical.js';
import { MatchData, RawMatchData, Location, Day, Time } from "./types";
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

const parseMatchData = (icalData:ICAL.Event[]):RawMatchData[] => {
  return icalData.map(i => {
    const teams = parseTeams(i.summary);

    if (teams) {
      return {
        uid: i.uid,
        teams: teams,
        location: i.location,
        endDate: i.endDate.toJSDate(),
        startDate: i.startDate.toJSDate(),
      };
    } else {
      return null;
    }
  })
  .filter(i => i != null);
}

const getStadium = (name:string):Location => {
  return Stadia.getInstance().getStadium(name);
}

const getTimeInfo = (date:Date):Time => {
  return new Time(
    date.getHours(),
    date.getMinutes(),
  );
}

const getDayAndTimeInfo = (rawData:RawMatchData):{day:Day, startTime:Time, endTime:Time} => {
  const day:Day = new Day(
    rawData.startDate.getFullYear(),
    rawData.startDate.getMonth(),
    rawData.startDate.getDay()
  );

  const startTime:Time = getTimeInfo(rawData.startDate);
  const endTime:Time = getTimeInfo(rawData.endDate);

  return {
    day,
    startTime,
    endTime
  }
}

const enrichMatchData = (rawData:RawMatchData):MatchData => {
  const location = getStadium(rawData.location);

  const { day, startTime, endTime } = getDayAndTimeInfo(rawData);

  return {
    teams: rawData.teams,
    uid: rawData.uid,
    day: day,
    startTime: startTime,
    endTime: endTime,
    location: location,
  }
}

export const getMatchData = (icalData:ICAL.Event[]) : MatchData[] => {
  const rawMatchData = parseMatchData(icalData);
  const matchData = rawMatchData.map(enrichMatchData)
    .sort((a, b) => a.day.compare(b.day))
  ;

  return matchData;
}
