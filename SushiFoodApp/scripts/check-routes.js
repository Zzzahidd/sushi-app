const fs = require("fs");
const path = require("path");

const appDir = path.join(__dirname, "../app");
let errors = 0;

function scan(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      scan(full);
    } else if (e.name.endsWith(".tsx") || e.name.endsWith(".ts")) {
      const content = fs.readFileSync(full, "utf8");
      const hasDefault = content.includes("export default");
      const size = fs.statSync(full).size;
      if (!hasDefault || size === 0) {
        console.log("🚨 PROBLEM IN FILE:", path.relative(appDir, full));
        errors++;
      } else {
        console.log("✅ OK:", path.relative(appDir, full), `${size} bytes`);
      }
    }
  }
}

scan(appDir);
console.log(`\nScan complete: Total route errors: ${errors}`);
