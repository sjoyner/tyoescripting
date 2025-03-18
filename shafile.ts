import { createHash } from "node:crypto";
import { createReadStream, existsSync } from "node:fs";
import { pipeline } from "node:stream/promises";

function sha256(fileSrc) {
  return new Promise((resolve, reject) => {
    const hash = createHash("sha256");
    const input = createReadStream(fileSrc);
    input.on("data", (data) => {
      hash.update(data);
    });
    input.on("error", reject);
    input.on("end", () => {
      resolve(hash.digest("hex"));
    });
  });
}

async function sha256Pipeline(fileSrc) {
  const hash = createHash("sha256");
  const input = createReadStream(fileSrc);
  await pipeline(input, hash);
  return hash.digest("hex");
}
try {
  console.log("first", await sha256(process.argv[2]));
} catch (err) {
  console.log("first", err);
}
try {
  console.log("second", await sha256Pipeline(process.argv[2]));
} catch (err) {
  console.log(err);
}
