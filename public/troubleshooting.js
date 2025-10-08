const ISSUE_LIBRARY = [
  {
    id: "power",
    title: "PC Will Not Power On",
    summary:
      "The system shows no lights or fan activity when you press the power button. This is usually a power delivery issue.",
    keywords: [
      "won't turn on",
      "wont turn on",
      "computer won't turn on",
      "computer wont turn on",
      "pc wont power on",
      "will not turn on",
      "no power",
      "dead",
      "not starting",
      "power button does nothing",
      "press power nothing",
    ],
    quickChecks: [
      "Confirm the outlet works by plugging in a lamp or phone charger.",
      "If it's a desktop, check the power supply switch (often a 0/1 rocker) is set to ON.",
      "Reseat the power cable at both the PC and the wall or power strip.",
      "Remove any USB devices that might be shorting the system.",
      "For laptops: hold the power button for 10 seconds, release, then try again with the charger connected.",
    ],
    deeperDiagnosis: [
      "Look for any indicator lights on the motherboard or charging LED; if none are present it may be a failed power supply or motherboard.",
      "Listen for brief fan spin or beeps—single clicks can indicate a short.",
      "If the machine powers briefly then shuts off, overheating or faulty RAM could be to blame.",
    ],
    urgentFlags: [
      "Burning smell or visible sparks when connecting power.",
      "Liquid damage or signs the system was dropped.",
      "Repeated power cycling every few seconds without booting.",
    ],
    recommendedService:
      "If there is still no response after the quick checks, the internal power supply or motherboard likely needs professional diagnostics.",
    tools: [
      { label: "Outlet Tester", url: "https://www.amazon.com/s?k=outlet+tester" },
      { label: "Replacement Power Cord", url: "https://www.amazon.com/s?k=pc+power+cord" },
    ],
    example: "Computer won't turn on after a power outage",
    severity: "critical",
  },
  {
    id: "blue-screen",
    title: "Blue Screen (BSOD) or Sudden Crashes",
    summary:
      "Windows stops with a blue screen error or restarts unexpectedly. This is often caused by faulty drivers, failing hardware, or OS corruption.",
    keywords: [
      "blue screen",
      "blue screen of death",
      "bsod",
      "stop code",
      "crash",
      "critical process died",
      "page fault",
      "memory management",
      "system thread exception",
    ],
    quickChecks: [
      "Note the stop code displayed on the blue screen—take a photo if possible.",
      "Unplug newly added USB devices or external drives and reboot.",
      "Boot into Safe Mode (Shift + Restart) to see if the problem goes away.",
      "Update Windows and device drivers once the machine is stable.",
      "Run Windows Memory Diagnostic to test for faulty RAM.",
    ],
    deeperDiagnosis: [
      "Check Reliability Monitor or Event Viewer for repeating critical errors.",
      "If crashes happen during gaming, stress test the GPU and monitor temperatures.",
      "Run `sfc /scannow` from an elevated Command Prompt to repair system files.",
    ],
    urgentFlags: [
      "Blue screens begin after liquid damage or a hardware upgrade.",
      "Stop codes referencing storage (e.g., `INACCESSIBLE_BOOT_DEVICE`).",
      "Crashes occur before Windows finishes loading.",
    ],
    recommendedService:
      "Persistent blue screens after software updates usually mean hardware testing is required. We can isolate faulty RAM, drives, or GPUs on-site.",
    tools: [
      {
        label: "Reliability Monitor Guide",
        url: "https://support.microsoft.com/windows/view-reliability-history-in-windows-1a71c344-0af2-2b3d-e0f0-4d7f471b0f52",
      },
      {
        label: "Windows Memory Diagnostic Instructions",
        url: "https://support.microsoft.com/windows/how-to-use-windows-memory-diagnostic-bc6b9e46-0dd6-1f42-9e6d-5ec6092ab989",
      },
      { label: "BlueScreenView", url: "https://www.nirsoft.net/utils/blue_screen_view.html" },
    ],
    example: "Getting a stop code memory management blue screen",
    severity: "warning",
  },
  {
    id: "performance",
    title: "Slow or Freezing Computer",
    summary:
      "Applications take ages to open, the system stutters, or programs become unresponsive. This is usually a resource bottleneck or background process issue.",
    keywords: [
      "slow",
      "laggy",
      "freezing",
      "running slow",
      "takes forever",
      "unresponsive",
      "high disk",
      "100% disk",
      "computer slow",
      "slow computer",
      "program freezing",
    ],
    quickChecks: [
      "Restart the PC—Windows needs a reboot more often than people think.",
      "Open Task Manager (Ctrl + Shift + Esc) and sort by CPU, Memory, and Disk to see what app is hogging resources.",
      "Uninstall browser extensions or programs you don't actually use.",
      "Check for Windows or driver updates and install them during downtime.",
      "Run a reputable antivirus scan to rule out malware (Microsoft Defender, Malwarebytes).",
    ],
    deeperDiagnosis: [
      "Review startup apps in Task Manager → Startup tab and disable anything unnecessary.",
      "If the system uses a mechanical hard drive, consider upgrading to an SSD.",
      "Run `chkdsk /f` and `sfc /scannow` to check for drive or system file errors.",
    ],
    urgentFlags: [
      "Clicking or grinding noises from the computer—possible failing hard drive.",
      "Pop-ups claiming you have thousands of issues or need to pay to clean the PC.",
      "System becomes unusable immediately after a Windows update.",
    ],
    recommendedService:
      "If performance issues persist after cleanup, we can perform a deep diagnostic, SSD upgrade, or full system refresh.",
    tools: [
      { label: "Malwarebytes Free", url: "https://www.malwarebytes.com/mwb-download" },
      { label: "Autoruns (advanced startup control)", url: "https://learn.microsoft.com/en-us/sysinternals/downloads/autoruns" },
    ],
    example: "Computer is painfully slow and freezes randomly",
    severity: "advisory",
  },
  {
    id: "malware",
    title: "Virus, Malware, or Pop-up Overload",
    summary:
      "Unexpected pop-ups, warnings, or programs you didn't install. Malware often slows the system and tries to trick you into paying for fake fixes.",
    keywords: [
      "virus",
      "popup",
      "pop up",
      "ads",
      "malware",
      "fake antivirus",
      "browser hijack",
      "virus warning",
      "fake support",
      "browser redirect",
      "ransomware",
    ],
    quickChecks: [
      "Disconnect from the internet if the pop-ups demand payment or remote access.",
      "Run a full scan with Microsoft Defender, then a second scan with Malwarebytes.",
      "Remove suspicious browser extensions and reset the browser settings.",
      "Clear temporary files with Disk Cleanup (`cleanmgr`).",
      "Change passwords for critical accounts from a clean device if you suspect compromise.",
    ],
    deeperDiagnosis: [
      "Boot into Safe Mode with Networking and run the scans again.",
      "Use Autoruns to disable unknown startup entries.",
      "Check the hosts file and proxy settings for malicious changes.",
    ],
    urgentFlags: [
      "You are being locked out of files or see ransomware notes.",
      "Banking or personal information was entered after the pop-up appeared.",
      "Remote access software was installed without your consent.",
    ],
    recommendedService:
      "Professional cleanup ensures rootkits or hidden persistence mechanisms are removed. We also harden the system to prevent future infections.",
    tools: [
      {
        label: "Microsoft Defender Offline Scan instructions",
        url: "https://support.microsoft.com/windows/help-protect-my-pc-with-microsoft-defender-offline-9306d528-64bf-4668-5b80-ff533f183d09",
      },
      { label: "Malwarebytes Free", url: "https://www.malwarebytes.com/mwb-download" },
    ],
    example: "Pop-ups saying I have viruses and need to call support",
    severity: "critical",
  },
  {
    id: "scam",
    title: "Tech Support Scam Warning",
    summary:
      "Unsolicited phone calls, emails, or pop-ups claiming to be from Microsoft, Apple, or security companies. They always demand remote access or payment.",
    keywords: [
      "microsoft called",
      "tech support call",
      "someone called",
      "mcafee",
      "norton",
      "antivirus popup",
      "warning popup",
      "call this number",
      "teamviewer",
      "anydesk",
      "tech support scam",
      "fake microsoft",
      "scam call",
      "refund scam",
    ],
    quickChecks: [
      "Close the pop-up by ending the browser task (Ctrl + Shift + Esc → End Task).",
      "Hang up immediately—legitimate companies never contact you proactively.",
      "Uninstall remote access tools (TeamViewer, AnyDesk, QuickAssist) if you didn't request assistance.",
      "Contact your bank if you shared credit card details or allowed remote access.",
      "Run a malware scan to ensure nothing was left behind.",
    ],
    deeperDiagnosis: [
      "Review installed programs for anything added within the last few days.",
      "Check browser history for suspicious 'support' URLs.",
      "Enable multi-factor authentication on critical accounts.",
    ],
    urgentFlags: [
      "Scammers already connected to your computer.",
      "You provided financial information or passwords.",
      "Pop-up prevents normal use of the computer even after reboot.",
    ],
    recommendedService:
      "If access was granted, email us right away. We'll schedule a visit to clean the system, review audit logs, and ensure they no longer have control.",
    tools: [
      { label: "FTC Scam Guidance", url: "https://consumer.ftc.gov/articles/how-avoid-tech-support-scams" },
    ],
    example: "Pop-up says call Microsoft right away",
    severity: "critical",
  },
  {
    id: "network",
    title: "Internet or Wi-Fi Problems",
    summary:
      "Systems intermittently lose connectivity, show limited access, or refuse to join the wireless network.",
    keywords: [
      "internet",
      "wifi",
      "wi-fi",
      "connection",
      "can't connect",
      "cant connect",
      "internet down",
      "wifi dropping",
      "no internet",
      "wireless keeps dropping",
      "network",
      "network issue",
    ],
    quickChecks: [
      "Verify other devices can reach the internet on the same network.",
      "Restart the modem and router—unplug for 30 seconds, plug back in.",
      "Forget the Wi-Fi network on Windows and reconnect with the password.",
      "Check airplane mode or physical wireless toggles on laptops.",
      "Update the network adapter driver from Device Manager.",
    ],
    deeperDiagnosis: [
      "Run `ipconfig /all` to confirm you are getting a valid IP address.",
      "Use `ping 8.8.8.8` to see if the issue is DNS vs. general connectivity.",
      "Check router logs for repeated disconnects or firmware errors.",
    ],
    urgentFlags: [
      "No devices in the home can connect even after rebooting the modem.",
      "Frequent disconnects when using video calls or streaming.",
      "Visible damage to the Ethernet cable or ports.",
    ],
    recommendedService:
      "If the connection still drops, we can diagnose Wi-Fi interference, replace failing hardware, or configure a mesh network.",
    tools: [
      { label: "Speedtest", url: "https://www.speedtest.net/" },
      { label: "Wi-Fi Analyzer (Windows)", url: "https://www.microsoft.com/store/apps/9nblggh33n0n" },
    ],
    example: "Wi-Fi keeps disconnecting every few minutes",
    severity: "warning",
  },
  {
    id: "overheating",
    title: "Overheating or Thermal Shutdowns",
    summary:
      "The PC feels excessively hot, fans are loud, or it shuts down during demanding tasks. Overheating can damage components.",
    keywords: [
      "overheating",
      "too hot",
      "thermal",
      "fans loud",
      "shuts off while gaming",
      "temperature",
      "thermal throttling",
    ],
    quickChecks: [
      "Ensure vents are not blocked and the PC has space to breathe.",
      "Clean dust from vents and fans using compressed air (while the PC is off).",
      "Use HWMonitor or Core Temp to check CPU/GPU temperatures.",
      "Verify fans spin freely and are not obstructed.",
      "For laptops, use a cooling pad to improve airflow.",
    ],
    deeperDiagnosis: [
      "Reapply thermal paste on the CPU/GPU if it hasn't been serviced in several years (advanced).",
      "Check fan curves in BIOS/UEFI or vendor software.",
      "Inspect internal cabling to ensure it isn't blocking airflow.",
    ],
    urgentFlags: [
      "System shuts down within minutes of startup.",
      "Temperatures exceed 95°C under light load.",
      "Fans fail to spin or make grinding noises.",
    ],
    recommendedService:
      "Thermal issues often require disassembly, deep cleaning, and new thermal interface material—services we provide on-site.",
    tools: [
      { label: "HWMonitor", url: "https://www.cpuid.com/softwares/hwmonitor.html" },
      { label: "Compressed Air", url: "https://www.amazon.com/s?k=compressed+air+pc" },
    ],
    example: "PC shuts down while gaming because it's hot",
    severity: "warning",
  },
  {
    id: "peripherals",
    title: "USB, Keyboard, or Mouse Not Working",
    summary:
      "Connected devices intermittently stop responding or are not detected at all. This can stem from drivers, power, or hardware faults.",
    keywords: [
      "usb not working",
      "keyboard not working",
      "mouse stops",
      "device not recognized",
      "usb disconnecting",
      "peripheral",
      "printer offline",
    ],
    quickChecks: [
      "Try another USB port and avoid unpowered hubs.",
      "Restart the computer after unplugging and reconnecting the device.",
      "For wireless peripherals, replace batteries or re-pair the dongle.",
      "In Device Manager, uninstall the problematic USB controller, then scan for hardware changes.",
      "Run Windows Update to pull down fresh driver packages.",
    ],
    deeperDiagnosis: [
      "Inspect the USB cable for kinks or fraying.",
      "Check Power Management settings—disable 'Allow the computer to turn off this device to save power' for USB hubs.",
      "Test the device on another computer to confirm it works.",
    ],
    urgentFlags: [
      "Multiple devices fail simultaneously after a power surge.",
      "USB ports feel loose or show physical damage.",
      "Peripherals disconnect whenever the PC is moved.",
    ],
    recommendedService:
      "We can repair or replace damaged ports, install dedicated controllers, and set up reliable peripheral workflows.",
    tools: [
      { label: "USBDeview", url: "https://www.nirsoft.net/utils/usb_devices_view.html" },
    ],
    example: "Keyboard keeps disconnecting randomly",
    severity: "advisory",
  },
  {
    id: "update-loop",
    title: "Windows Update Loop or Boot Hang",
    summary:
      "Windows gets stuck applying updates, reboots repeatedly, or refuses to reach the desktop. Often due to corrupted updates or startup files.",
    keywords: [
      "stuck on updates",
      "update loop",
      "undoing changes",
      "windows update fail",
      "won't boot after update",
      "automatic repair loop",
      "stuck installing updates",
      "windows update stuck",
      "computer keeps restarting during update",
    ],
    quickChecks: [
      "Let Windows attempt the update cycle at least twice—some patches take a while.",
      "Boot into Advanced Startup (Shift + Restart) and choose 'System Restore' if a restore point exists.",
      "Boot into Safe Mode and uninstall the most recent quality or feature update.",
      "Run `DISM /Online /Cleanup-Image /RestoreHealth` followed by `sfc /scannow` in Safe Mode with Command Prompt.",
      "Disconnect unnecessary peripherals during update attempts.",
    ],
    deeperDiagnosis: [
      "Check Windows Update history for the specific KB that fails, then download and install it manually.",
      "Review `C:\\Windows\\WindowsUpdate.log` for error codes.",
      "Test the storage drive with vendor diagnostics to rule out failing media.",
    ],
    urgentFlags: [
      "Automatic Repair cannot fix the boot issue.",
      "Important business or personal data is not backed up.",
      "Updates fail repeatedly even after manual intervention.",
    ],
    recommendedService:
      "We can rescue data, perform in-place repairs, or clean install Windows while migrating your files and apps.",
    tools: [
      { label: "Microsoft Update Catalog", url: "https://www.catalog.update.microsoft.com/Home.aspx" },
      { label: "Windows 10/11 Media Creation Tool", url: "https://www.microsoft.com/software-download/windows10" },
    ],
    example: "Windows keeps undoing changes after update",
    severity: "warning",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("problemInput");
  const suggestionsDiv = document.getElementById("suggestions");
  const trigger = document.getElementById("suggestionButton");

  if (!input || !suggestionsDiv || !trigger) {
    console.warn("Troubleshooting UI elements missing; skipping interactive helper.");
    return;
  }

  const highlightText = (text, terms) => {
    if (!terms || terms.length === 0) return text;
    const escapedTerms = terms
      .filter(Boolean)
      .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|");
    if (!escapedTerms) return text;
    const regex = new RegExp(`\\b(${escapedTerms})\\b`, "gi");
    return text.replace(regex, (match) => `<mark>${match}</mark>`);
  };

  const renderIssue = (issue, context = {}) => {
    const { matchedKeywords = [] } = context;
    const container = document.createElement("div");
    container.className = "suggestion-results enhanced";

    const matchedDisplay =
      matchedKeywords.length > 0 && matchedKeywords[0] !== "quick-select"
        ? `<p class="match-note">Matched keywords: <span>${matchedKeywords.join(", ")}</span></p>`
        : "";

    container.innerHTML = `
      <div class="issue-header">
        <h4>${issue.title}</h4>
        <p>${highlightText(issue.summary, matchedKeywords)}</p>
        ${matchedDisplay}
      </div>
      <div class="issue-body">
        <section>
          <h5>Quick Checks</h5>
          <ol>${issue.quickChecks.map((item) => `<li>${highlightText(item, matchedKeywords)}</li>`).join("")}</ol>
        </section>
        <section>
          <h5>Dig Deeper</h5>
          <ul>${issue.deeperDiagnosis.map((item) => `<li>${highlightText(item, matchedKeywords)}</li>`).join("")}</ul>
        </section>
        <section class="issue-flags">
          <h5>Red Flags — Email Us Immediately If:</h5>
          <ul>${issue.urgentFlags.map((item) => `<li>${item}</li>`).join("")}</ul>
        </section>
        <section>
          <h5>When To Schedule A HomeByte IT Visit</h5>
          <p>${issue.recommendedService}</p>
        </section>
        ${
          issue.tools?.length
            ? `<section class="issue-tools">
                <h5>Helpful Tools</h5>
                <ul>${issue.tools
                  .map((tool) => `<li><a href="${tool.url}" target="_blank" rel="noopener">${tool.label}</a></li>`)
                  .join("")}</ul>
              </section>`
            : ""
        }
      </div>
      <p class="contact-note">If you're still stuck, <a href="contact.html">send us a problem report</a> and we'll take it from here.</p>
    `;

    suggestionsDiv.innerHTML = "";
    suggestionsDiv.appendChild(container);
  };

  const renderMultipleMatches = (matches) => {
    const list = document.createElement("div");
    list.className = "suggestion-results multi";

    list.innerHTML = `
      <h4>We found a few possible matches</h4>
      <p>Select the one that sounds closest, or refine your description for better results.</p>
      <div class="issue-list"></div>
    `;

    const listContainer = list.querySelector(".issue-list");

    matches.forEach(({ issue, matchedKeywords }) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "issue-card";
      card.innerHTML = `
        <div>
          <strong>${issue.title}</strong>
          <p>${highlightText(issue.summary, matchedKeywords)}</p>
        </div>
        <span class="issue-chip">Show fixes</span>
      `;
      card.addEventListener("click", () => renderIssue(issue, { matchedKeywords }));
      listContainer.appendChild(card);
    });

    suggestionsDiv.innerHTML = "";
    suggestionsDiv.appendChild(list);
  };

  const renderNoMatch = (text) => {
    suggestionsDiv.innerHTML = `
      <div class="suggestion-results">
        <h4>We couldn't identify that issue yet</h4>
        <p>Try describing what you were doing, any error messages, or what changed recently. Here's what to do next:</p>
        <ol>
          <li>Restart the computer and note any error codes or lights.</li>
          <li>Check cables, peripherals, and your internet connection.</li>
          <li>Run a quick virus scan if the behaviour is suspicious.</li>
        </ol>
        <p class="contact-note">Still not sure? <a href="contact.html">Send us the details</a> and we'll take over.</p>
      </div>
    `;
  };

  const scoreIssue = (text, issue) => {
    const normalized = text.toLowerCase();
    if (!normalized.trim()) return { score: 0, matched: [] };

    let score = 0;
    const matchedTerms = new Set();

    issue.keywords.forEach((keyword) => {
      if (normalized.includes(keyword)) {
        score += keyword.split(" ").length >= 2 ? 6 : 3;
        matchedTerms.add(keyword);
      }
    });

    if (issue.severity === "critical") {
      score += 1;
    }

    return { score, matched: Array.from(matchedTerms) };
  };

  const processInput = () => {
    const text = input.value;
    const results = ISSUE_LIBRARY.map((issue) => {
      const { score, matched } = scoreIssue(text, issue);
      return { issue, score, matched };
    })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score);

    if (results.length === 0) {
      renderNoMatch(text);
      return;
    }

    const topScore = results[0].score;
    const strongMatches = results.filter((item) => item.score >= topScore - 2);

    if (strongMatches.length === 1) {
      renderIssue(strongMatches[0].issue, { matchedKeywords: strongMatches[0].matched });
    } else {
      renderMultipleMatches(strongMatches.map(({ issue, matched }) => ({ issue, matchedKeywords: matched })));
    }
  };

  trigger.addEventListener("click", () => processInput());

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      processInput();
    }
  });

});
