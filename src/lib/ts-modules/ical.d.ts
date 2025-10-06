declare module 'ical' {
    declare function parseICS(input:string):Record<string, ICalData>;

    declare interface ICalData {
        summary:    string;
        location:   string;
        start:      Date;
        end:        Date;
    }
}