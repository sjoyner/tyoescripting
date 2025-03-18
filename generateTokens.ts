import { createWriteStream } from "node:fs";
import * as crypto from "node:crypto";
import { pipeline } from "node:stream/promises";

const CHARS = "0123456789abcdefghijklmnopqrstuvwxyz";

function* generateToken(maxLen: number) {
  let sz = crypto.randomInt(0, maxLen);
  for (let x = 0; x < sz; x++) {
    yield CHARS.charAt(crypto.randomInt(0, CHARS.length));
  }
}


function* generateTokens(tkCount: number, maxLen: number) {
  for (let i = 0; i < tkCount; i++) {
    if(i !== 0) yield ",";
    yield* generateToken(maxLen);
  }

}

async function createTokenFile(fileDest: string, tkCount: number, maxLen: number) {
  const out = createWriteStream(fileDest);
  await pipeline(generateTokens(tkCount, maxLen),out)
}
let tkNum = parseInt(process.argv[3])
let maxLen = parseInt(process.argv[4])

// await Promise.all([createTokenFile(
//   "1-"+process.argv[2],
//   tkNum,
//   maxLen
// ),
// createTokenFile(
//   "2-"+process.argv[2],
//   tkNum,
//   maxLen
// )]);

createTokenFile(
  process.argv[2],
  tkNum,
  maxLen
)