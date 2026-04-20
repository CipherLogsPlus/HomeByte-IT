document.addEventListener("DOMContentLoaded", () => {
  const WORKER_URL = "https://contact-form.cipherlogsplus.workers.dev";

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

  form.addEventListener("submit", async (event) => {
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

    const formData = new FormData(form);
    const data = {
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
      customerEmail: formData.get("customerEmail") || "Not provided",
      serviceAddress: formData.get("serviceAddress") || "Not provided",
      serviceZip: formData.get("serviceZip") || "Not provided",
      preferredTimeWindow: formData.get("preferredTimeWindow") || "Not provided",
      bestContactMethod: formData.get("bestContactMethod") || "Not provided",
      rushRequested: formData.get("rushRequested") || "No",
      additionalNotes: formData.get("additionalNotes") || "None provided",
    };

    try {
      const response = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        showMessage("success", "Problem report sent successfully! We'll reach out soon.");
        form.reset();
      } else {
        showMessage("error", result.error || "Something went wrong. Please try again or email us directly.");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      showMessage("error", "We couldn't send your report. Please try again or email us directly.");
    } finally {
      resetButton();
    }
  });
});
