type Uid = string;

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

export interface TeamData {
  name:string,
  matches: Uid[]
}
