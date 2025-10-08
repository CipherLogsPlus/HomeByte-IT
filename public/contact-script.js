const EMAILJS_PUBLIC_KEY = 'fRoFZuQPSpVwvWMaV';
const EMAILJS_SERVICE_ID = 'service_p66l4q8';
const EMAILJS_TEMPLATE_ID = 'template_qs7mn4h';

let emailJsReady = false;

try {
    if (
        typeof emailjs !== 'undefined' &&
        EMAILJS_PUBLIC_KEY &&
        !EMAILJS_PUBLIC_KEY.includes('REPLACE_WITH')
    ) {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        emailJsReady = true;
    } else {
        console.warn('EmailJS credentials missing or not initialized. Mailto fallback will be used.');
    }
} catch (initError) {
    console.error('EmailJS failed to initialize:', initError);
}

function submitProblemReport(event) {
    event.preventDefault();

    const form = document.getElementById('problemReportForm');
    const submitButton = form.querySelector('.submit-button');

    submitButton.innerHTML = emailJsReady ? 'Sending...' : 'Preparing email...';
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
        if (emailJsReady) {
            const templateParams = {
                computer_type: problemData.computerType,
                brand: problemData.brand,
                model: problemData.model || 'Not specified',
                serial_number: problemData.serialNumber || 'Not provided',
                problem_description: problemData.problemDescription,
                when_happened: problemData.whenHappened,
                what_doing: problemData.whatDoing || 'Not specified',
                error_messages: problemData.errorMessages || 'None reported',
                customer_name: problemData.customerName,
                customer_phone: problemData.customerPhone,
                additional_notes: problemData.additionalNotes || 'None provided'
            };

            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
                .then(() => {
                    showMessage('Problem report sent successfully! We\'ll reach out soon.', 'success');
                    form.reset();
                })
                .catch(err => {
                    console.error('EmailJS send failed, falling back to mailto:', err);
                    launchMailtoFallback(problemData);
                })
                .finally(() => {
                    submitButton.innerHTML = 'Send Problem Report';
                    submitButton.disabled = false;
                });
            return;
        }

        // EmailJS not ready, use mailto fallback
        launchMailtoFallback(problemData);
    } catch (error) {
        console.error('Unexpected error preparing submission:', error);
        launchMailtoFallback(problemData);
    }

    submitButton.innerHTML = 'Send Problem Report';
    submitButton.disabled = false;
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

function launchMailtoFallback(problemData) {
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

    try {
        window.location.href = mailtoLink;
        showMessage('We opened an email draft with your report. Please review and send it to complete your submission.', 'success');
    } catch (err) {
        console.error('Mailto fallback failed:', err);
        showMessage('Unable to open your email client. Please email CipherLogsPlus@Proton.me with your computer problem details.', 'error');
    }
}
