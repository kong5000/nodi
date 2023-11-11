import { collection, endAt, getDocs, orderBy, query, startAt, where } from 'firebase/firestore';

import * as geofire from 'geofire-common';
import { database } from '../firebase';

export const getGeoHash = (location) => {
    try {
        // Compute the GeoHash for a lat/lng point
        const { latitude, longitude } = location.coords

        const hash = geofire.geohashForLocation([latitude, longitude]);
        return hash
    } catch (err) {
        console.log(err)
    }
}

export const radiusQuery = async (lastLocation) => {
    // Find cities within 50km of London
    const { latitude, longitude } = lastLocation.coords
    const center = [latitude, longitude];
    const radiusInM = 90 * 100000;

    // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
    // a separate query for each pair. There can be up to 9 pairs of bounds
    // depending on overlap, but in most cases there are 4.
    const bounds = geofire.geohashQueryBounds(center, radiusInM);
    const promises = [];
    for (const b of bounds) {
        const q = query(
            collection(database, 'users'),
            where('active', '==', true),
            orderBy('geohash'),
            startAt(b[0]),
            endAt(b[1]));
        promises.push(getDocs(q));
    }

    // Collect all the query results together into a single list
    const snapshots = await Promise.all(promises);

    const matchingDocs = [];
    for (const snap of snapshots) {
        for (const doc of snap.docs) {
            const lastLocation = doc.get('lastLocation')
            if (lastLocation) {
                const lat = lastLocation.coords.latitude
                const lng = lastLocation.coords.longitude
                // We have to filter out a few false positives due to GeoHash
                // accuracy, but most will match
                const distanceInKm = geofire.distanceBetween([lat, lng], center);
                const distanceInM = String(distanceInKm * 1000);
                if (distanceInM <= radiusInM) {
                    matchingDocs.push({ ...doc.data(), distanceInKm });
                }
            }
        }
    }
    return matchingDocs
}