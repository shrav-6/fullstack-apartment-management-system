export function sortNoticesByDate(notice1, notice2) {
    console.log("New call");
    return notice1.createdAt <= notice2.createdAt ? -1 : 1;
}

export function sortNoticesByImportance(notice1, notice2) {
    return notice1.title <= notice2.title ? -1 : 1;
}

export function sortNotices(allNotices, parameter) {
    if (parameter === "date") {
        allNotices.sort(sortNoticesByDate);
    } else if (parameter === "importance") {
        allNotices.sort(sortNoticesByImportance);
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

export function filterNoticesForLowPriority(notice) {
    return notice.priority >= threshold ? notice : undefined;
}

export function filterNoticesForNormalPriority(notice) {
    return notice.priority >= threshold ? notice : undefined;
}

export function filterNoticesForHighPriority(notice) {
    return notice.priority >= threshold ? notice : undefined;
}

export function filterNoticesByImportance(notice, minValue, maxValue) {
    return notice.importance > minValue ? (notice.importance < maxValue ? notice : undefined) : undefined;
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
        } else if (parameter === "lowPriority" && allNotices[i].importance !== undefined) {
            filteredNotices.push(filterNoticesForLowPriority(allNotices[i]));
        } else if (parameter === "normalPriority" && allNotices[i].importance !== undefined) {
            filteredNotices.push(filterNoticesForNormalPriority(allNotices[i]));
        } else if (parameter === "highPriority" && allNotices[i].importance !== undefined) {
            filteredNotices.push(filterNoticesForHighPriority(allNotices[i]));
        } else if ((parameter === "last1Day" || parameter === "last1Week" || parameter === "last1Month" ||
            parameter === "last1Year") && allNotices[i].createdAt === undefined) {
            console.error("Notice Date Not Defined");
        } else if ((parameter === "lowPriority" || parameter === "normalPriority" || parameter === "highPriority")
            && allNotices[i].importance !== undefined) {
            console.error("Notice Priority Not Defined");
        }
    }
    console.log("All notices");
    console.log(filteredNotices);
    return filteredNotices;
}