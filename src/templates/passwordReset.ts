export const passwordResetTemplate = (resetLink: string) => {
    return `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>We received a request to reset your password. Click the button below to proceed:</p>
        <a href="${resetLink}" 
           style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px; margin: 10px 0;">
           Reset Password
        </a>
        <p>If you didn’t request this, you can ignore this email.</p>
        <p>Thank you, <br/> The Hustlr Team</p>
      </div>
    `;
  };
  