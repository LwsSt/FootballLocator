export type Uid = string;
export type Year = number;

export interface Location {
  id: string,
  coords: [string, string],
  stadium: string,
  city: string,
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
  matches: MatchData[]
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
                matches: matches
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

export function getMapsLink(matchData:MatchData) {
  const [lat, lng] = matchData.location.coords;

  return `https://www.google.com/maps?q=${lat},${lng}`;
}
