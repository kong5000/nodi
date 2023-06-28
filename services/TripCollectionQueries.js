import { collection, query, where, limit, getDocs, addDoc } from 'firebase/firestore'
import { database } from '../firebase'

// Todo note error when "Result had  disjunctions which is more than the maximum of 30"
//  [male, female, other, nonbinary] x [2023-01 ....] <= 30
export const getTripMatches = async (trip) => {
    const tripsRef = collection(database, 'trips')
    console.log(`Querying for your trip in ${trip.city}`)
    let q = query(tripsRef,
        where('city', '==', trip.city),
        where('dates', 'array-contains-any', trip.dates.slice(0, 7)),
        where('userInfo.gender', 'in', trip.userInfo.travelsWith),
        limit(15)
    );
    if (trip.dates.length > 30) {
        const dateSlice = trip.dates.slice(0, 7)
        q = query(tripsRef,
            where('city', '==', trip.city),
            where('dates', 'array-contains-any', dateSlice),
            where('userInfo.gender', 'in', trip.userInfo.travelsWith),
            limit(15)
        );
    }
    // Todo paginate this query for more dates if no one matches that week
    const querySnapshot = await getDocs(q)
    let documents = querySnapshot.docs.map((doc) => doc.data());
    return documents
}

export const getUserTrips = async (uid) => {
    const tripsRef = collection(database, 'trips')
    const q = query(tripsRef,
        where('userInfo.id', '==', uid),
        limit(15)
    );
    const querySnapshot = await getDocs(q)
    let documents = querySnapshot.docs.map((doc) => doc.data());
    return documents
}

export const addTripDoc = async (tripData) => {
    const tripsCollectionRef = collection(database, "trips");
    await addDoc(tripsCollectionRef, tripData);
}
