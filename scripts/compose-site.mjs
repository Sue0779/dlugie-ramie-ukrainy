import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const update = JSON.parse(fs.readFileSync(path.join(root, "content/latest-updates.json"), "utf8"));
let source = fs.readFileSync(path.join(root, "worker/index.js"), "utf8");
const embed = value => JSON.stringify(value).replaceAll("\\", "\\\\").replaceAll("\"", "\\\"");

source = source.replace(
  "Zweryfikowana baza · aktualizacja 19.08.2026",
  "Zweryfikowana baza · aktualizacja " + update.updated
);
source = source.replace(
  "ORSK · najdłuższy potwierdzony przestój</strong><span>Rafineria całkowicie zatrzymana; władze regionu ostrzegły, że naprawa kluczowej importowanej infrastruktury może potrwać do pół roku.",
  "OZON · 22–24 SIERPNIA</strong><span>Sześć zaatakowanych centrów w trzy doby; cztery potwierdzone uszkodzenia lub pożary. Machaczkała i Enem płonęły, a obiekty w Samarze i Orenburgu wstrzymały pracę."
);
source = source.replace(
  "const DATA=[",
  "const DATA=" + embed(update.objects) + ".concat(["
);
source = source.replace(
  "}];\\nconst SOURCES={",
  "}]);\\nconst SOURCES=" + embed(update.sources) + ";Object.assign(SOURCES,{"
);
source = source.replace(
  "};\\nconst CATS=",
  "});\\nconst CATS="
);

fs.writeFileSync(path.join(root, "dist/server/index.js"), source);
