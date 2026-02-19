import { Fragment } from 'react';
import { matchData } from '@/lib/matches';
import { DayMatches, getMapsLink, groupIntoMonths, MatchData, TimeMatches } from '@/lib/types';
import { toDayAndMonth, toDayName, toMonthAndYear, toTime } from '@/lib/dateFns';
import Link from 'next/link';

function Match(props:{ match:MatchData}) {
  const { match: m } = props;
  const [teamA, teamB] = m.teams;
  const { id, stadium, city } = m.location;

  return (
    <div className="match-item">
      <div className="match-teams">{teamA} vs {teamB}</div>
      <Link className="match-location-info" href={getMapsLink(m)} target="_blank" rel="noopener noreferrer">
        <span>📍</span>
        <div>
          <div className="stadium-name">{stadium}</div>
          <div className="city-name">{city}</div>
          <div style={{ display: "none" }}>{id}</div>
        </div>
      </Link>
    </div>
  );
}

function Time(props: {time:TimeMatches}) {
  const { time: time } = props;

  return (
    <details className="time-slot">
      <summary>
        <div className="time-slot-header">
            <div className="slot-time">{toTime(time.time)}</div>
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
  const dayName = toDayName(day.day);
  const totalMatches = day.times.map(t => t.matches.length).reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="match-card danger">
      <div className="match-card-header">
          <div className="match-date-info">
              <div className="match-day">{dayName}</div>
              <div className="match-date">{toDayAndMonth(day.day)}</div>
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

export default function Home() {

  const { months:months } = getMatches();

  return (
      <Fragment>
          {months.map((m) => (
            <Fragment key={m.key}>
              <div className="month-header">
                  <div className="month-header-title">{toMonthAndYear(m.month)}</div>
              </div>
              <div className="match-grid">
                  {m.days.map(d => <Day day={d} key={d.key} />)}
              </div>
            </Fragment>
          ))}
    </Fragment>
  )
}

function getMatches() {
  const data = matchData;

  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);

  const sortedData = data
    .sort((a, b) => a.start.getTime() - b.start.getTime());

  const matches = groupIntoMonths(sortedData);

  return {
      months: matches
    };
}
