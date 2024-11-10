using Domain.Entities;
using Domain.Repositories;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
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

        public async Task<PaginateResultEntity?> GetWithFilters(string? category, int pageNumber, int pageSize)
        {
            var query = _context.Productos.AsQueryable();
            if (!string.IsNullOrEmpty(category))
            {
                query = query.Where(p => p.Category == category);
            }
            var totalItems = await query.CountAsync();
            var products = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
            var paginatedResult = new PaginateResultEntity
            {
                TotalItems = totalItems,
                PageNumber = pageNumber,
                PageSize = pageSize,
                Products = products
            };

            return paginatedResult;
        }
    }
}
