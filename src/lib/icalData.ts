import ICAL from 'ical.js';

export const getICalData = async (link:string) : Promise<ICAL.Event[]> => {
    const resp = await fetch(link);
    var data = await resp.text();

    data = data.replaceAll(/\r/g, '')

    const jcalData = ICAL.parse(data);
    const comp = new ICAL.Component(jcalData);
    var components = comp.getAllSubcomponents('vevent');

    return components.map(c => {
      const evt = new ICAL.Event(c);
      return evt;
    });
}