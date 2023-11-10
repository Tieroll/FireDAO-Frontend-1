import {fetchQueryBase} from "./index";

// test05 new

let small = "patton-sr/smallnode1"
let big = "patton-sr/bignode1"
let sup = "patton-sr/supnode1"


if (true) {
    small = "patton-sr/bignode"
}

export function getSmallNftMintRecord() {
    return fetchQueryBase(small, {
        text: `{
  records(first:1000,orderBy: blockTimestamp,orderDirection: desc){
  Contract_id
  addr
  blockTimestamp
}
}`
    }, "")
}

export function getBigNftMintRecord() {
    return fetchQueryBase(big, {
        text: `{
  records(first:1000,orderBy: blockTimestamp,orderDirection: desc){
  Contract_id
  addr
  blockTimestamp
}
}`
    }, "")
}

export function getSupNftMintRecord() {
    return fetchQueryBase(sup, {
        text: `{
  records(first:1000,orderBy: blockTimestamp,orderDirection: desc){
  Contract_id
  addr
  blockTimestamp
}
}`
    }, "")
}