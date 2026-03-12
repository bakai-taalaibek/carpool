using Resend;

public class EmailService
{
    private readonly IResend _resend;

    public EmailService(IResend resend)
    {
        _resend = resend;
    }

    public async Task SendVerificationEmail(string? email, string link)
    {
        if (string.IsNullOrWhiteSpace(email))
        {
            return;
        }

        var message = new EmailMessage();

        message.From = "carpool@taalaibek.com";
        message.To.Add(email);
        message.Subject = "Verify your email";
        message.HtmlBody = $"""
            <h2>Verify your email</h2>
            <p>Click the link below:</p>
            <a href="{link}">{link}</a>
            """;

        await _resend.EmailSendAsync(message);
    }

    public async Task SendPasswordResetToken(string? email, string link)
    {
        if (string.IsNullOrWhiteSpace(email))
        {
            return;
        }

        var message = new EmailMessage();

        message.From = "carpool@taalaibek.com";
        message.To.Add(email);
        message.Subject = "Password reset";
        message.HtmlBody = $"""
            <h2>Password reset</h2>
            <p>Click the link below to reset your password:</p>
            <a href="{link}">{link}</a>
            """;

        await _resend.EmailSendAsync(message);
    }
}