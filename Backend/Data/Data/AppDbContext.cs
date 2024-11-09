using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<UserEntity> Users { get; set; }
        public DbSet<ProductEntity> Productos { get; set; }
        public DbSet<OrderEntity> Orders { get; set; }
        public DbSet<EventOrderEntity> EventOrders { get; set; }
        public DbSet<OrderProductEntity> OrderProducts { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options)
       : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OrderProductEntity>()
                .HasKey(op => op.Id);

            modelBuilder.Entity<OrderProductEntity>()
                .HasOne(op => op.Order)
                .WithMany(o => o.OrderProducts)
                .HasForeignKey(op => op.OrderId);

            modelBuilder.Entity<OrderProductEntity>()
                .HasOne(op => op.Product)
                .WithMany(p => p.OrderProducts) 
                .HasForeignKey(op => op.ProductId);
        }

    }
}
