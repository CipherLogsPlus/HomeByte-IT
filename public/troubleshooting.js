document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("problemInput");
  const suggestionsDiv = document.getElementById("suggestions");
  const trigger = document.getElementById("suggestionButton");

  if (!input || !suggestionsDiv || !trigger) {
    console.warn("Troubleshooting UI elements missing; skipping interactive helper.");
    return;
  }

  const renderSuggestions = (text) => {
    const problem = text.trim().toLowerCase();
    let suggestions = [];

    if (
      problem.includes("won't turn on") ||
      problem.includes("dead") ||
      problem.includes("no power") ||
      problem.includes("not starting")
    ) {
      suggestions = [
        "Check that the power cable is firmly plugged in",
        "Make sure the power switch on the back of the computer is turned ON",
        "Try a different power outlet",
        "Check if the power light on the computer is on",
        "If it's a laptop, try plugging it in and let it charge for 30 minutes",
        "Try holding the power button for 10 seconds, then press it again",
        "If none of these work, it may be a hardware issue - contact us for professional help",
      ];
    } else if (
      problem.includes("blue screen") ||
      problem.includes("bsod") ||
      problem.includes("crash")
    ) {
      suggestions = [
        "Allow the PC to restart - don't force shut down",
        "Write down any error codes shown on the blue screen",
        "If it keeps happening, restart in Safe Mode",
        "Check if you recently installed new software or drivers",
        "This often indicates a hardware or driver issue - contact us if it persists",
      ];
    } else if (
      problem.includes("slow") ||
      problem.includes("laggy") ||
      problem.includes("freezing") ||
      problem.includes("running slow")
    ) {
      suggestions = [
        "Stop clicking on random things and downloading unknown software!",
        "Restart your computer - this fixes many performance issues",
        "Close programs you're not currently using",
        "Run a full virus scan with your antivirus software",
        "Check if your hard drive is almost full and delete old files",
      ];
    } else if (
      problem.includes("virus") ||
      problem.includes("popup") ||
      problem.includes("pop up") ||
      problem.includes("ads") ||
      problem.includes("malware")
    ) {
      suggestions = [
        "Run a full system scan with your antivirus software",
        "Don't click on any suspicious pop-ups or download 'cleaners'",
        "Avoid visiting suspicious websites",
        "Consider running Malwarebytes for additional cleaning",
        "Stop downloading and clicking on random things!",
      ];
    } else if (
      problem.includes("microsoft called") ||
      problem.includes("tech support call") ||
      problem.includes("someone called") ||
      problem.includes("mcafee") ||
      problem.includes("norton") ||
      problem.includes("antivirus popup") ||
      problem.includes("warning popup")
    ) {
      suggestions = [
        "🚨 THIS IS A SCAM! Microsoft, McAfee, Norton, and other companies NEVER call or show pop-ups asking you to call them!",
        "If it's a phone call: Hang up immediately and do NOT give them access to your computer",
        "If it's a pop-up: Close the browser window (don't click anything in the pop-up)",
        "Do NOT download any software they tell you to install",
        "Do NOT give them credit card information or personal details",
        "If you already gave them access, disconnect from internet and call us immediately",
      ];
    } else if (
      problem.includes("internet") ||
      problem.includes("wifi") ||
      problem.includes("connection") ||
      problem.includes("can't connect")
    ) {
      suggestions = [
        "Check that your wifi is turned on and connected",
        "Try restarting your router (unplug for 30 seconds, plug back in)",
        "Restart your computer",
        "Check if other devices can connect to the same network",
        "Make sure you're using the correct wifi password",
      ];
    } else if (problem.length > 0) {
      suggestions = [
        "Try restarting your computer first - this fixes many common issues",
        "Make sure all cables are securely connected",
        "Check if you recently installed any new software",
        "Consider running a virus scan",
        "If the problem persists, contact us for professional help",
      ];
    }

    if (suggestions.length > 0) {
      const steps = suggestions
        .map((item) => {
          if (item.includes("🚨") || item.includes("SCAM")) {
            return `<li class="scam-alert">${item}</li>`;
          }
          return `<li>${item}</li>`;
        })
        .join("");

      suggestionsDiv.innerHTML = `
        <div class="suggestion-results">
          <h4>Try These Steps:</h4>
          <ol>${steps}</ol>
          <p class="contact-note">If these steps don't help, <a href="contact.html">contact us for professional support</a>!</p>
        </div>
      `;
    } else if (problem.length === 0) {
      suggestionsDiv.innerHTML = '<p class="error-message">Please describe your computer problem above.</p>';
    } else {
      suggestionsDiv.innerHTML = "";
    }
  };

  trigger.addEventListener("click", () => renderSuggestions(input.value));

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      renderSuggestions(input.value);
    }
  });
});
