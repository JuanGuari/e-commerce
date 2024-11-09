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
    public class RepositoryAsync<T> : IRepositoryAsync<T> where T : class
    {
        private readonly AppDbContext _context;
        private bool disposed = false;

        public RepositoryAsync(AppDbContext context)
        {
            _context = context;
        }

        protected DbSet<T> EntitySet => _context.Set<T>();


        public async Task<List<T>> GetAll()
        {
            return await EntitySet.ToListAsync() ?? [];
        }

        public async Task<T?> GetByID(int id)
        {
            return await EntitySet.FindAsync(id);
        }

        public virtual async Task<T> Insert(T entity)
        {
            EntitySet.Add(entity);
            await Save();
            return entity;
        }

        public async Task Delete(T entity)
        {
            EntitySet.Remove(entity);
            await Save();
        }

        public virtual async Task Update(T entity)
        {
            EntitySet.Entry(entity).State = EntityState.Modified;
            await Save();
        }

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
