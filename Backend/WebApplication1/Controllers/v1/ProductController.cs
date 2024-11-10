using Application.DTOs;
using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebApp.Controllers.v1
{
    [Route("api/v1/[controller]/[action]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        public readonly IProductManager _productManager;

        public ProductController(IProductManager productManager)
        {
            _productManager = productManager;
        }

        [HttpPost]
        public async Task<IActionResult> Post()
        {
            var result = await _productManager.AddProductsAsync();
            if (result.IsSuccess)
            {
                return Ok(result.Message);
            }
            return NotFound(result.Message);
        }

        [HttpGet] public async Task<IActionResult> GetAll([FromQuery] string? category, [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        { 
            var result = await _productManager.GetAll(category, pageNumber, pageSize);
            return Ok(result.Data);
            
        }

        [HttpGet]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _productManager.GetById(id);
            if (result.IsSuccess)
            {
                return Ok(result.Data);
            }

            return NotFound(result.Message);

        }


    }
}
