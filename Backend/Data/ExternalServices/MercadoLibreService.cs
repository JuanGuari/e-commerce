using Domain.Entities;
using Domain.ExternalServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Infrastructure.ExternalServices
{
    public class MercadoLibreService : IMercadoLibreService
    {
        private readonly HttpClient _httpClient;

        public MercadoLibreService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<List<ProductEntity>?> GetProducts()
        {
            var textToSearch = "ropa";
            var response = await _httpClient.GetAsync
                ($"https://api.mercadolibre.com/sites/MLA/search?q={textToSearch}");
            response.EnsureSuccessStatusCode();
            var result = await response.Content.ReadFromJsonAsync<MercadoLibreResponse>();
            return result?.Results.Select(p => new ProductEntity
            {
                Name = p.Title,
                Price = p.Price,
                Category = p.Category_Id,
                ImageUrl = p.Thumbnail,
                Description = p.Title
            }).ToList();
        }

        public class MercadoLibreResponse 
        { 
            public List<ProductResult> Results { get; set; }
        }
        public class ProductResult
        {
            public string Id { get; set; }
            public string Title { get; set; }
            public decimal Price { get; set; }
            public string Category_Id { get; set; }
            public string Thumbnail { get; set; }
        }
    }
}
