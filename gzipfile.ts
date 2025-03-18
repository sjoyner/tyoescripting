import * as fs from "fs";
import * as zlib from "zlib";
import { pipeline } from "node:stream/promises";

async function readFile(fileSrc: string) {
  console.log("reading the file:", fileSrc);
  await pipeline(
    fs.createReadStream(fileSrc),
    zlib.createGzip(),
    fs.createWriteStream(`${fileSrc}.gz`),
  );
  console.log("done");
}

await readFile(process.argv[2]);
