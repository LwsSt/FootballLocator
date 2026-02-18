const fullDateFormatter = Intl.DateTimeFormat('en-GB', { dateStyle: 'long' });
const timeFormatter = Intl.DateTimeFormat('en-GB', { timeStyle: 'short' });
const monthAndYearFormatter = Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric' });
const dayAndMonthFormatter = Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' });

export type Uid = string;
export type Year = number;

export interface Location {
  name: string,
  coords: [number, number],
  dataLink: string
}

export interface MatchData {
  uid: Uid,
  teams: [string, string],
  location: Location,
  start: Date,
  end: Date
}

export interface MonthMatches {
  key: string,
  month: Date,
  days: DayMatches[]
}

export interface DayMatches {
  key: string,
  day: Date,
  times: TimeMatches[]
}

export interface TimeMatches {
  key: string,
  time: Date
  matches: MatchDisplay[]
}

export interface MatchDisplay {
  uid:string,
  teams: [string, string],
  location: {
    stadium: string,
    city: string
  },
  day: string,
  startTime: string,
  endTime: string
}

export const toDateString = (date:Date):string => fullDateFormatter.format(date);

export const toTimeString = (date:Date):string => timeFormatter.format(date);

export const toMonthAndYearString = (date:Date):string => monthAndYearFormatter.format(date);

export const toDayAndMonthString = (date:Date):string => dayAndMonthFormatter.format(date);

export function groupIntoMonths(matches: MatchData[]):MonthMatches[] { 
  const matchData = matches.reduce((acc, match) => { 
    const date = new Date(match.start);

    const timeKey = date.getTime();
    date.setSeconds(0, 0);
    date.setMinutes(0);
    date.setHours(0);
    const dayKey = date.getTime();
    date.setDate(1);
    const monthKey = date.getTime();
    
    acc[monthKey] ??= {}; 
    acc[monthKey][dayKey] ??= {}; 
    acc[monthKey][dayKey][timeKey] ??= [];
    acc[monthKey][dayKey][timeKey].push(match); 
    
    return acc; 
  }, {} as Record<number, Record<number, Record<number, MatchData[]>>>); 


  return Object
    .entries(matchData)
    .map(([monthKey, daysObj]) => {

      const days: DayMatches[] = Object
        .entries(daysObj)
        .map(([dayKey, matchesObj]) => {

          const times:TimeMatches[] = Object
            .entries(matchesObj)
            .map(([timeKey, matches]) => {
              const time = new Date(Number(timeKey));

              return {
                key: timeKey,
                time: time,
                matches: matches.map(toDisplay)
              }
            });

        const day = new Date(Number(dayKey));

        return {
          key: dayKey,
          day: day,
          times:times
        };
      }
    );

    const month = new Date(Number(monthKey));


    return {
      key: monthKey,
      month: month,
      days: days
    };
  });
}

const toDisplay = (match:MatchData):MatchDisplay =>{
  return {
    uid: match.uid,
    location: {
      stadium: match.location.name,
      city: 'CITY'
    },
    teams: match.teams,
    day: toDateString(match.start),
    startTime: toTimeString(match.start),
    endTime: toTimeString(match.end)
  };
}
