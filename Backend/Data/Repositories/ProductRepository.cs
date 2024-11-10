using Domain.Entities;
using Domain.Repositories;
using Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class ProductRepository : RepositoryAsync<ProductEntity>, IProductRepository
    {
        private readonly AppDbContext _context;
        public ProductRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<bool> AddProducts(IEnumerable<ProductEntity> products)
        {
            try
            {
                await _context.Productos.AddRangeAsync(products);
                await _context.SaveChangesAsync();
                return true;
            }
            catch{
                return false;
            }
        }
    }
}
