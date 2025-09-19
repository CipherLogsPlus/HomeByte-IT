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
        // Send problem report to our backend API
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
            throw new Error(response.status === 429 ? 'Too many requests. Please wait before trying again.' : 'Server error occurred');
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
        console.error('Error sending problem report:', error);
        showMessage('There was an error sending your problem report. Please try again or contact us directly.', 'error');
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