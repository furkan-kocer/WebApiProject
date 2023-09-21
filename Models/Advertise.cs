using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace ecommercewebsite.Models
{
    public class Advertise
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonElement("advertise_id")]
        public int Advertise_Id { get; set; }
        [BsonElement("title")]
        public string? Title { get; set; } = null!;
        [BsonElement("img_url")]
        public string? Img_url { get; set; } = null!;
        [BsonElement("definition")]
        public string? Definition { get; set; } = null!;
        [BsonElement("updated_at")]
        public string? Updated_at { get; set; } = null!;
        [BsonElement("created_at")]
        public string? Created_at { get; set; } = null!;
        [BsonElement("status")]
        public string? Status { get; set; } = null!;
    }
}
