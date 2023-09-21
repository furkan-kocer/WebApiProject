using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace ecommercewebsite.Models
{
    public class MainCategory
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonElement("categorycode")]
        public int Categorycode { get; set; }
        [BsonElement("categorytitle")]
        public string? Categorytitle { get; set; } = null!;
        [BsonElement("updated_at")]
        public string? Updated_at { get; set; } = null!;
        [BsonElement("created_at")]
        public string? Created_at { get; set; } = null!;
        [BsonElement("status")]
        public string? Status { get; set; } = null!;
    }
}
