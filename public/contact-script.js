document.addEventListener("DOMContentLoaded", () => {
  // === EmailJS configuration ===
  const EMAILJS_PUBLIC_KEY = "fRoFZuQPSpVwvWMaV";
  const EMAILJS_SERVICE_ID = "service_p66l4q8";
  const EMAILJS_TEMPLATE_ID = "template_qs7mn4h";

  // Wait for EmailJS to load properly before initializing
  const checkEmailJS = setInterval(() => {
    if (typeof emailjs !== "undefined") {
      clearInterval(checkEmailJS);
      emailjs.init(EMAILJS_PUBLIC_KEY);
      console.log("✅ EmailJS initialized successfully.");
    }
  }, 300);

  const form = document.getElementById("problemReportForm");
  const button = form.querySelector(".submit-button");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    button.innerText = "Sending...";
    button.disabled = true;

    const formData = new FormData(form);
    const honeypot = formData.get("honeypot");

    // Simple bot check
    if (honeypot) return;

    // Send form data using EmailJS
    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
      .then(() => {
        showMessage("✅ Problem report sent successfully! We'll reach out soon.", "success");
        form.reset();
      })
      .catch((error) => {
        console.error("EmailJS failed:", error);
        showMessage("❌ Failed to send report. Please email CipherLogsPlus@Proton.me manually.", "error");
      })
      .finally(() => {
        button.innerText = "Send Problem Report";
        button.disabled = false;
      });
  });

  // Helper to display messages below form
  function showMessage(message, type) {
    const oldMsg = document.querySelector(".form-message");
    if (oldMsg) oldMsg.remove();

    const div = document.createElement("div");
    div.className = `form-message ${type}`;
    div.innerHTML = message;
    form.parentNode.insertBefore(div, form.nextSibling);

    setTimeout(() => div.remove(), 6000);
  }
});
