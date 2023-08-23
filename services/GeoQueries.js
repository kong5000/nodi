import { doc, updateDoc, addDoc, collection, query, orderBy, startAt, endAt, getDocs } from 'firebase/firestore';

import { database } from '../firebase'
import * as geofire from 'geofire-common'



// Add the hash and the lat/lng to the document. We will use the hash
// for queries and the lat/lng for distance comparisons.
export const addGeoHash = async (data, userIds) => {
    console.log("GEO HASH")
    try {
        // Compute the GeoHash for a lat/lng point
        const lat = 37.71766417911356;
        const lng = -122.40123808477317;
        const hash = geofire.geohashForLocation([lat, lng]);
        console.log(hash)
        const locData = {
            location: 'San Francisco CA',
            geohash: hash,
            lat: lat,
            lng: lng
        }
        const locationRef = collection(database, "locations");
        await addDoc(locationRef, locData);



    } catch (err) {
        console.log(err)
    }

}


export const radiusQuery = async () => {
    // Find cities within 50km of London
    const center = [49.28077203059793, -123.12187952416022];
    const radiusInM = 90 * 1000;

    // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
    // a separate query for each pair. There can be up to 9 pairs of bounds
    // depending on overlap, but in most cases there are 4.
    const bounds = geofire.geohashQueryBounds(center, radiusInM);
    const promises = [];
    for (const b of bounds) {
        const q = query(
            collection(database, 'locations'),
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
            const lat = doc.get('lat');
            const lng = doc.get('lng');
            console.log(doc.data())
            // We have to filter out a few false positives due to GeoHash
            // accuracy, but most will match
            const distanceInKm = geofire.distanceBetween([lat, lng], center);
            const distanceInM = distanceInKm * 1000;
            if (distanceInM <= radiusInM) {
                matchingDocs.push({...doc.data(), distanceInKm});
            }
        }
    }
    console.log(matchingDocs)
}