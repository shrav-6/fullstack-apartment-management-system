export function sortNoticesByDate(notice1, notice2) {
    console.log("New call");
    return notice1.createdAt <= notice2.createdAt ? -1 : 1;
}

export function sortNoticesByTitle(notice1, notice2) {
    return notice1.title <= notice2.title ? -1 : 1;
}

export function sortNoticesByPriority(notice1, notice2) {
    return notice1.priority <= notice2.priority ? -1 : 1;
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
    return notice.createdAt >= currentDate ? notice : undefined;
}

export function filterNoticesSince1Week(notice) {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - parseInt(7));
    currentDate = currentDate.toISOString();
    return notice.createdAt >= currentDate ? notice : undefined;
}

export function filterNoticesSince1Month(notice) {
    let currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - parseInt(1));
    currentDate = currentDate.toISOString();
    console.log(currentDate);
    return notice.createdAt >= currentDate ? notice : undefined;
}

export function filterNoticesSince1Year(notice) {
    let currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - parseInt(12));
    currentDate = currentDate.toISOString();
    console.log(currentDate);
    return notice.createdAt >= currentDate ? notice : undefined;
}

export function filterNoticesForLowPriority(notice, lowThreshold) {
    if (notice.priority >= lowThreshold) {
        return notice;
    }
}

export function filterNoticesForNormalPriority(notice, normalThreshold) {
    if (notice.priority >= normalThreshold) {
        return notice;
    }
}

export function filterNoticesForHighPriority(notice, highThreshold) {
    if (notice.priority >= highThreshold) {
        return notice;
    }
}

export function filterNotices(allNotices, parameter) {
    console.log("filtering!");
    let filteredNotices = [];
    for (let i = 0; i < allNotices.length; i++) {
        if (parameter === "last1Day" && allNotices[i].createdAt !== undefined) {
            filteredNotices.push(filterNoticesSince1Day(allNotices[i]));
        } else if (parameter === "last1Week" && allNotices[i].createdAt !== undefined) {
            filteredNotices.push(filterNoticesSince1Week(allNotices[i]));
        } else if (parameter === "last1Month" && allNotices[i].createdAt !== undefined) {
            filteredNotices.push(filterNoticesSince1Month(allNotices[i]));
        } else if (parameter === "last1Year" && allNotices[i].createdAt !== undefined) {
            filteredNotices.push(filterNoticesSince1Year(allNotices[i]));
        } else if (parameter === "lowPriority" && allNotices[i].priority !== undefined) {
            filteredNotices.push(filterNoticesForLowPriority(allNotices[i], 1));
        } else if (parameter === "normalPriority" && allNotices[i].priority !== undefined) {
            filteredNotices.push(filterNoticesForNormalPriority(allNotices[i], 3));
        } else if (parameter === "highPriority" && allNotices[i].priority !== undefined) {
            filteredNotices.push(filterNoticesForHighPriority(allNotices[i], 5));
        } else if ((parameter === "last1Day" || parameter === "last1Week" || parameter === "last1Month" ||
            parameter === "last1Year") && allNotices[i].createdAt === undefined) {
            console.error("Notice Date Not Defined");
        } else if ((parameter === "lowPriority" || parameter === "normalPriority" || parameter === "highPriority")
            && allNotices[i].priority !== undefined) {
            console.error("Notice Priority Not Defined");
        }
    }
    console.log("All notices");
    console.log(filteredNotices);
    return filteredNotices;
}
