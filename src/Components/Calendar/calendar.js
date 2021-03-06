
const days_in_week = 7;
const daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

const Month = {
    January:0,
    February:1,
    March:2,
    April:3,
    May:4,
    June:5,
    July:6,
    August:7,
    September:8,
    October:9,
    November:10,
    December:11
};


export function  isLeapYear(year){
    return !((year % 4) || (!(year % 100) && (year % 400)));
}

export function getDaysInMonth(date){
    const month = date.getMonth();
    const year = date.getFullYear();
    const daysIn_Month = daysInMonth[month];
    if (isLeapYear(year) && month === Month.February ){
        return daysIn_Month + 1;
    } else {
        return daysIn_Month;
    }
}

export function areEqual(a, b){
    if(!a || !b) return false;
    return (
        a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
    );
}

export function getDayOfWeek(date){
    const dayOfWeek = date.getDay();

    if(dayOfWeek === 0) return 6;
    return dayOfWeek - 1;



}


export function getMonthData(year,month){
    const result = [];
    const date = new Date(year,month);
    const days_in_month = getDaysInMonth(date);
    const monthStartsOn = getDayOfWeek(date);
    let day = 1;

    for (let i = 0; i < (days_in_month + monthStartsOn) / days_in_week; i++){
        result[i] = [];

        for (let j = 0; j < days_in_week ; j++){
            if((i === 0 && j < monthStartsOn) || day > daysInMonth){
                result[i][j] = undefined;
            } else{
                result[i][j] = new Date(year, month, day++)
            }
        }
    }


    return result;
}