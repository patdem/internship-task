"use strict";

async function findNearestUser() {
    const users = await getData('https://jsonplaceholder.typicode.com/users');

    const nearestNeighboursPair = getNearestNeighboursPairs(users);

    const displayResult = nearestNeighboursPair.map(prettyPrintNeighbour).join("<br>");

    document.getElementById("nearestNeighbours").innerHTML = displayResult;
}

function getNearestNeighboursPairs(users){
    let result = [];

    for (const user of users) {
        let minDistance = Infinity;
        let nearestNeigbour;

        for (const neighbour of users) {
            if (user.id != neighbour.id) {
                let currentDistance = getGeoDistance(user.address.geo, neighbour.address.geo);
                if (currentDistance < minDistance){
                    minDistance = currentDistance;
                    nearestNeigbour = neighbour.name;
                }
            }
        }

        const neighboursPair = {
            neighbours: [user.name, nearestNeigbour],
            distance: minDistance,
        };

        result.push(neighboursPair);
    }

    return result;
}

function getGeoDistance(geo1, geo2) {
    // haversine formula
    const R = 6371e3;
    const lat1 = geo1.lat * Math.PI/180;
    const lat2 = geo2.lat * Math.PI/180;
    const dLng = (geo2.lng - geo1.lng) * Math.PI/180;
    const dLat = lat2 - lat1;

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1)   * Math.cos(lat2)   *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c / 1000; // km
    
    return d;
}

function prettyPrintNeighbour(neighboursPair) {
    return `The nearest neighbour of <b>${neighboursPair.neighbours[0]}</b> 
    is <b>${neighboursPair.neighbours[1]}</b>
    (distance: ${neighboursPair.distance.toFixed(2)} km).`;
}

async function getData(url) {
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.error(error);
    }
}