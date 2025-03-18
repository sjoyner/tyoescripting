import { createHash } from "node:crypto";
import { createReadStream, existsSync } from "node:fs";



function sha256(fileSrc) {
    if(!existsSync(fileSrc)) throw "File not found"
    const hash = createHash("sha256")
    const input = createReadStream(fileSrc);
    input.on('readable', () => {
    
    const data = input.read();
    if (data)
        hash.update(data);
    else {
        console.log(`${hash.digest('hex')} ${fileSrc}`);
        //console.log(`${hash.digest('base64')} ${fileSrc}`);
    }
    });
}

sha256(process.argv[2])