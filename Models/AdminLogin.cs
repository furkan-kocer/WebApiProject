using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ecommercewebsite.Models
{
    public class AdminLogin
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonElement("username")]
        public string UserName { get; set; } = null!;
        [BsonElement("passsword")]
        public string Password { get; set; } = null!;
    }
}
