using Application.DTOs;
using Core.Utils;
using Domain.Entities;
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
    }
}
