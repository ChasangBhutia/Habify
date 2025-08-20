const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendMessage = async (email) => {

    const mailOptions = {
        from: `Habify Team - ${process.env.EMAIL_USER}`,
        to: email,
        subject: "Group Task Added",
        text: "You have been added to a task.",
        html: "<h3>You have been added to a task.</h3>"
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (err) {
        console.log(`Error: ${err.message}`);
    }
}

module.exports = sendMessage;