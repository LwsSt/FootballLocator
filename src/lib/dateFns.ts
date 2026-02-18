const timeFormatter = Intl.DateTimeFormat('en-GB', { timeStyle: 'short' });
const monthAndYearFormatter = Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric' });
const dayAndMonthFormatter = Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' });
const dayNameFormatter = Intl.DateTimeFormat('en-GB', { weekday: 'long' });

export function toTime(date: Date): string {
    return timeFormatter.format(date);
}

export function toMonthAndYear(date: Date): string {
    return monthAndYearFormatter.format(date);
}

export function toDayAndMonth(date: Date): string {
    return dayAndMonthFormatter.format(date);
}

export function toDayName(date:Date): string {
    return dayNameFormatter.format(date);
}
