const express = require('express');
const bodyParser = require('body-parser');
const sendGridMail = require('@sendgrid/mail');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors());

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Existing contact form endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    const msg = {
        to: 'israelblenn@gmail.com',
        from: 'lbccontactform@gmail.com',
        subject: `Contact form submission from ${name}`,
        text: `You have a new contact form submission:
        Name: ${name}
        Email: ${email}
        Message: ${message}`,
    };

    try {
        await sendGridMail.send(msg);
        return res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ success: false, message: 'Failed to send email' });
    }
});

// Test email route - must be above the catch-all route
app.get('/test-email', async (req, res) => {
    const msg = {
        to: 'israelblenn@gmail.com',
        from: 'lbccontactform@gmail.com',
        subject: 'Test email from Render',
        text: 'This is a test email from your live production environment.',
    };

    try {
        await sendGridMail.send(msg);
        return res.status(200).json({ success: true, message: 'Test email sent successfully' });
    } catch (error) {
        console.error('Error sending test email:', error);
        if (error.response) {
            console.error('SendGrid Error Details:', error.response.body);
        }
        return res.status(500).json({ success: false, message: 'Failed to send test email' });
    }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all route to serve index.html for client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
