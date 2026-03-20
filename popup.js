const btn = document.getElementById("copy");
const status = document.getElementById("status");
const includeCommander = document.getElementById("includeCommander");
const includeSideboard = document.getElementById("includeSideboard");

// Persist toggle state across popup opens
chrome.storage.local.get(
  { includeCommander: true, includeSideboard: true },
  (prefs) => {
    includeCommander.checked = prefs.includeCommander;
    includeSideboard.checked = prefs.includeSideboard;
  },
);

includeCommander.addEventListener("change", () => {
  chrome.storage.local.set({ includeCommander: includeCommander.checked });
});

includeSideboard.addEventListener("change", () => {
  chrome.storage.local.set({ includeSideboard: includeSideboard.checked });
});

btn.addEventListener("click", async () => {
  btn.disabled = true;
  status.textContent = "";
  status.className = "";

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.tabs.sendMessage(tab.id, { action: "parseDeck" }, async (resp) => {
    if (chrome.runtime.lastError || !resp) {
      status.textContent =
        "This site isn't supported or no decklist was found.";
      status.className = "error";
      btn.disabled = false;
      return;
    }

    if (!resp.ok) {
      status.textContent = resp.error;
      status.className = "error";
      btn.disabled = false;
      return;
    }

    // Assemble plain text based on toggle state
    const sections = [];

    if (includeCommander.checked && resp.commander.length > 0) {
      sections.push(resp.commander.join("\n"));
    }

    sections.push(resp.main.join("\n"));

    if (includeSideboard.checked && resp.sideboard.length > 0) {
      sections.push(resp.sideboard.join("\n"));
    }

    const text = sections.join("\n\n");

    try {
      await navigator.clipboard.writeText(text);
      status.textContent = `Copied! (${resp.source})`;
      status.className = "success";
    } catch {
      status.textContent = "Clipboard write failed.";
      status.className = "error";
    }

    btn.disabled = false;
  });
});
