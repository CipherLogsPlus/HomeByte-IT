function submitProblemReport(event) {
    event.preventDefault();

    const form = document.getElementById('problemReportForm');
    const submitButton = form.querySelector('.submit-button');

    submitButton.innerHTML = 'Preparing email...';
    submitButton.disabled = true;

    const formData = new FormData(form);
    const problemData = {
        computerType: formData.get('computerType'),
        brand: formData.get('brand'),
        model: formData.get('model'),
        serialNumber: formData.get('serialNumber'),
        problemDescription: formData.get('problemDescription'),
        whenHappened: formData.get('whenHappened'),
        whatDoing: formData.get('whatDoing'),
        errorMessages: formData.get('errorMessages'),
        customerName: formData.get('customerName'),
        customerPhone: formData.get('customerPhone'),
        additionalNotes: formData.get('additionalNotes'),
        honeypot: formData.get('honeypot')
    };

    // Basic honeypot check to deter bots
    if (problemData.honeypot) {
        submitButton.innerHTML = 'Send Problem Report';
        submitButton.disabled = false;
        return;
    }

    try {
        const emailContent = `
New Problem Report from ${problemData.customerName}

CONTACT INFORMATION:
Name: ${problemData.customerName}
Phone: ${problemData.customerPhone}

COMPUTER DETAILS:
Type: ${problemData.computerType}
Brand: ${problemData.brand}
Model: ${problemData.model || 'Not specified'}
Serial Number: ${problemData.serialNumber || 'Not provided'}

PROBLEM DETAILS:
Description: ${problemData.problemDescription}
When it started: ${problemData.whenHappened}
What user was doing: ${problemData.whatDoing || 'Not specified'}

ERROR MESSAGES:
${problemData.errorMessages || 'None reported'}

ADDITIONAL NOTES:
${problemData.additionalNotes || 'None provided'}

---
Submitted via HomeByte IT Problem Report Form
`;

        const subject = `Problem Report - ${problemData.brand} ${problemData.computerType} - ${problemData.customerName}`;
        const mailtoLink = `mailto:CipherLogsPlus@Proton.me?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailContent)}`;

        // Trigger the mail client without leaving a blank tab behind
        let launched = false;
        try {
            const anchor = document.createElement('a');
            anchor.href = mailtoLink;
            anchor.style.display = 'none';
            anchor.rel = 'noopener';
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
            launched = true;
        } catch (err) {
            console.warn('Anchor mailto launch failed, falling back to location.href', err);
        }

        if (!launched) {
            window.location.href = mailtoLink;
        }

        showMessage('We opened an email draft with your report. Please review and send it to complete your submission.', 'success');

    } catch (error) {
        console.error('Mailto failed:', error);
        showMessage('Unable to open your email client. Please email CipherLogsPlus@Proton.me with your computer problem details.', 'error');
    } finally {
        submitButton.innerHTML = 'Send Problem Report';
        submitButton.disabled = false;
    }
}

function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.innerHTML = message;
    
    // Insert after the form
    const form = document.getElementById('problemReportForm');
    form.parentNode.insertBefore(messageDiv, form.nextSibling);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}
