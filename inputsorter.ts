
import * as readline from "node:readline";


let userin = readline.createInterface({input: process.stdin})
let output: string[] = []
userin.on("line", (line) => {
    let parts = line.split(",")
    parts.forEach(part => {
        let sorted: string[] = [];
        [...part].forEach(c => sorted.push(c))
        output.push(sorted.sort().join(""))
    })
})

userin.on('close', () => {
    console.log(output.join("\n"))
})

