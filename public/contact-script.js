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
    

    try {
        // Try server-side email sending first (works on Replit)
        const response = await fetch('/api/problem-report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(problemData)
        });
        
        let result;
        try {
            result = await response.json();
        } catch (jsonError) {
            // Handle non-JSON responses (like rate limiting)
            if (response.status === 429) {
                throw new Error('Too many requests. Please wait before trying again.');
            }
            // If we get here, likely on static hosting - fall back to mailto
            throw new Error('FALLBACK_TO_MAILTO');
        }
        
        if (response.ok && result.success) {
            // Show success message
            showMessage('Problem report sent successfully! We\'ll get back to you soon.', 'success');
            
            // Reset form
            form.reset();
        } else {
            throw new Error(result.error || 'Failed to send problem report');
        }
        
    } catch (error) {
        console.error('API Error:', error.message);
        
        // Fall back to mailto for static hosting (like GitHub Pages)
        if (error.message === 'FALLBACK_TO_MAILTO' || error.message.includes('fetch')) {
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
                
            } catch (mailtoError) {
                console.error('Mailto fallback failed:', mailtoError);
                showMessage('Unable to send report automatically. Please email us directly at CipherLogsPlus@Proton.me with your computer problem details.', 'error');
            }
        } else {
            showMessage('There was an error sending your problem report. Please try again or contact us directly.', 'error');
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