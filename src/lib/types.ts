const dayFormatter = Intl.DateTimeFormat('en-GB', { dateStyle: 'long' });
const timeFormatter = Intl.DateTimeFormat('en-GB', { timeStyle: 'short' });

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

export interface Month {
  month: string,
  year: number
}

export interface MonthMatches {
  key: string,
  month: Month,
  days: DayMatches[]
}

export interface DayMatches {
  key: string,
  day: number,
  month: Month,
  times: TimeMatches[]
}

export interface TimeMatches {
  key: string,
  time: {
    hour: number,
    minute: number
  },
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

export const toDateString = (date:Date):string => dayFormatter.format(date);

export const toTimeString = (date:Date):string => timeFormatter.format(date);

export function groupIntoMonths(matches: MatchData[]):MonthMatches[] { 
  const matchData = matches.reduce((acc, match) => { 
    const d = match.start;
    const monthKey = `${d.getFullYear()}-${d.getMonth() + 1}`
    const day = d.getDate();
    const time = `${d.getHours()}:${d.getMinutes()}`;
    
    acc[monthKey] ??= {}; 
    acc[monthKey][day] ??= {}; 
    acc[monthKey][day][time] ??= [];
    acc[monthKey][day][time].push(match); 
    
    return acc; 
  }, {} as Record<string, Record<number, Record<string, MatchData[]>>>); 

  return Object
    .entries(matchData)
    .map(([monthKey, daysObj]) => {
      const [yearStr, monthStr] = monthKey.split("-");
      const year = Number(yearStr);
      const month = toMonthString(Number(monthStr));

      const days: DayMatches[] = Object
        .entries(daysObj)
        .map(([dayStr, matchesObj]) => {

          const times:TimeMatches[] = Object
            .entries(matchesObj)
            .map(([startTime, matches]) => {
              const [hourStr, mintueStr] = startTime.split(":");

              return {
                key: startTime,
                time: {
                  hour: Number(hourStr),
                  minute: Number(mintueStr)
                },
                matches: matches.map(toDisplay)
              }
            });

        return {
          key: `${month}-${dayStr}`,
          day: Number(dayStr),
          month: {month: month, year: year},
          times:times
        };
      }
    );

    return {
      key: `${year}-${month}`,
      month: {
        month,
        year
      },
      days
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

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const toMonthString = (month:number) => {
  if (month < 1 || month > 12){
    throw new Error('Invalid month');
  }

  return months[month - 1];
}