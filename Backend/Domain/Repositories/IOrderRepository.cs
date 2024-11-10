using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IOrderRepository : IRepositoryAsync<OrderEntity>
    {
        public Task<OrderEntity?> GetCartAsync(int userId);

    }
}
