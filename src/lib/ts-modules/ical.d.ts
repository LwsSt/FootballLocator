declare module 'ical' {
    declare function parseICS(input:string):Record<string, ICalData>;

    declare interface ICalData {
        uid:        string;
        summary:    string;
        location:   string;
        start:      Date;
        end:        Date;
    }
}