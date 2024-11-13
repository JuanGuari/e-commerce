using Domain.Entities;
using FluentAssertions;
using Infrastructure.Data;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BackendTest.Tests
{
    public class ProductRepositoryTest
    {
        private readonly DbContextOptions<AppDbContext> _options;

        public ProductRepositoryTest()
        {
            _options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDb")
                .Options;
        }


        [Fact]
        public async void AddProduct_ShouldAddProductToDatabase()
        {
            // Arrange
            var context = new AppDbContext(_options);
            var repository = new ProductRepository(context);
            var newProduct = new ProductEntity
            {
                Id = 1,
                Name = "Test Product",
                Description = "Ropa",
                Category = "A",
                Price = 100,
                ImageUrl = "image_url_here",
            };

            // Act
            await repository.Insert(newProduct);
            context.SaveChanges();

            // Assert
            var product = context.Productos.FirstOrDefault(p => p.Id == 1);
            product.Should().NotBeNull();
            product.Name.Should().Be("Test Product");
        }
    }
}
