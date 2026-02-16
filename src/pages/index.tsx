import { Fragment } from 'react';
import { getData } from '@/lib/matches';
import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { DayMatches, groupIntoMonths, MatchDisplay, MonthMatches } from '@/lib/types';

function Match(props:{ match:MatchDisplay}) {
  const { match: m } = props;

  return (
    <p>{m.startTime} - {m.endTime}: <span style={{color:'gray'}}>{m.teams[0]} vs {m.teams[1]}</span></p>
  );
}

function Day(props: { day:DayMatches }) {
  const { day: day } = props;

  return (
  <div>
    <h2>{day.day} <span>{day.month.month} {day.month.year}</span> <span style={{ color: 'gray'}}>({day.matches.length} matches)</span></h2>
    {day.matches.map(d => <Match match={d} key={d.uid} />)}
  </div>
  );
}

export default function Home({
  months: months
}:InferGetStaticPropsType<typeof getStaticProps>) {

  return (
    <div>
      {months.map((m) => (
        <Fragment key={m.key}>
          <h1 style={{color: 'red' }}>{m.month.month} {m.month.year}</h1>
          {m.days?.map(d =>(
              <Day day={d} key={d.key} />
            ))}
          <hr />
        </Fragment>
      ))}
    </div>
  )
}

export const  getStaticProps = (async (context:GetStaticPropsContext):Promise<{ props:{ months: MonthMatches[] } }> =>{
  const data = await getData();

  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);

  const sortedData = data
    .filter(m => m.start >= today)
    .sort((a, b) => a.start.getTime() - b.start.getTime());

  const matches = groupIntoMonths(sortedData);

  return {
    props: {
      months: matches
    }
  };

}) satisfies GetStaticProps<{
  months:MonthMatches[]
}>
