const express = require('express');
const rateLimit = require('express-rate-limit');
const path = require('path');
const { sendEmail } = require('./utils/replitmail');

const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Middleware
app.use(express.json({ limit: '1mb' }));
app.use(express.static('public'));

// Apply rate limiting to API routes with JSON response
const jsonLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, error: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', jsonLimiter);

// Honeypot and validation middleware
const validateFormData = (req, res, next) => {
  const { computerType, brand, problemDescription, whenHappened, customerName, customerPhone } = req.body;
  
  // Honeypot check (we'll add a hidden field later)
  if (req.body.honeypot) {
    return res.status(400).json({ success: false, error: 'Invalid request' });
  }
  
  // Required field validation
  if (!computerType || !brand || !problemDescription || !whenHappened || !customerName || !customerPhone) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }
  
  // Comprehensive field validation with appropriate length limits
  const fieldLimits = {
    computerType: 50,
    brand: 100,
    model: 100,
    serialNumber: 200,
    problemDescription: 2000,
    whenHappened: 200,
    whatDoing: 500,
    errorMessages: 2000,
    customerName: 100,
    customerPhone: 50,
    additionalNotes: 1000
  };
  
  // Validate and trim all fields
  for (const [field, limit] of Object.entries(fieldLimits)) {
    if (req.body[field] && req.body[field].length > limit) {
      return res.status(400).json({ 
        success: false, 
        error: `${field} is too long (max ${limit} characters)` 
      });
    }
    // Trim whitespace
    if (req.body[field]) {
      req.body[field] = req.body[field].trim();
    }
  }
  
  next();
};

// Email sending endpoint
app.post('/api/problem-report', validateFormData, async (req, res) => {
  try {
    const { 
      computerType, brand, model, serialNumber, problemDescription, 
      whenHappened, whatDoing, errorMessages, customerName, 
      customerPhone, additionalNotes 
    } = req.body;
    
    // Create email content
    const emailContent = `
New Problem Report from ${customerName}

CONTACT INFORMATION:
Name: ${customerName}
Phone: ${customerPhone}

COMPUTER DETAILS:
Type: ${computerType}
Brand: ${brand}
Model: ${model || 'Not specified'}
Serial Number: ${serialNumber || 'Not provided'}

PROBLEM DETAILS:
Description: ${problemDescription}
When it started: ${whenHappened}
What user was doing: ${whatDoing || 'Not specified'}

ERROR MESSAGES:
${errorMessages || 'None reported'}

ADDITIONAL NOTES:
${additionalNotes || 'None provided'}

---
Submitted via HomeByte IT Problem Report Form
`;
    
    const subject = `Problem Report - ${brand} ${computerType} - ${customerName}`;
    
    // Send email using Replit Mail integration
    const emailResult = await sendEmail({
      to: 'CipherLogsPlus@Proton.me',
      subject: subject,
      text: emailContent
    });
    
    console.log('Email sent successfully:', emailResult.messageId);
    
    res.json({ 
      success: true, 
      message: 'Problem report sent successfully!' 
    });
    
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send problem report. Please try again.' 
    });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});