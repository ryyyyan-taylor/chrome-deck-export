DeckParsers.register({
  name: "mtgtop8",

  match() {
    return (
      location.hostname.includes("mtgtop8.com") &&
      document.querySelector(".deck_line") !== null
    );
  },

  parse() {
    const commander = [];
    const main = [];
    const sideboard = [];

    // Track which section we're in by walking all relevant elements in order.
    // Section headers are <div class="O14"> with text like "COMMANDER",
    // "SIDEBOARD", "17 LANDS", etc. Commander cards use the "sb" id prefix
    // just like sideboard cards, so we can't rely on id alone.
    let currentSection = "main";

    // Grab all deck_line and section header elements in document order
    const els = document.querySelectorAll(".deck_line, .O14");

    els.forEach((el) => {
      // Section header
      if (el.classList.contains("O14")) {
        const text = el.textContent.trim().toUpperCase();
        if (text === "COMMANDER") {
          currentSection = "commander";
        } else if (text === "SIDEBOARD") {
          currentSection = "sideboard";
        } else {
          // Category headers like "17 LANDS" — stay in main unless
          // we were in commander, which means main starts now
          if (currentSection === "commander") {
            currentSection = "main";
          }
        }
        return;
      }

      // Card line
      const nameSpan = el.querySelector(".L14");
      if (!nameSpan) return;

      const cardName = nameSpan.textContent.trim();
      const qty = el.textContent.replace(nameSpan.textContent, "").trim();
      if (!qty || !cardName) return;

      const line = `${qty} ${cardName}`;

      if (currentSection === "commander") {
        commander.push(line);
      } else if (currentSection === "sideboard") {
        sideboard.push(line);
      } else {
        main.push(line);
      }
    });

    return { commander, main, sideboard };
  },
});
