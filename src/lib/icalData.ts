import { ICalData } from "ical";
import * as ical from "ical";

export const getICalData = async (link:string) : Promise<ICalData[]> => {
    const resp = await fetch(link);
    const data = await resp.text();

    const icalData = ical.parseICS(data.replaceAll(/\r/g, ''));

    const entries = Object.entries(icalData)
      .map(([_, data]) => data);

    return entries;
}