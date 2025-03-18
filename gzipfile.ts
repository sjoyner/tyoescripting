import * as fs from 'fs';
import * as zlib from 'zlib';
import { pipeline } from 'node:stream'

function readFile(fileSrc: string) {
    console.log("reading the file: " + fileSrc)
    let outfile = fs.createWriteStream(`${fileSrc}.gz`)
    if(fs.existsSync(fileSrc)) {
        pipeline(fs.createReadStream(fileSrc), zlib.createGzip(), outfile, (err) => {
            if(err) {
                console.log("faile to write file: " + err)
            } else {
                console.log("wrote compressed file")
            }
        })
    } else {
         console.log("File not found: " + fileSrc)
    }
}

readFile(process.argv[2])