using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IOrderProductRepository : IRepositoryAsync<OrderProductEntity>
    {
        public Task<OrderProductEntity?> AddProductToOrderAsync(int cartId,int productId,int quantity);
    }
}
