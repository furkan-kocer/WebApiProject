using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace ecommercewebsite.Models
{
    public class SubCategory
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonElement("subcategory_id")]
        public int SubCategory_Id { get; set; }
        [BsonElement("subtitle")]
        public string? Subtitle { get; set; } = null!;
        [BsonElement("updated_at")]
        public string? Updated_at { get; set; } = null!;
        [BsonElement("created_at")]
        public string? Created_at { get; set; } = null!;
        [BsonElement("status")]
        public string? Status { get; set; } = null!;
        [BsonElement("categoryid")]
        public int CategoryId { get; set; }

    }
}
