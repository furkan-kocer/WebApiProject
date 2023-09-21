using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace ecommercewebsite.Models
{
    public class Product
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonElement("product_Id")]
        public int Product_Id { get; set; }
        [BsonElement("product_title")] 
        public string? Product_title { get; set; } = null!;
        [BsonElement("price")]
        public string? Price { get; set; } = null!;
        [BsonElement("img_url")]
        public string? Img_url { get; set; } = null!;
        [BsonElement("updated_at")] 
        public string? Updated_at { get; set; } = null!;
        [BsonElement("created_at")]
        public string? Created_at { get; set; } = null!;
        [BsonElement("status")]
        public string? Status { get; set; } = null!;
        [BsonElement("categoryId")]
        public int CategoryId { get; set; }
        [BsonElement("subcategorycode")]
        public int Subcategorycode { get; set; }
        [BsonElement("definition")]
        public string? Definition { get; set; } = null!;
        [BsonElement("brand")]
        public string? Brand { get; set; } = null!;
        public List<MainCategory>? Maincategory { get; set; }
        public List<SubCategory>? Subcategory { get; set; }
    }
}
