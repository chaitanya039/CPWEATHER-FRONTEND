export const getCurrentDate = () =>
{
    let currentTime = new Date();

    var months = 
    [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    let month = currentTime.getMonth();
    let date = currentTime.getDate();
    let year = currentTime.getFullYear();
    let fullDate = date + " | " + months[month] + " | " + year;

    return fullDate;
}

export const getCurrentDay = () =>
{
    let currentTime = new Date();

    const weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    let day = weekday[currentTime.getDay()];

    return day;
}

export const getCurrentTime = () => 
{

    const time = new Date();
    const hour = time.getHours();
    const HourIn12HrFormat = hour >= 13 ? hour % 12 : hour;
    const minute = time.getMinutes();
    const ampm = hour >= 12 ? "PM" : "AM";

    const timeString = `${HourIn12HrFormat < 10 ? '0' + HourIn12HrFormat : HourIn12HrFormat}:${minute < 10 ? '0' + minute : minute} ${ampm}`;

    return timeString;
}