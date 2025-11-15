type Uid = string;

export class Day {
  /**
   *
   */
  constructor(
    public year:number,
    public month:number,
    public day:number) {
  }

  toDisplayString():string {
    const date = new Date(this.year, this.month - 1, this.day);
    return Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(date);
  }

  compare(other:Day):number {
    const thisDate = this.toDate(this);
    const otherDate = this.toDate(other);

    return thisDate.getTime() - otherDate.getTime();
  }

  after(target:Date): boolean {
    const date = this.toDate(this);
    return date >= target;
  }

  toDate(day:Day):Date {
    return new Date(day.year, day.month - 1, day.day);
  }
}

export class Time {
  constructor(
  public hour: number,
  public minute: number){
  }

  toDisplayString():string {
    return `${this.hour}:${this.minute.toString().padStart(2, '0')}`;
  }
}

export interface Location {
  name: string,
  coords: [number, number],
  dataLink: string
}

export interface RawMatchData {
  uid: Uid,
  teams: [string, string],
  location: string,
  startDate: Date,
  endDate: Date
}

export interface MatchData {
  uid: Uid,
  teams: [string, string],
  location: Location,
  day: Day,
  startTime: Time,
  endTime: Time
}

export interface TeamData {
  name:string,
  matches: Uid[]
}
