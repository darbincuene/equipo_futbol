import { cpSync } from "fs";
import { existsSync, mkdirSync } from "fs";

const src = "public";
const dest = "dist/public";

if (!existsSync("dist")) {
  mkdirSync("dist");
}

cpSync(src, dest, { recursive: true });
console.log("Carpeta public copiada correctamente.");
