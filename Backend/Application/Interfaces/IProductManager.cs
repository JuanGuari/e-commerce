using Application.DTOs;
using Core.Utils;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IProductManager
    {
        Task<ResultOperation<bool>> AddProductsAsync();
        Task<ResultOperation<PaginateResultDTO>> GetAll(string? category, int pageNumber, int pageSize);
        Task<ResultOperation<ProductDTO>> GetById(int id);
        Task<ResultOperation<List<string>>> GetCategories();
    }
}
