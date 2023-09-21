using Amazon.Runtime;
using ecommercewebsite.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace ecommercewebsite.Services
{
    public class DatabaseServices
    {
        private readonly IMongoCollection<AdminLogin> _admincollection;
        private readonly IMongoCollection<Product> _product;
        private readonly IMongoCollection<MainCategory> _maincategory;
        private readonly IMongoCollection<SubCategory> _subcategory;
        private readonly IMongoCollection<Advertise> _advertise;

        public DatabaseServices(
            IOptions<DatabaseConnectionSettings> databaseconnectionsetting)
        {
            var Mongoclient = new MongoClient(databaseconnectionsetting.Value.ConnectionString);
            var DatabaseName = Mongoclient.GetDatabase(databaseconnectionsetting.Value.DatabaseName);
            _admincollection = DatabaseName.GetCollection<AdminLogin>(databaseconnectionsetting.Value.AdminCollectionName);
            _product = DatabaseName.GetCollection<Product>(databaseconnectionsetting.Value.ProductCollectionName);
            _maincategory = DatabaseName.GetCollection<MainCategory>(databaseconnectionsetting.Value.MainCategoryCollectionName);
            _subcategory = DatabaseName.GetCollection<SubCategory>(databaseconnectionsetting.Value.SubCategoryCollectionName);
            _advertise = DatabaseName.GetCollection<Advertise>(databaseconnectionsetting.Value.AdvertiseCollectionName);
        }
        //AdminLogin Fonksiyonları
        public async Task<List<AdminLogin>> GetAsync() =>
       await _admincollection.Find(_ => true).ToListAsync();

        //Maincategory Fonksiyonları
        public async Task<List<MainCategory>> GetAsyncmain() =>
       await _maincategory.Find(_ => true).ToListAsync();
        public async Task<MainCategory?> GetAsync(int id)
        {
            return await _maincategory.Find(x => x.Categorycode == id).FirstOrDefaultAsync();
        }
        public async Task CreateAsync(MainCategory category)
        {
            category.Status = "aktif";
            //  int Lastcategory_id = _maincategory.AsQueryable().Count();
            //category.Categorycode = Lastcategory_id + 1;
            DateTime date = DateTime.Now;
            category.Created_at = date.ToString("dd/MM/yyyy HH:mm");
            category.Updated_at = date.ToString("dd/MM/yyyy HH:mm");
            await _maincategory.InsertOneAsync(category);
        }
        public void Update(int id, MainCategory updatecategory)
        {
            var filter = Builders<MainCategory>.Filter.Eq(x => x.Categorycode, id);
            DateTime date = DateTime.Now;
            updatecategory.Updated_at = date.ToString("dd/MM/yyyy HH:mm");
            var update = Builders<MainCategory>.Update.Set(x => x.Categorytitle, updatecategory.Categorytitle)
                                                       .Set(x => x.Updated_at, updatecategory.Updated_at);
            _maincategory.UpdateOne(filter, update);
        }
        public async Task Remove(int id) =>
         await _maincategory.DeleteOneAsync(x => x.Categorycode == id);
        public void Updatemaincategorystatus(int id, MainCategory maincategory)
        {
            var filter = Builders<MainCategory>.Filter.Eq(x => x.Categorycode, id);
            var update = Builders<MainCategory>.Update.Set(x => x.Status, maincategory.Status);
            _maincategory.UpdateOne(filter, update);
        }

        //Subcategory Fonksiyonları
        public async Task<List<SubCategory>> GetAsyncsub() =>
       await _subcategory.Find(_ => true).ToListAsync();
        public async Task CreateSub(SubCategory subcategory)
        {
            subcategory.Status = "aktif";
            DateTime date = DateTime.Now;
            subcategory.Created_at = date.ToString("dd/MM/yyyy HH:mm");
            subcategory.Updated_at = date.ToString("dd/MM/yyyy HH:mm");
            await _subcategory.InsertOneAsync(subcategory);
        }
        public async Task<SubCategory?> GetAsyncsubwid(int id)
        {
            return await _subcategory.Find(x => x.SubCategory_Id == id).FirstOrDefaultAsync();
        }
        public async Task<List<SubCategory>> GetAsyncsubwid2(int id)
        {
            return await _subcategory.Find(x => x.CategoryId == id).ToListAsync();
        }
        public async Task<ActionResult<IEnumerable<object>>> GetCategoriesWithSubcategories()
        {
            var categories = _maincategory.AsQueryable();
            var subcategories = _subcategory.AsQueryable();

            var query = from category in categories
                        join subcategory in subcategories on category.Categorycode equals subcategory.CategoryId into subcategoryGroup
                        select new
                        {
                            Category = category,
                            Subcategories = subcategoryGroup.ToList()
                        };

            var results = await Task.FromResult(query.ToList());
            return results;
        }
        public void Updatesub(int id, SubCategory updatesubcategory)
        {
            var filter = Builders<SubCategory>.Filter.Eq(x => x.SubCategory_Id, id);
            DateTime date = DateTime.Now;
            updatesubcategory.Updated_at = date.ToString("dd/MM/yyyy HH:mm");
            var update = Builders<SubCategory>.Update.Set(x => x.Subtitle, updatesubcategory.Subtitle)
                                                       .Set(x => x.Updated_at, updatesubcategory.Updated_at)
                                                       .Set(x => x.CategoryId, updatesubcategory.CategoryId);
            _subcategory.UpdateOne(filter, update);
        }
        public void Updatesubcategorystatus(int id, SubCategory subcategory)
        {
            var filter = Builders<SubCategory>.Filter.Eq(x => x.SubCategory_Id, id);
            var update = Builders<SubCategory>.Update.Set(x => x.Status, subcategory.Status);
            _subcategory.UpdateOne(filter, update);
        }
        public async Task Removesub(int id) =>
        await _subcategory.DeleteOneAsync(x => x.SubCategory_Id == id);
        public async Task Removesub2(int id) =>
        await _subcategory.DeleteManyAsync(x => x.CategoryId == id);

        //Product Fonksiyonları
        public async Task<List<Product>> GetAsyncproduct() =>
       await _product.Find(_ => true).ToListAsync();
        //User interface tarafında sadece status aktif olan ürünleri listele
        public async Task<List<Product>> GetAsyncproductforusers()
        {
            var filter = Builders<Product>.Filter.Eq("Status", "aktif");
            var activeProducts = await _product.Find(filter).ToListAsync();
            return activeProducts;
        }

        public async Task<Product?> GetAsyncproduct(int id)
        {
            return await _product.Find(x => x.Product_Id == id).FirstOrDefaultAsync();
        }
        public async Task<List<Product>> GetAsyncproductwcategory(int id)
        {
            return await _product.Find(x => x.CategoryId == id).ToListAsync();
        }
        public async Task<List<Product>> GetAsyncproductwsub(int id)
        {
            return await _product.Find(x => x.Subcategorycode == id).ToListAsync();
        }
        public async Task<List<Product>> Searchproducts(string query)
        {
            var filter = Builders<Product>.Filter.Empty;
            if(query != null || query != "")
            {
                filter = Builders<Product>.Filter.Or(Builders<Product>.Filter.Regex("Product_title", new BsonRegularExpression(query, "i")),
                    Builders<Product>.Filter.Regex("Brand", new BsonRegularExpression(query, "i")),
                    Builders<Product>.Filter.Regex("Maincategory.0.Categorytitle", new BsonRegularExpression(query, "i")),
                    Builders<Product>.Filter.Regex("Subcategory.0.Subtitle", new BsonRegularExpression(query, "i"))
                    );
            }
            return await _product.Find(filter).ToListAsync();
        }
        public async Task CreateProduct(Product product)
        {
            product.Status = "aktif";
            DateTime date = DateTime.Now;
            product.Created_at = date.ToString("dd/MM/yyyy HH:mm");
            product.Updated_at = date.ToString("dd/MM/yyyy HH:mm");
            int categoryid = product.CategoryId;
            int subcategoryid = product.Subcategorycode;
            product.Maincategory = new List<MainCategory>
            {
                new MainCategory{Categorycode=categoryid}
            };
            product.Subcategory = new List<SubCategory>
            {
                new SubCategory{ SubCategory_Id = subcategoryid}
            };
            List<int> categoryIds = product.Maincategory.Select(c => c.Categorycode).ToList();
            var filter = Builders<MainCategory>.Filter.In(c => c.Categorycode, categoryIds);
            var categories = _maincategory.Find(filter).ToList();
            product.Maincategory = categories;
            List<int> subcategoryId = product.Subcategory.Select(s => s.SubCategory_Id).ToList();
            var filter2 = Builders<SubCategory>.Filter.In(s => s.SubCategory_Id, subcategoryId);
            var subcategories = _subcategory.Find(filter2).ToList();
            product.Subcategory = subcategories;
            if (categories.Count != 0 && subcategories.Count != 0)
            {
                await _product.InsertOneAsync(product);
            }
        }
        public void Updateproduct(int id, Product product)
        {
            var filter = Builders<Product>.Filter.Eq(x => x.Product_Id, id);
            DateTime date = DateTime.Now;
            product.Updated_at = date.ToString("dd/MM/yyyy HH:mm");
            product.Maincategory = _maincategory.Find(x => x.Categorycode == product.CategoryId).ToList();
            product.Subcategory = _subcategory.Find(x => x.SubCategory_Id == product.Subcategorycode).ToList();
            var update = Builders<Product>.Update.Set(x => x.Product_title, product.Product_title)
                                                       .Set(x => x.Updated_at, product.Updated_at)
                                                       .Set(x => x.CategoryId, product.CategoryId)
                                                       .Set(x => x.Definition, product.Definition)
                                                       .Set(x => x.Price, product.Price)
                                                       .Set(x => x.Brand, product.Brand)
                                                       .Set(x => x.Subcategorycode, product.Subcategorycode)
                                                       .Set(x => x.Img_url, product.Img_url)
                                                       .Set(x => x.Maincategory, product.Maincategory)
                                                       .Set(x => x.Subcategory, product.Subcategory);

            _product.UpdateOne(filter, update);
        }
        public void Updateproductstatus(int id,Product product)
        {
            var filter = Builders<Product>.Filter.Eq(x => x.Product_Id, id);
            var update = Builders<Product>.Update.Set(x => x.Status, product.Status);
            _product.UpdateOne(filter, update);
        }
        public async Task Removeproduct(int id) =>
      await _product.DeleteOneAsync(x => x.Product_Id == id);

        //Advertise Fonksiyonları
        public async Task<List<Advertise>> GetAsyncadvertise() =>
       await _advertise.Find(_ => true).ToListAsync();
        public async Task<Advertise?> GetAsyncadvertise(int id)
        {
            return await _advertise.Find(x => x.Advertise_Id == id).FirstOrDefaultAsync();
        }
        public async Task CreateAdvertise(Advertise advertise)
        {
            advertise.Status = "aktif";
            DateTime date = DateTime.Now;
            advertise.Created_at = date.ToString("dd/MM/yyyy HH:mm");
            advertise.Updated_at = date.ToString("dd/MM/yyyy HH:mm");
            await _advertise.InsertOneAsync(advertise);
        }
        public void UpdateAdvertise(int id, Advertise advertise)
        {
            var filter = Builders<Advertise>.Filter.Eq(x => x.Advertise_Id, id);
            DateTime date = DateTime.Now;
            advertise.Updated_at = date.ToString("dd/MM/yyyy HH:mm");
            var update = Builders<Advertise>.Update.Set(x => x.Title, advertise.Title)
                                                       .Set(x => x.Updated_at, advertise.Updated_at)
                                                       .Set(x => x.Definition, advertise.Definition)
                                                       .Set(x => x.Img_url, advertise.Img_url);
            _advertise.UpdateOne(filter, update);
        }
        public void Updateadvertisestatus(int id, Advertise advertise)
        {
            var filter = Builders<Advertise>.Filter.Eq(x => x.Advertise_Id, id);
            var update = Builders<Advertise>.Update.Set(x => x.Status, advertise.Status);
            _advertise.UpdateOne(filter, update);
        }
        public async Task Removeadvertise(int id) =>
        await _advertise.DeleteOneAsync(x => x.Advertise_Id == id);
    }
}
