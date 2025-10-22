// relayEvent helper (from class notes)
function relayEvent(target, sourceEventType, newEventType, detailFunc) {
    if (!target) return; // ✅ skip if element not found
    target.addEventListener(sourceEventType, (event) => {
      event.stopPropagation(); // prevent generic 'change' from bubbling
      const detail = detailFunc ? detailFunc(event) : {};
      target.dispatchEvent(
        new CustomEvent(newEventType, { bubbles: true, detail })
      );
    });
  }
  
  // --- Theme toggle logic ---
  const label = document.getElementById("theme-toggle");
  const input = document.getElementById("darkmode-input");
  const body = document.body;
  
  // Step 1: convert 'change' → custom 'darkmode:toggle' (only if toggle exists)
  relayEvent(label, "change", "darkmode:toggle", (e) => ({
    checked: e.target.checked,
  }));
  
  // Step 2: body listens for the custom event
  body.addEventListener("darkmode:toggle", (e) => {
    const on = !!e.detail.checked;
    body.classList.toggle("dark-mode", on);
    try {
      localStorage.setItem("cb-dark", on ? "1" : "0");
    } catch {}
  });
  
  // Step 3: apply stored preference or OS setting on load
  window.addEventListener("DOMContentLoaded", () => {
    let on = false;
    try {
      const saved = localStorage.getItem("cb-dark");
      if (saved === "1") on = true;
      else if (saved === null && window.matchMedia) {
        on = window.matchMedia("(prefers-color-scheme: dark)").matches;
      }
    } catch {}
    if (input) input.checked = on;
    body.classList.toggle("dark-mode", on);
  });
  