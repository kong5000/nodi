import { getTripMatches, getUserTrips } from './TripCollectionQueries'
import { getPasses, getLikedBy, getUserLikes } from './UserQueries'
import { getConversations } from './ConversationQueries'
import { some } from 'lodash'

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
    await Promise.all(potentialCards.map(async (potentialCard) => {
        console.log(potentialCard)
        console.log(`Getting details for ${potentialCard.userInfo.name}`)
        let missedYouIn = []
        let seeYouIn = []
        let headedTo = []
        userTrips.forEach(trip => {
            let overLapDays = 0
            if (trip.city == potentialCard.city) {
                if (trip.dayFrom <= potentialCard.dayTo && trip.dayTo >= potentialCard.dayFrom) {
                    potentialCard.dates.forEach(date => {
                        if(trip.dates.includes(date)){
                            console.log("included date", date, trip.city, potentialCard.city)
                            overLapDays += 1
                        }
                    })
                    seeYouIn.push(potentialCard.city)
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
    }));
    return detailedCards
}
export const getCards = async (uid) => {
    let userTrips = await getUserTrips(uid)
    if (userTrips.length == 0) return
    let passes = await getPassedUsers(uid)
    let likes = await getUserLikes(uid)
    let likedUserIds = likes.map((likeObject) => likeObject.id)
    let skippedUsers = [...likedUserIds, ...passes]
    let tempMatches = []
    for (trip of userTrips) {
        let documents = await getTripMatches(trip)
        documents = filterDocuments(documents, skippedUsers, uid)
        potentialCards = await addUserDetails(documents, userTrips)
        tempMatches.push(potentialCards)
    }
    let potentialMatches = []
    for (let temp of tempMatches) {
        potentialMatches = [...potentialMatches, ...temp]
    }

    // potentialMatches = potentialMatches.map(match => {
    //     let daysMatched = 0
    //     userTrips.forEach(userTrip => {
    //         if (userTrip.city == match.city) {
    //             match.dates.forEach(date => {
    //                 if (userTrips.dates.includes(date)) {
    //                     daysMatched += 1
    //                 }
    //             })
    //             return { ...match, daysMatched }
    //         }
    //     })
    // })
    console.log("POTENTIAL MATCHES")
    console.log(potentialMatches)
    console.log("USER TRIPS", userTrips)

    return potentialMatches
}