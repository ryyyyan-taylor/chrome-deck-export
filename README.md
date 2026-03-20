# Deck Export

Browser extension that copies MTG decklists from various websites to your clipboard as plain text. Works in Chrome and Firefox.

## Supported Sites

- [mtgtop8.com](https://mtgtop8.com) — main deck, sideboard, and commander

*More sites coming soon.*

## Installation

### Chrome

1. Go to `chrome://extensions`
2. Enable **Developer mode** (toggle in the top right)
3. Click **Load unpacked**
4. Select this repository folder

### Firefox

1. Go to `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on**
3. Select the `manifest.json` file in this repository folder

> **Note:** Temporary Firefox add-ons reset on browser restart. Toggle preferences (Include Commander / Include Sideboard) will not persist across restarts with temporary loading.

## Usage

1. Navigate to a decklist page on a supported site
2. Click the **Deck Export** extension icon
3. Toggle options as needed:
   - **Include Commander** — include the commander in formats that have one (on by default)
   - **Include Sideboard** — include the sideboard (on by default)
4. Click **Copy Decklist**
5. Paste wherever you need it

The copied text contains no section headers — just card lines separated by blank lines between sections.
