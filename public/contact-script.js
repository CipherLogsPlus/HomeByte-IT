document.addEventListener("DOMContentLoaded", () => {
  const EMAILJS_PUBLIC_KEY = "fRoFZuQPSpVwvWNaV";
  const EMAILJS_SERVICE_ID = "service_p66l4q8";
  const EMAILJS_TEMPLATE_ID = "template_qs7mn4h";

  const form = document.getElementById("problemReportForm");
  if (!form) {
    console.error("Problem report form not found on the page.");
    return;
  }

  const submitButton = form.querySelector(".submit-button");
  if (!submitButton) {
    console.error("Submit button not found within the problem report form.");
    return;
  }

  const messageContainer = document.getElementById("formMessages");
  const originalButtonText = submitButton.innerText;

  const showMessage = (type, text) => {
    if (!messageContainer) {
      console.warn("Message container not found for contact form.");
      window.alert(text);
      return;
    }
    messageContainer.innerHTML = `<div class="form-message ${type}">${text}</div>`;
  };

  const resetButton = () => {
    submitButton.innerText = originalButtonText;
    submitButton.disabled = false;
  };

  // Poll for EmailJS global before initializing to avoid race conditions.
  const checkEmailJS = setInterval(() => {
    if (typeof emailjs !== "undefined") {
      clearInterval(checkEmailJS);
      emailjs.init(EMAILJS_PUBLIC_KEY);
      console.log("✅ EmailJS initialized.");
    }
  }, 300);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitButton.innerText = "Sending...";
    submitButton.disabled = true;
    if (messageContainer) {
      messageContainer.innerHTML = "";
    }

    const honeypotField = form.querySelector("input[name='honeypot']");
    if (honeypotField?.value) {
      resetButton();
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      resetButton();
      return;
    }

    if (typeof emailjs === "undefined") {
      console.error("EmailJS SDK not available.");
      showMessage("error", "Email service is unavailable at the moment. Please try again shortly or email us directly.");
      resetButton();
      return;
    }

    const formData = new FormData(form);
    const values = {
      computerType: formData.get("computerType") || "Not specified",
      brand: formData.get("brand") || "Not specified",
      model: formData.get("model") || "Not specified",
      serialNumber: formData.get("serialNumber") || "Not provided",
      problemDescription: formData.get("problemDescription") || "Not provided",
      whenHappened: formData.get("whenHappened") || "Not provided",
      whatDoing: formData.get("whatDoing") || "Not specified",
      errorMessages: formData.get("errorMessages") || "None reported",
      customerName: formData.get("customerName") || "Not provided",
      customerPhone: formData.get("customerPhone") || "Not provided",
      additionalNotes: formData.get("additionalNotes") || "None provided",
    };

    const templateParams = {
      ...values,
      computer_type: values.computerType,
      serial_number: values.serialNumber,
      problem_description: values.problemDescription,
      when_happened: values.whenHappened,
      what_doing: values.whatDoing,
      error_messages: values.errorMessages,
      customer_name: values.customerName,
      customer_phone: values.customerPhone,
      additional_notes: values.additionalNotes,
    };

    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(() => {
        showMessage("success", "Problem report sent successfully! We'll reach out soon.");
        form.reset();
      })
      .catch((err) => {
        console.error("❌ EmailJS error:", err);
        showMessage("error", "We couldn't send your report automatically. Please try again in a moment or email us directly.");
      })
      .finally(() => {
        resetButton();
      });
  });
});
