import ordinal from "ordinal";
import {days, months} from "date-names";

export function formatDate(date, format) {
    return format.replace(/YYYY|M(MMM)?|Do?|dddd/g, tag => {
        if (tag === "YYYY") return date.getFullYear();
        if (tag === "M") return date.getMonth();
        if (tag === "MMMM") return months[date.getMonth()];
        if (tag === "D") return date.getDate();
        if (tag === "Do") return ordinal(date.getDate());
        if (tag === "dddd") return days[date.getDay()];
    });
}
