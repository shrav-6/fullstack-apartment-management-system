export function sortNoticesByDate(notice1, notice2) {
    return notice1.date <= notice2.date ? -1 : 1;
}

export function sortNoticesByImportance(notice1, notice2) {
    return notice1.importance <= notice2.importance ? -1 : 1;
}

export function sortNotices(allNotices, parameter) {
    alert("SorTING");
    if (parameter === "Date") {
        allNotices.sort(sortNoticesByDate);
    } else if (parameter === "Importance") {
        allNotices.sort(sortNoticesByImportance);
    }
    return allNotices;
}

export function filterNoticesByDate(notice, startDate, endDate) {
    return notice.date > startDate ? (notice.date < endDate ? notice : undefined) : undefined;
}

export function filterNoticesByImportance(notice, minValue, maxValue) {
    return notice.importance > minValue ? (notice.importance < maxValue ? notice : undefined) : undefined;
}

export function filterNotices(allNotices, parameter, minValue, maxValue) {
    let filteredNotices = [];
    for (let i = 0; i < allNotices.length; i++) {
        if (parameter === "Date" && allNotices[i].date !== undefined) {
            filteredNotices.push(filterNoticesByDate(allNotices[i], minValue, maxValue));
        } else if (parameter === "Importance" && allNotices[i].importance !== undefined) {
            filteredNotices.push(filterNoticesByImportance(allNotices[i], minValue, maxValue));
        } else if (parameter === "Date" && allNotices[i].date !== undefined) {
            console.error("Notice Date Not Defined");
        } else if (parameter === "Importance" && allNotices[i].importance !== undefined) {
            console.error("Notice Priority Not Defined");
        }
    }
    return filteredNotices;
}