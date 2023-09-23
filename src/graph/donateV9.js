import {fetchQueryBase} from "./index";
const name = "patton-sr/arbog"
export function getDonateRecord() {
    return fetchQueryBase(name, {
        text: `{
           allRecords(first:1000 orderBy:no orderDirection:desc){
              no
              addr
              ethAmount
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
         allInvites(first: 1000){
                recommender1
                recommender2
                recommender3
                recommender4
                recommender5
                rate1
                rate2
                rate3
                rate4
                rate5
                addr
                blockTimestamp
            }
        }`
    }, "")
}

export function getBlackUsers() {
    return fetchQueryBase(name, {
        text: ` {
            blackUsers(first:1000){
                operator
                user
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
                ethAmount
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
            ethAmount
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
            allRegisters(first:1000,where: {recommenders_contains: "${address}"}) {
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