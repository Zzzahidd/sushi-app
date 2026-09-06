const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name === ".expo") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(full);
    } else if (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")) {
      const code = fs.readFileSync(full, "utf8");
      const regex = /require\((["'])([^"']+)\1\)/g;
      let m;
      while ((m = regex.exec(code)) !== null) {
        const target = m[2];
        if (target.startsWith(".")) {
          const resolved = path.resolve(dir, target);
          const ex =
            fs.existsSync(resolved) ||
            fs.existsSync(resolved + ".png") ||
            fs.existsSync(resolved + ".jpg") ||
            fs.existsSync(resolved + ".ts") ||
            fs.existsSync(resolved + ".tsx");
          if (!ex) {
            console.log("❌ MISSING:", path.relative(root, full), "->", target, "=>", resolved);
          } else {
            console.log("✅ OK:", path.relative(root, full), "->", target);
          }
        }
      }
    }
  }
}

scanDir(root);
