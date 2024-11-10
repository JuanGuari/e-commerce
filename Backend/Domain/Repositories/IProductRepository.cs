﻿using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IProductRepository : IRepositoryAsync<ProductEntity>
    {
        public Task<bool> AddProducts(IEnumerable<ProductEntity> products);
    }
}