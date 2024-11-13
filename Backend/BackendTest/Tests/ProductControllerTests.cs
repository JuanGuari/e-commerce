using Application.DTOs;
using Application.Interfaces;
using Core.Utils;
using Microsoft.AspNetCore.Mvc;
using Moq;
using WebApp.Controllers.v1;

namespace BackendTest.Tests
{
    public class ProductControllerTests
    {
        private readonly Mock<IProductManager> _mockProductManager;
        private readonly ProductController _controller;

        public ProductControllerTests()
        {
            _mockProductManager = new Mock<IProductManager>();
            _controller = new ProductController(_mockProductManager.Object);
        }

        [Fact]
        public async Task GetProduct_ReturnsOkResult_WhenProductExists()
        {
            // Arrange
            var productDTO = new ProductDTO
            {
                Id = 1,
                Name = "Test Product",
                Description = "Ropa",
                Category = "A",
                Price = 100,
                ImageUrl = "image_url_here",
            };

            var resultOperation = new ResultOperation<ProductDTO>
            {
                Data = productDTO,
                IsSuccess = true,
                Message = "Product found"
            };

            _mockProductManager.Setup(service => service.GetById(1)).ReturnsAsync(resultOperation);

            // Act
            var result = await _controller.GetById(1);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedProduct = Assert.IsType<ProductDTO>(okResult.Value);
            Assert.Equal("Test Product", returnedProduct.Name);
        }
    }
}
