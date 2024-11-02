/* eslint-disable no-var */
import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        // create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {
                    $set: { 
                        verifyToken: hashedToken, 
                        verifyTokenExpiry: Date.now() + 3600000  // Corrected: replaced `)` with `}`
                    }
                }
            );
        } else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId, 
                {
                    $set: { 
                    forgotPasswordToken: hashedToken, 
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            });
        }

        var transport = nodemailer.createTransport({ 
            host: "sandbox.smtp.mailtrap.io", 
            port: 2525, 
            auth: { 
                user: "5e5e9e8c103317", 
                pass: "67153a50f34b21" 
            } 
        });


        const mailOptions = {
            from: 'hitesh@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailresponse = await transport.sendMail
        (mailOptions);
        return mailresponse;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        throw new Error(error.message);
    }
}