using ecommercewebsite.Models;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;

namespace ecommercewebsite.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmailsendController : ControllerBase
    {
        private readonly IOptions<MailSender> _sendMail;
        public EmailsendController(IOptions<MailSender> sendMail)
        {
            _sendMail = sendMail;
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Getmessagefromuser getmessage)
        {
            try
            {
                string toAddress = _sendMail.Value.toAddress;//email
                string smtppass = _sendMail.Value.smtpPass;// bu kısım e-mail şifrem paylaşma
                using var smtpClient = new SmtpClient();
                smtpClient.Connect(_sendMail.Value.smtpClientConnect, 587, SecureSocketOptions.StartTls);
                smtpClient.Authenticate(toAddress, smtppass);
                MimeMessage message = new MimeMessage();
                message.From.Add(new MailboxAddress(getmessage.NameandSurname, toAddress));
                message.To.Add(new MailboxAddress("", toAddress));
                message.Subject = "E-ticaret Sitem İletişim Mesajı"; // E-posta konusu
                message.Body = new TextPart("plain")
                {
                    Text = "From: " + getmessage.NameandSurname
                    + " " + "\n" + "Email: " + getmessage.Email + "\n" + "Message: " + getmessage.Message
                };
                await smtpClient.SendAsync(message);
                smtpClient.Disconnect(true);
                return Ok();
            }
            catch (Exception ex)
            {
                // E-posta gönderme işleminde bir hata oluşursa, false dönelim
                //Console.WriteLine(ex.ToString());
                return NotFound(ex.ToString());
            }
        }
    }
}
