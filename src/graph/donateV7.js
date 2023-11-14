import {fetchQueryBase} from "./index";

let name = "patton-sr/ogtest"
if (process.env.NODE_ENV === "development") {
    name = "patton-sr/ogtest1"
}

export function getDonateRecord() {
    return fetchQueryBase(name, {
        text: `{
           allRecords(first:1000 orderBy:no orderDirection:desc){
              no
              addr
              usdtAmount
              fdtAmount
              flmAmount
              blockTimestamp
             }
        }`
    }, "")
}

export function getAllInvites() {
    return fetchQueryBase(name, {
        text: `{
         allInviteAddrs(first: 1000){
                recommender1
                recommender2
                recommender3
                recommender4
                recommender5
                recommender6
                recommender0
                addr
                blockTimestamp
        }
        allInviteRates(first: 1000){
                rate1
                rate2
                rate3
                rate4
                rate5
                rate6
                rate0
                addr
                blockTimestamp
            }
        }
        `
    }, "")
}

export function getBlackUsers() {
    return fetchQueryBase(name, {
        text: ` {
            blackUsers(first:1000, orderBy: blockTimestamp,orderDirection: desc){
                operator
                user
                blockTimestamp
            }
            }`
    }, "")
}

export function getAllFlmRate() {
    return fetchQueryBase(name, {
        text: `{\t\t\t\t\t
         allFlmRates(first: 1000){
                flmRate1
                flmRate2
                flmRate3
                flmRate4
                flmRate0
                flmRate5
                flmRate6
                blockTimestamp
                  user
            }
  allTeamAddrs(first: 1000){
                admin0
    \t\t\t\t\t\tadmin1
    \t\t\t\t\t\tadmin2
    \t\t\t\t\t\tadmin3
    \t\t\t\t\t\tadmin4
    \t\t\t\t\t\tadmin5
    \t\t\t\t\t\tadmin6
                blockTimestamp
    \t\t\t\t\t\taddr
            }
            allFlmRateForAdmins(first: 1000){
                adminFlmRate1
                adminFlmRate2
                adminFlmRate3
                adminFlmRate4
                adminFlmRate0
                adminFlmRate5
                adminFlmRate6
                blockTimestamp
                user
            }
            allTeamRates(first: 1000){
                adminRate1
                adminRate2
                adminRate3
                adminRate4
                adminRate0
                adminRate5
                adminRate6
                addr
                blockTimestamp
            }
          
        }`
    }, "")
}


export function getSecondDonateRecord(addr) {
    return fetchQueryBase(name, {
        text: ` {
          allRecords(where: {addrTow: "${addr}"}, first: 1000) {
                id
                no
                addr
                usdtAmount
                fdtAmount
                time
          }
        }`
    }, "")
}

export function getThreeDonateRecord(addr) {
    return fetchQueryBase(name, {
        text: `{
          allRecords(where:{addrThree: "${addr}"}, first: 1000) {
            id
            no
            addr
            
            usdtAmount
            fdtAmount
            time
          }
        }`
    }, "")
}

export function getSeedDonateRecord() {
    return fetchQueryBase(name, {
        text: `{
              claims(first: 1000) {
                id
                _user
                _amount
              }
              donations(first: 1000) {
                id
                _user
                _spend
                _amounts
                _prices
              }
            }`
    }, "")
}

export function getAllRegisters(address) {
    return fetchQueryBase(name, {
        text: `{
            allRegisters(first:1000,where: {recommenders: "${address}"}) {
                Contract_id
                recommenders
                _user
            }
        }`
    }, "")
}

export function getRecommender(address) {
    return fetchQueryBase(name, {
        text: `{
            allRegisters(first:10,where: {_user_contains: "${address}"}) {
                Contract_id
                recommenders
                _user
            }
        }`
    }, "")
}

export function getAddressFromId(id) {
    return fetchQueryBase(name, {
        text: `{
            allRegisters(first:10,where: {Contract_id: "${id}"}) {
                Contract_id
                recommenders
                _user
            }
        }`
    }, "")
}