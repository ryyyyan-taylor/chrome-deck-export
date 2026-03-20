/**
 * Parser registry — each site parser registers itself here.
 *
 * A parser must provide:
 *   name     - human-readable site name
 *   match()  - returns true if the current page has a decklist to parse
 *   parse()  - returns { main: ["4 Card Name", ...], sideboard: ["2 Card Name", ...] }
 */
const DeckParsers = (() => {
  const parsers = [];

  return {
    register(parser) {
      parsers.push(parser);
    },

    /** Returns the first parser whose match() returns true, or null. */
    detect() {
      return parsers.find((p) => p.match()) || null;
    },
  };
})();
