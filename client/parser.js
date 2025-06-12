import puppeteer from "puppeteer";
import fs from "fs";

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const url = "https://eldenring.wiki.fextralife.com/Greatshields";

  await page.goto(url, { waitUntil: "domcontentloaded" });

  const links = await page.evaluate(() => {
    const results = [];
    const table = document.querySelector("table");

    if (!table) return results;

    const rows = table.querySelectorAll("tbody tr");
    rows.forEach((row) => {
      const anchor = row.querySelector("td a");
      if (anchor && anchor.href.includes("/")) {
        results.push(anchor.href);
      }
    });

    return results;
  });

  const output = `const greatshieldsLinks = ${JSON.stringify(links, null, 2)};\n\nexport default greatshieldsLinks;`;

  fs.writeFileSync("greatshieldsLinks.js", output, "utf-8");

  console.log(`✅ Parsed ${links.length} greatshield links.`);
  await browser.close();
})();
