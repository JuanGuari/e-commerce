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
    public class OrderProductRepository : RepositoryAsync<OrderProductEntity>, IOrderProductRepository
    {
        private readonly AppDbContext _context;
        public OrderProductRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<OrderProductEntity?> AddProductToOrderAsync(int cartId, int productId, int quantity)
        {
            try
            {
                var OrderProduct = new OrderProductEntity
                {
                    OrderId = cartId,
                    ProductId = productId,
                    Quantity = quantity
                };
                await _context.AddAsync(OrderProduct);
                await _context.SaveChangesAsync();
                return OrderProduct;            
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
