/**
 * Content script — listens for messages from the popup and responds
 * with parsed decklist data.
 */
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.action !== "parseDeck") return;

  const parser = DeckParsers.detect();
  if (!parser) {
    sendResponse({ ok: false, error: "No decklist found on this page." });
    return;
  }

  const deck = parser.parse();
  if (deck.main.length === 0 && deck.commander.length === 0) {
    sendResponse({ ok: false, error: "Decklist appears empty." });
    return;
  }

  sendResponse({
    ok: true,
    commander: deck.commander,
    main: deck.main,
    sideboard: deck.sideboard,
    source: parser.name,
  });
});
