
import * as readline from "node:readline";


let userin = readline.createInterface({input: process.stdin})

userin.on("line", (line) => {
    let parts = line.split(",")
    for(let part of parts) {
    
        let chars: string[] = [];
        [...part].forEach(c => chars.push(c))
        console.log(chars.sort().join(""))
    
    }
    
})

userin.on('close', () => {
    
})

