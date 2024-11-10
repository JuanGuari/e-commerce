using Application.DTOs;
using Application.Interfaces;
using AutoMapper;
using Core.Utils;
using Domain.Entities;
using Domain.ExternalServices;
using Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class ProductManager: IProductManager
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        private readonly IMercadoLibreService _mercadoLibreService;

        public ProductManager(IMapper mapper, IProductRepository productRepository,
            IMercadoLibreService mercadoLibreService)
        {
            _mapper = mapper;
            _productRepository = productRepository;
            _mercadoLibreService = mercadoLibreService;
        }

        public async Task<ResultOperation<bool>> AddProductsAsync()
        {
            var result = new ResultOperation<bool>();
            try
            {                
                var products = await _mercadoLibreService.GetProducts();
                if(products == null)
                {
                    result.Message = "Error at getProducts";
                    return result;
                }

                await _productRepository.AddProducts(products);

                result.IsSuccess = true;
                result.Message = "Success";
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = ex.Message;
            }
            return result;
        }
    }
}
