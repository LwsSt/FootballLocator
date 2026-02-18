import { Fragment } from 'react';
import { getData } from '@/lib/matches';
import { DayMatches, groupIntoMonths, MatchDisplay, TimeMatches, toTimeString } from '@/lib/types';

function Match(props:{ match:MatchDisplay}) {
  const { match: m } = props;
  const [teamA, teamB] = m.teams;
  const { stadium, city } = m.location;

  return (
    <div className="match-item">
      <div className="match-teams">{teamA} vs {teamB}</div>
      <div className="match-location-info">
        <span>📍</span>
        <div>
          <div className="stadium-name">{stadium}</div>
          <div className="city-name">{city}</div>
        </div>
      </div>
    </div>
  );
}

function Time(props: {time:TimeMatches}) {
  const { time: time } = props;
  const matchTime = new Date();
  matchTime.setHours(time.time.hour);
  matchTime.setMinutes(time.time.minute);

  return (
    <details className="time-slot">
      <summary>
        <div className="time-slot-header">
            <div className="slot-time">{toTimeString(matchTime)}</div>
            <div className="slot-count">{time.matches.length} Matches</div>
        </div>
      </summary>
      <div className="matches-list">
        {time.matches.map(m => <Match match={m} key={m.uid} />)}
      </div>
    </details>
  );
}

function Day(props: { day:DayMatches }) {
  const { day: day } = props;
  const date = new Date(`${day.day} ${day.month.month} ${day.month.year}`);
  const dayName = date.toLocaleString('default', { weekday: 'long'});
  const totalMatches = day.times.map(t => t.matches.length).reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="match-card danger">
      <div className="match-card-header">
          <div className="match-date-info">
              <div className="match-day">{dayName}</div>
              <div className="match-date">{day.day} {day.month.month}</div>
              <div className="total-matches">{totalMatches} Matches Total</div>
          </div>
          <div className="match-status">LIVE NOW</div>
      </div>
      
      <div className="time-slots">
        {day.times.map(t => <Time time={t} key={t.key} />)}
      </div>
    </div>
  );
}

export default async function Home() {

  const { months:months } = await getMatches();

  return (
      <Fragment>
          {months.map((m) => (
            <Fragment key={m.key}>
              <div className="month-header">
                  <div className="month-header-title">{m.month.month} 2026</div>
              </div>
              <div className="match-grid">
                  {m.days.map(d => <Day day={d} key={d.key} />)}
              </div>
            </Fragment>
          ))}
    </Fragment>
  )
}

async function getMatches() {
  const data = await getData();

  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);

  const sortedData = data
    .filter(m => m.start >= today)
    .sort((a, b) => a.start.getTime() - b.start.getTime());

  const matches = groupIntoMonths(sortedData);

  return {
      months: matches
    };
}
