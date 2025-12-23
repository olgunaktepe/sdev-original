using Microsoft.AspNetCore.Mvc;

namespace Minton.Controllers
{
    public class EcommerceController : Controller
    {
        public IActionResult ProductCreate() => View();
        public IActionResult Products() => View();
        public IActionResult ProductsGrid() => View();
        public IActionResult ProductDetail() => View();
        public IActionResult Checkout() => View();
        public IActionResult OrdersDetail() => View();
        public IActionResult Customers() => View();
        public IActionResult Sellers() => View();
        public IActionResult Cart() => View();
        public IActionResult Orders() => View();
    }
}