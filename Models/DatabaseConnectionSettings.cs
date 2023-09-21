namespace ecommercewebsite.Models
{
    public class DatabaseConnectionSettings
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string AdminCollectionName { get; set; } = null!;
        public string ProductCollectionName { get; set; } = null!;
        public string MainCategoryCollectionName { get; set; } = null!;
        public string SubCategoryCollectionName { get; set; } = null!;
        public string AdvertiseCollectionName { get; set; } = null!;

    }
}
