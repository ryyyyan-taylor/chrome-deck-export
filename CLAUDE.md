# Deck Export — Chrome/Firefox Extension

## Overview

Browser extension that copies MTG decklists from various websites to your clipboard as plain text. Manually installed (not published to any store). Works in both Chrome and Firefox.

## Architecture

- **Manifest V3** extension with content scripts injected per-site
- **Parser registry pattern** (`parsers/registry.js`) — each site gets its own parser file that registers with `DeckParsers.register({ name, match(), parse() })`
- **Content script** (`content.js`) — listens for messages from the popup, delegates to the matching parser, returns structured data (`{ commander[], main[], sideboard[] }`)
- **Popup** (`popup.html` + `popup.js`) — UI with "Copy Decklist" button and toggles (Include Commander, Include Sideboard). Toggle state persists via `chrome.storage.local`
- `browser_specific_settings.gecko` in manifest enables Firefox compatibility; Chrome ignores it

## Adding a New Site Parser

1. Create `parsers/newsite.js`
2. Call `DeckParsers.register({ name, match(), parse() })` — `parse()` must return `{ commander: [], main: [], sideboard: [] }`
3. Add the file to `manifest.json` under `content_scripts` with the appropriate URL match pattern

## Output Format

No section headers. Sections separated by blank lines:
```
1 Commander Name

4 Card Name
4 Card Name

2 Sideboard Card
```

## Key Details

- mtgtop8 parser uses DOM order walking of `.deck_line` and `.O14` section headers to distinguish commander/main/sideboard (commander cards share the `sb` id prefix with sideboard on mtgtop8)
- Icon is a simple generated 48x48 PNG
