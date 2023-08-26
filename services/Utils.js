import { radiusQuery } from './GeoQueries'
import { getTripMatches, getUserTrips } from './TripCollectionQueries'
import { getPasses, getUserLikes } from './UserQueries'


const getPassedUsers = async (uid) => {
    const passedUsers = await getPasses(uid)
    const getPassedUserIds = (passedUsers) => {
        return passedUsers.map(x => x.id)
    }
    return (getPassedUserIds(passedUsers))
}

const filterDocuments = (potentialCards, passes, uid) => {
    // todo filter based on user prefrences
    // Filter out the users own card if it shows up
    // Filter out users passed on
    let userRemoved = potentialCards.filter(potentialCard => potentialCard.userInfo.id != uid)
    userRemoved = userRemoved.filter(potentialCard => !passes.includes(potentialCard.userInfo.id))
    return userRemoved
}

const addUserDetails = async (potentialCards, userTrips) => {
    let detailedCards = []
    potentialCards.map(async (potentialCard) => {
        let missedYouIn = []
        let seeYouIn = []
        let headedTo = []
        userTrips.forEach(trip => {
            let overLapDays = 0
            if (trip.city == potentialCard.city) {
                if (trip.dayFrom <= potentialCard.dayTo && trip.dayTo >= potentialCard.dayFrom) {
                    let matchDays = []
                    potentialCard.dates.forEach(date => {
                        if (trip.dates.includes(date)) {
                            matchDays.push(date)
                            overLapDays += 1
                        }
                    })
                    seeYouIn.push({ city: potentialCard.city, matchDays })
                } else {
                    missedYouIn.push(potentialCard.city)
                }
                potentialCard.daysMatching = overLapDays
            } else {
                if (!headedTo.includes(potentialCard.city)) {
                    headedTo.push(potentialCard.city)
                }
            }
        })
        headedTo = headedTo.filter(city =>
            !missedYouIn.includes(city) && !seeYouIn.includes(city)
        )
        detailedCards.push({ ...potentialCard, seeYouIn, missedYouIn, headedTo })
    })
    return detailedCards
}
export const getCards = async (userData) => {
    const { geohash, lastLocation } = userData
    const matches = await radiusQuery(lastLocation)
    return matches
}
export const calculateAge = (dateOfBirth) => {
    var today = new Date();
    var birthDate = new Date(dateOfBirth);

    var age = today.getFullYear() - birthDate.getFullYear();
    var monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}