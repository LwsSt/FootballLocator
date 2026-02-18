import leagues from "../data/leagues.json" with { type: "json" };
import { MatchData } from "./types";
import { getICalData } from "./icalData";
import { getMatchData } from "./matchData";

const getMatches = async (data:{name:string, link:string}): Promise<MatchData[]> => {
  console.log(`Getting data from ${data.name}`);
  const icalData = await getICalData(data.link);
  return getMatchData(icalData);
}

const getData = async () :Promise<MatchData[]> => {
  const matches = leagues.map(l => getMatches(l))
  return (await Promise.all(matches)).flat();
}

const globalCache = globalThis as typeof globalThis & {
  matchData?: MatchData[]
};

if (!globalCache.matchData) {
  globalCache.matchData = await getData();
}

export const matchData = globalCache.matchData!;
