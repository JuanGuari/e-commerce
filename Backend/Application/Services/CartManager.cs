using Application.DTOs;
using Application.Interfaces;
using AutoMapper;
using Core.Utils;
using Domain.Entities;
using Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class CartManager : ICartManager
    {

        private readonly IOrderRepository _orderRepository;
        private readonly IOrderProductRepository _orderProductRepository;
        private readonly IMapper _mapper;

        public CartManager(IOrderRepository orderRepository, IOrderProductRepository orderProductRepository, IMapper mapper)
        {
            _orderRepository = orderRepository;
            _orderProductRepository = orderProductRepository;
            _mapper = mapper;
        }

        public async Task<ResultOperation<OrderDTO>> AddToCartAsync(int userId, int productId, int quantity)
        {
            var result = new ResultOperation<OrderDTO>();
            var cart = await _orderRepository.GetCartAsync(userId);

            if (cart == null)
            {
                var random = new Random();
                int deliveryDays = random.Next(3, 16);

                cart = new OrderEntity
                {
                    UserId = userId,
                    Status = "En Proceso",
                    OrderDate = DateTime.Now,
                    EstimatedDeliveryDate = DateTime.Now.AddDays(deliveryDays)
                };
                await _orderRepository.Insert(cart);
                cart = await _orderRepository.GetCartAsync(userId); 
            }

            var orderProduct = await _orderProductRepository.AddProductToOrderAsync(cart.Id, productId, quantity);

           if (orderProduct == null)
           {
                result.Message = "Error at insert product into Cart";
                return result;
           }

            result.IsSuccess = true;
            result.Message = "Success";
            return result;


        }

        public async Task<ResultOperation<OrderDTO>> CheckoutAsync(int userId)
        {
            var result = new ResultOperation<OrderDTO>();

            var cart = await _orderRepository.GetCartAsync(userId);
            if (cart == null)
            {
                result.Message = "There is no active cart for this user.";               
            }

            Random random = new Random();
            int deliveryDays = random.Next(3, 16);
            cart.Status = "Confirmado";
            cart.EstimatedDeliveryDate = DateTime.Now.AddDays(deliveryDays);
            
            await _orderRepository.Update(cart);

            result.IsSuccess = true;
            return result;
        }

        public async Task<ResultOperation<OrderDTO>> GetCartAsync(int userId)
        {
            var result = new ResultOperation<OrderDTO>();

            var cart = await _orderRepository.GetCartAsync(userId);
            if (cart == null)
            {
                result.Message = "There is no active cart for this user.";
                return result;
            }

            var orderDto = _mapper.Map<OrderDTO>(cart);
            result.IsSuccess = true;
            result.Data = orderDto;
            return result;
        }

        public Task<ResultOperation<List<OrderDTO>>> RemoveCartAsync(int orderId)
        {
            throw new NotImplementedException();
        }
    }
}
