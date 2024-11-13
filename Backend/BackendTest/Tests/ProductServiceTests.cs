using Application.Services;
using AutoMapper;
using Domain.Entities;
using Domain.ExternalServices;
using Domain.Repositories;
using Moq;
using Application.DTOs;

namespace BackendTest.Tests
{
    public class ProductServiceTests
    {
        private readonly Mock<IProductRepository> _mockProductRepo;
        private readonly Mock<IMercadoLibreService> _mercadoLibre;
        private readonly IMapper _mapper;
        private readonly ProductManager _productManager;

        public ProductServiceTests()
        {
            _mockProductRepo = new Mock<IProductRepository>();
            _mercadoLibre = new Mock<IMercadoLibreService>();

            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<ProductEntity, ProductDTO>();
            });

            _mapper = config.CreateMapper();
            _productManager = new ProductManager(_mapper, _mockProductRepo.Object, _mercadoLibre.Object);
        }

        [Fact]
        public async Task GetProductById_ReturnsProduct_WhenProductExists()
        {
            // Arrange
            var productId = 1;
            var product = new ProductEntity
            {
                Id = 1,
                Name = "Test Product",
                Description = "Ropa",
                Category = "A",
                Price = 100,
                ImageUrl = "image_url_here",
            };

            var productDTO = new ProductDTO
            {
                Id = 1,
                Name = "Test Product",
                Description = "Ropa",
                Category = "A",
                Price = 100,
                ImageUrl = "image_url_here",
            };

            _mockProductRepo.Setup(repo => repo.GetByID(productId)).ReturnsAsync(product);

            // Act
            var result = await _productManager.GetById(productId);

            // Assert
            result.Data.Equals(productDTO);
        }

        [Fact]
        public async Task GetProductById_ReturnsNull_WhenProductDoesNotExist()
        {
            // Arrange
            var productId = 2;
            _mockProductRepo.Setup(repo => repo.GetByID(productId)).ReturnsAsync((ProductEntity?)null);

            // Act
            var result = await _productManager.GetById(productId);

            // Assert
            result.Message.Equals("Product not found");
        }
    }
}
