using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApp.Controllers.v1
{
    [Route("api/v1/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class CartController : ControllerBase
    {
        public readonly ICartManager _cartManager;

        public CartController(ICartManager cartManager)
        {
            _cartManager = cartManager;
        }

        [HttpPost]
        public async Task<IActionResult> AddToCart(int userId, int productId, int quantity)
        {
            var result = await _cartManager.AddToCartAsync(userId, productId, quantity);
            if (result.IsSuccess)
                return Ok(result);

            return BadRequest(result.Message);
        }

        [HttpGet]
        public async Task<IActionResult> GetCart(int userId)
        {
            var result = await _cartManager.GetCartAsync(userId);
            if (!result.IsSuccess)
            {
                return BadRequest(result.Message);
            }

            return Ok(result.Data);
        }

        //CONFIRMAR
        [HttpPost]
        public async Task<IActionResult> Checkout(int userId)
        {
            var result = await _cartManager.CheckoutAsync(userId);
            if (result.IsSuccess)
                return Ok(result);

            return BadRequest("There was a problem completing the order.");
        }

    }


}
