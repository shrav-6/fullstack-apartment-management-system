export function sortListingsByDate(listing1, listing2) {
    return listing1.updatedAt <= listing2.updatedAt ? -1 : 1;
}

export function sortListingsByRentAsc(listing1, listing2) {
    return listing1.rent <= listing2.rent ? -1 : 1;
}

export function sortListingsByRentDesc(listing1, listing2) {
    return listing1.rent >= listing2.rent ? -1 : 1;
}

export function sortListings(allListings, parameter) {
    if (parameter === "date") {
        allListings.sort(sortListingsByDate);
    } else if (parameter === "rentAsc") {
        allListings.sort(sortListingsByRentAsc);
    } else if (parameter === "rentDesc") {
        allListings.sort(sortListingsByRentDesc);
    }
    return allListings;
}

export function filterListingsByBHK(listing, value) {
    return listing.unitAvailable === value ? listing : undefined;
}

export function filterListingsByRent(listing, thresholdValue) {
    return listing.rent <= thresholdValue ? listing : undefined;
}

export function filterListingsForReadyToMove(listing) {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - parseInt(0));
    currentDate = currentDate.toISOString();
    return listing.updatedAt <= currentDate ? listing : undefined;
}

export function filterListingsForNotYetReady(listing) {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - parseInt(0));
    currentDate = currentDate.toISOString();
    return listing.updatedAt >= currentDate ? listing : undefined;
}

export function filterListings(allListings, parameter) {
    let filteredListings = [];
    for (let i = 0; i < allListings.length; i++) {
        if (parameter === "1bhk" && allListings[i].unitAvailable !== undefined) {
            filteredListings.push(filterListingsByBHK(allListings[i], "1"));
        } else if (parameter === "2bhk" && allListings[i].unitAvailable !== undefined) {
            filteredListings.push(filterListingsByBHK(allListings[i], "2"));
        } else if (parameter === "3bhk" && allListings[i].unitAvailable !== undefined) {
            filteredListings.push(filterListingsByBHK(allListings[i], "3"));
        } else if (parameter === "4bhk" && allListings[i].unitAvailable !== undefined) {
            filteredListings.push(filterListingsByBHK(allListings[i], "4"));
        } else if (parameter === "1k" && allListings[i].rent !== undefined) {
            filteredListings.push(filterListingsByRent(allListings[i], "1000"));
        } else if (parameter === "2k" && allListings[i].rent !== undefined) {
            filteredListings.push(filterListingsByRent(allListings[i], "2000"));
        } else if (parameter === "5k" && allListings[i].rent !== undefined) {
            filteredListings.push(filterListingsByRent(allListings[i], "5000"));
        } else if (parameter === "10k" && allListings[i].rent !== undefined) {
            filteredListings.push(filterListingsByRent(allListings[i], "10000"));
        } else if (parameter === "readyToMove" && allListings[i].startsFrom !== undefined) {
            filteredListings.push(filterListingsForReadyToMove(allListings[i]));
        } else if (parameter === "notReadyYet" && allListings[i].startsFrom !== undefined) {
            filteredListings.push(filterListingsForNotYetReady(allListings[i]));
        }
    }
    filteredListings = filteredListings.filter(function( element ) {
        return element !== undefined;
    });
    return filteredListings;
}