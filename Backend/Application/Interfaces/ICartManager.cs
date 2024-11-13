using Application.DTOs;
using Core.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface ICartManager
    {
        Task<ResultOperation<OrderDTO>> AddToCartAsync(int userId, int productId, int quantity);
        Task<ResultOperation<OrderDTO>> GetCartAsync(int userId);
        Task<ResultOperation<OrderDTO>> CheckoutAsync(int userId);
        Task<ResultOperation<List<OrderDTO>>> RemoveCartAsync(int orderId);
    }
}
