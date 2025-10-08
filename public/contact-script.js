document.addEventListener("DOMContentLoaded", () => {
  const EMAILJS_PUBLIC_KEY = "fRoFZuQPSpVwvWNaV";
  const EMAILJS_SERVICE_ID = "service_p66l4q8";
  const EMAILJS_TEMPLATE_ID = "template_qs7mn4h";

  // Wait until EmailJS loads, then initialize
  const checkEmailJS = setInterval(() => {
    if (typeof emailjs !== "undefined") {
      clearInterval(checkEmailJS);
@@ -21,21 +20,21 @@
    button.disabled = true;

    const honeypot = form.querySelector("input[name='honeypot']").value;
    if (honeypot) return; // Stop bots

    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
      .then(() => {
        alert("✅ Problem report sent successfully!");
        form.reset();
      })
      .catch((err) => {
        console.error("❌ EmailJS error:", err);
        alert("⚠️ Failed to send report. Please try again later.");
      })
      .finally(() => {
        button.innerText = "Send Problem Report";
        button.disabled = false;
      });
  });
});
