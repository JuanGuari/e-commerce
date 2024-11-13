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
    public class OrderRepository : RepositoryAsync<OrderEntity>, IOrderRepository
    {
        private readonly AppDbContext _context;
        public OrderRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<OrderEntity?> GetCartAsync(int userId)
        {
            var order = await _context.Orders.Include(o => o.OrderProducts).ThenInclude(op => op.Product)
                .FirstOrDefaultAsync(o => o.UserId == userId && o.Status != "Confirmado"); 
            if (order == null) 
            { 
                return null; 
            }

            return order;
        }
    }
}
