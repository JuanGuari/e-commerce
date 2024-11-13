using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IRepositoryAsync<T> : IDisposable where T : class
    {
        Task<List<T>> GetAll();
        Task<T?> GetByID(int id);
        Task<T> Insert(T entity);
        Task Delete(T entity);
        Task Update(T entity);
    }
}
