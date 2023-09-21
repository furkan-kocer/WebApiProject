using ecommercewebsite.Models;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MimeKit;
using System.Text;

namespace ecommercewebsite.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PaymentsendController : ControllerBase
    {
        private readonly IOptions<MailSender> _sendMail;
        public PaymentsendController(IOptions<MailSender> sendMail)
        {
            _sendMail = sendMail;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Paymentinformation payinfo)
        {  
            try
            {
                string toAddress = _sendMail.Value.toAddress;
                string smtppass = _sendMail.Value.smtpPass;
                using var smtpClient = new SmtpClient();
                smtpClient.Connect(_sendMail.Value.smtpClientConnect, 587, SecureSocketOptions.StartTls);
                smtpClient.Authenticate(toAddress, smtppass);
                StringBuilder sb = new StringBuilder();

                foreach (var product in payinfo.Productinfo)
                {
                    sb.AppendLine($"Ürün adı: {product.Product_title}");
                    sb.AppendLine($"Markası: {product.Brand}");
                    //sb.AppendLine($"Adedi: {product.Quantity}");
                    sb.AppendLine($"Açıklaması: {product.Definition}");
                    sb.AppendLine(); // Boş bir satır ekler
                }
                string result = sb.ToString();

                MimeMessage message = new MimeMessage();
                message.From.Add(new MailboxAddress("qualityecommerce", toAddress));
                message.To.Add(new MailboxAddress("", "ecomfurkantest@outlook.com"));
                message.Subject = "Ürün Bilgileri"; // E-posta konusu
                message.Body = new TextPart("plain")
                {
                    Text = "Sayın " + payinfo.NameandSurname + " siparişiniz alınmıştır. En kısa sürede adresinize teslim edilecektir."
                + "\n" + "Sipariş Özeti: " + "\n" + result + "\n" + "Toplam Sipariş tutarı: " + payinfo.Totalmoney + " TL"
                };
                await smtpClient.SendAsync(message);
                smtpClient.Disconnect(true);
                return Ok();
            }
            catch (Exception ex)
            {
                // E-posta gönderme işleminde bir hata oluşursa, false dönelim
                Console.WriteLine(ex.ToString());
                return NotFound();
            }
        }
    }
}
