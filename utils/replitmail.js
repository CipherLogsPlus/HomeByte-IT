// Replit Mail utility - adapted from blueprint:replitmail integration
function getAuthToken() {
  const xReplitToken = process.env.REPL_IDENTITY
    ? "repl " + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
      ? "depl " + process.env.WEB_REPL_RENEWAL
      : null;

  if (!xReplitToken) {
    throw new Error(
      "No authentication token found. Please set REPL_IDENTITY or ensure you're running in Replit environment."
    );
  }

  return xReplitToken;
}

async function sendEmail(message) {
  // Validate required fields
  if (!message.to || !message.subject) {
    throw new Error('Email requires "to" and "subject" fields');
  }

  if (!message.text && !message.html) {
    throw new Error('Email requires either "text" or "html" content');
  }

  const authToken = getAuthToken();

  const response = await fetch(
    "https://connectors.replit.com/api/v2/mailer/send",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X_REPLIT_TOKEN": authToken,
      },
      body: JSON.stringify({
        to: message.to,
        cc: message.cc,
        subject: message.subject,
        text: message.text,
        html: message.html,
        attachments: message.attachments,
      }),
    }
  );

  if (!response.ok) {
    let error;
    try {
      error = await response.json();
    } catch {
      error = { message: `HTTP ${response.status}: ${response.statusText}` };
    }
    throw new Error(error.message || "Failed to send email");
  }

  return await response.json();
}

module.exports = { sendEmail };