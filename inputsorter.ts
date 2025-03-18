import { createReadStream } from "node:fs";
import * as readline from "node:readline";
import { pipeline } from "node:stream/promises";

//let userin = readline.createInterface({ input: process.stdin });


async function* commaSplitter(source: any) {
  
  for await(const chunk of source) {
    let chunkStr = chunk.toString()
    
    let parts = chunkStr.split(",")
    for(const part of parts.slice(0,-1)) {
      yield part
      yield tokenSentinel  
    }
    
    yield parts.at(-1)
  }
  yield tokenSentinel
}

async function* tokenSorter(source: any) {
  let charCount = {}
  for await(const tk of source) {
    if(tk === tokenSentinel) {
       yield charCount
       charCount = {}
       continue
    }
    charCount = tk.split('').reduce((a,b) => { 
      a[b] ??= 0 
      a[b]++
      return a
    }, charCount)
  }
}

const tokenSentinel = Symbol("token")

async function* tokenLogger(source: any) {
  for await(const str of source) {
    console.log(str)
  }
}

pipeline(process.stdin, commaSplitter, tokenSorter, tokenLogger)
