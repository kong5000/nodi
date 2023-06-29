import { collection, query, where, limit, getDocs, addDoc } from 'firebase/firestore'
import { database } from '../firebase'
const TRIP_QUERY_LIMIT = TRIP_QUERY_LIMIT
const DATE_LIMIT = 7

// Todo note error when "Result had  disjunctions which is more than the maximum of 30"
//  [male, female, other, nonbinary] x [2023-01 ....] <= 30
// Todo Matching is limited to the first two weeks of the trip
export const getTripMatches = async (trip) => {
    const tripsRef = collection(database, 'trips')

    let q = query(tripsRef,
        where('city', '==', trip.city),
        where('dates', 'array-contains-any', trip.dates.slice(0, DATE_LIMIT)),
        where('userInfo.gender', 'in', trip.userInfo.travelsWith),
        limit(TRIP_QUERY_LIMIT)
    );
    // Search first week of trip (limit is due to the two arrays in the query)
    const querySnapshot = await getDocs(q)
    let datesCounter = DATE_LIMIT
    let documents = querySnapshot.docs.map((doc) => doc.data());
    // Search second week of trip
    if (documents.length < 10 && datesCounter < trip.dates.length) {
        console.log("Performing extended search")
        let q = query(tripsRef,
            where('city', '==', trip.city),
            where('dates', 'array-contains-any', trip.dates.slice(datesCounter, datesCounter + DATE_LIMIT)),
            where('userInfo.gender', 'in', trip.userInfo.travelsWith),
            limit(TRIP_QUERY_LIMIT)
        )
        const querySnapshot = await getDocs(q)
        let newDocuments = querySnapshot.docs.map((doc) => doc.data());
        documents = [...documents, ...newDocuments]
    }
    return documents
}

export const getUserTrips = async (uid) => {
    const tripsRef = collection(database, 'trips')
    const q = query(tripsRef,
        where('userInfo.id', '==', uid),
        limit(TRIP_QUERY_LIMIT)
    );
    const querySnapshot = await getDocs(q)
    let documents = querySnapshot.docs.map((doc) => doc.data());
    return documents
}

export const addTripDoc = async (tripData) => {
    const tripsCollectionRef = collection(database, "trips");
    await addDoc(tripsCollectionRef, tripData);
}
