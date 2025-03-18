import { createWriteStream } from "node:fs";
import * as crypto from 'node:crypto';

const CHARS = '0123456789abcdefghijklmnopqrstuvwxyz';
    

function generateToken(maxLen: number): string {
    let sz = crypto.randomInt(0, maxLen)
    let ch: string[] = []
    for(let x = 0; x < sz; x++) {
        ch.push(CHARS.charAt(crypto.randomInt(0,CHARS.length)))
    }
    return ch.join("");
}

function createTokenFile(fileDest: string, tkCount: number, maxLen: number) {
    const out = createWriteStream(fileDest)
    const tokens: string[] = []
    for(let i = 0; i < tkCount; i++) {
        tokens.push(generateToken(maxLen))
    }
    out.write(tokens.join(","))
    out.close()
}

createTokenFile(process.argv[2], parseInt(process.argv[3]), parseInt(process.argv[4]))