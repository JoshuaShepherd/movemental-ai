/**
 * One-off: Merge mDNA course (with weeks) into alan-hirsch.json contentLibrary.courses.
 * Run from directories/data: node merge_mdna_course.js
 */
const fs = require("fs");
const path = require("path");

const dataDir = __dirname;
const alanPath = path.join(dataDir, "alan-hirsch.json");
const mdnaPath = path.join(dataDir, "courses", "mdna.json");

const alan = JSON.parse(fs.readFileSync(alanPath, "utf8"));
const mdna = JSON.parse(fs.readFileSync(mdnaPath, "utf8"));

const existing = alan.contentLibrary.courses.filter((c) => c.slug !== "mdna");
alan.contentLibrary.courses = [mdna, ...existing];

fs.writeFileSync(alanPath, JSON.stringify(alan, null, 2) + "\n", "utf8");
console.log("Merged mDNA course into alan-hirsch.json (courses[0])");
console.log("Course has", mdna.weeks?.length ?? 0, "weeks");
