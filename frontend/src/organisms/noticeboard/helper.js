export function sortNoticesByDate(notice1, notice2) {
    console.log("New call");
    return notice1.updatedAt <= notice2.updatedAt ? -1 : 1;
}

export function sortNoticesByTitle(notice1, notice2) {
    return notice1.title <= notice2.title ? -1 : 1;
}

export function sortNoticesByPriority(notice1, notice2) {
    let n1 = 0;
    let n2 = 0;
    if (notice1.priority === "HIGH") {
        n1 = 1;
    } else if (notice1.priority === "MEDIUM") {
        if (notice2.priority !== "HIGH") {
            n1 = 1;
        } else {
            n2 = 1;
        }
    } else {
        n2 = 1;
    }
    return n1 <= n2 ? -1 : 1;
}

export function sortNotices(allNotices, parameter) {
    if (parameter === "date") {
        allNotices.sort(sortNoticesByDate);
    } else if (parameter === "title") {
        allNotices.sort(sortNoticesByTitle);
    } else if (parameter === "priority") {
        allNotices.sort(sortNoticesByPriority);
    }
    console.log("Notices");
    console.log(allNotices);
    return allNotices;
}

export function filterNoticesSince1Day(notice) {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - parseInt(1));
    currentDate = currentDate.toISOString();
    return notice.updatedAt >= currentDate ? notice : undefined;
}

export function filterNoticesSince1Week(notice) {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - parseInt(7));
    currentDate = currentDate.toISOString();
    return notice.updatedAt >= currentDate ? notice : undefined;
}

export function filterNoticesSince1Month(notice) {
    let currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - parseInt(1));
    currentDate = currentDate.toISOString();
    console.log(currentDate);
    return notice.updatedAt >= currentDate ? notice : undefined;
}

export function filterNoticesSince1Year(notice) {
    let currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - parseInt(12));
    currentDate = currentDate.toISOString();
    console.log(currentDate);
    return notice.updatedAt >= currentDate ? notice : undefined;
}

export function filterNoticesForLowPriority(notice, lowThreshold) {
    return notice.priority === lowThreshold ? notice : undefined;
}

export function filterNoticesForNormalPriority(notice, normalThreshold) {
    return notice.priority === normalThreshold ? notice : undefined;
}

export function filterNoticesForHighPriority(notice, highThreshold) {
    return notice.priority === highThreshold ? notice : undefined;
}

export function filterNotices(allNotices, parameter) {
    console.log("filtering!");
    let filteredNotices = [];
    for (let i = 0; i < allNotices.length; i++) {
        if (parameter === "last1Day" && allNotices[i].updatedAt !== undefined) {
            filteredNotices.push(filterNoticesSince1Day(allNotices[i]));
        } else if (parameter === "last1Week" && allNotices[i].updatedAt !== undefined) {
            filteredNotices.push(filterNoticesSince1Week(allNotices[i]));
        } else if (parameter === "last1Month" && allNotices[i].updatedAt !== undefined) {
            filteredNotices.push(filterNoticesSince1Month(allNotices[i]));
        } else if (parameter === "last1Year" && allNotices[i].updatedAt !== undefined) {
            filteredNotices.push(filterNoticesSince1Year(allNotices[i]));
        } else if (parameter === "lowPriority" && allNotices[i].priority !== undefined) {
            filteredNotices.push(filterNoticesForLowPriority(allNotices[i], "LOW"));
        } else if (parameter === "normalPriority" && allNotices[i].priority !== undefined) {
            filteredNotices.push(filterNoticesForNormalPriority(allNotices[i], "MEDIUM"));
        } else if (parameter === "highPriority" && allNotices[i].priority !== undefined) {
            filteredNotices.push(filterNoticesForHighPriority(allNotices[i], "HIGH"));
        } else if ((parameter === "last1Day" || parameter === "last1Week" || parameter === "last1Month" ||
            parameter === "last1Year") && allNotices[i].updatedAt === undefined) {
            console.error("Notice Date Not Defined");
        } else if ((parameter === "lowPriority" || parameter === "normalPriority" || parameter === "highPriority")
            && allNotices[i].priority !== undefined) {
            console.error("Notice Priority Not Defined");
        }
    }
    filteredNotices = filteredNotices.filter(function( element ) {
        return element !== undefined;
    });
    console.log("All notices");
    console.log(filteredNotices);
    return filteredNotices;
}
