async function submitProblemReport(event) {
    event.preventDefault();
    
    const form = document.getElementById('problemReportForm');
    const submitButton = form.querySelector('.submit-button');
    
    // Show loading state
    submitButton.innerHTML = 'Sending...';
    submitButton.disabled = true;
    
    // Get form data
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
        honeypot: formData.get('honeypot') // Include honeypot for spam protection
    };
    

    let emailSentSuccessfully = false;
    
    try {
        // Try server-side email sending first (works on Replit)
        const response = await fetch('/api/problem-report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(problemData)
        });
        
        // Check if we got a successful response
        if (response.ok) {
            let result;
            try {
                result = await response.json();
                if (result && result.success) {
                    // Successfully sent via server
                    showMessage('Problem report sent successfully! We\'ll get back to you soon.', 'success');
                    form.reset();
                    emailSentSuccessfully = true;
                } else {
                    // Server responded but with an error
                    throw new Error('FALLBACK_TO_MAILTO');
                }
            } catch (jsonError) {
                // Invalid JSON response
                throw new Error('FALLBACK_TO_MAILTO');
            }
        } else {
            // Non-2xx response (404, 500, etc.) - fall back to mailto
            throw new Error('FALLBACK_TO_MAILTO');
        }
        
    } catch (error) {
        console.log('Server email failed, falling back to mailto:', error.message);
        
        // For ANY error (network, 404, 500, CORS, etc.), fall back to mailto
        if (!emailSentSuccessfully) {
            try {
                // Create email content for mailto fallback
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
                
                // Open email client
                window.location.href = mailtoLink;
                
                // Show fallback message
                showMessage('Your email client will open with the problem report. Please send the email to complete your submission.', 'success');
                
                // Reset form
                form.reset();
                emailSentSuccessfully = true;
                
            } catch (mailtoError) {
                console.error('Mailto fallback also failed:', mailtoError);
                showMessage('Unable to send report automatically. Please email us directly at CipherLogsPlus@Proton.me with your computer problem details.', 'error');
            }
        }
    } finally {
        // Reset button
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