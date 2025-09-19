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
        additionalNotes: formData.get('additionalNotes')
    };
    
    // Create email content
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

    try {
        // Since this is a static website, we'll use a simple email link approach
        // In a real implementation, this would send via the Replit mail service
        const subject = `Problem Report - ${problemData.brand} ${problemData.computerType} - ${problemData.customerName}`;
        const mailtoLink = `mailto:support@homebyteit.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailContent)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        showMessage('Problem report prepared! Your email client should open with all the details filled in.', 'success');
        
        // Reset form
        form.reset();
        
    } catch (error) {
        console.error('Error preparing problem report:', error);
        showMessage('There was an error preparing your problem report. Please try again or contact us directly.', 'error');
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