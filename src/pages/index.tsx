import { Fragment } from 'react';
import { getData } from '../lib/matches';
import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from "next";

interface MatchDisplayData {
  uid:string,
  teams: [string, string],
  location: string,
  day: string,
  start: string,
  end: string
}

function Match(props:{ match:MatchDisplayData}) {
  const { match: m } = props;

  return (
    <div>
      <h2>{m.teams[0]} vs {m.teams[1]}</h2>
      <p>{m.day}</p>
      <span>{m.start} - {m.end}</span>
    </div>
  );
}

export default function Home({
  matches
}:InferGetStaticPropsType<typeof getStaticProps>) {

  const data = Object.entries(matches);

  return (
    <div>
      {data.map(([date, matches]) => (
        <Fragment key={date}>
          <h1 style={{color: 'red' }}>{date}</h1>
          {matches?.map(m => (
            <Match key={m.uid} match={m} />
          ))}
          <hr />
        </Fragment>
      ))}
    </div>
  )
}

export const  getStaticProps = (async (context:GetStaticPropsContext):Promise<{ props:{ matches: Partial<Record<string, MatchDisplayData[]>> } }> =>{
  const data = await getData();

  const today = new Date();

  const displayData = data
    .filter(m => m.day.after(today))
    .map(m => {
    return {
      uid: m.uid,
      teams: m.teams,
      location: m.location.name,
      day: m.day.toDisplayString(),
      start: m.startTime.toDisplayString(),
      end: m.endTime.toDisplayString()
    }
  });

  const groupData = Object.groupBy(displayData, k => k.day);

  return {
    props: {
      matches: groupData
    }
  };
}) satisfies GetStaticProps<{
  matches:Partial<Record<string, MatchDisplayData[]>>
}>
