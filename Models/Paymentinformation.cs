namespace ecommercewebsite.Models
{
    public class Paymentinformation
    {
        public string Email { get; set; } = null!;
        public string NameandSurname { get; set; } = null!;
        public string Address { get; set; } = null!;
        public float Totalmoney { get; set; }
        public List<ProductInfo>? Productinfo { get; set; } = null!;
    }
}
