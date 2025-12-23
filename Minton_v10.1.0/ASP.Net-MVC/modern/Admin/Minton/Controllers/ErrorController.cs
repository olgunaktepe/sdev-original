using Microsoft.AspNetCore.Mvc;

namespace Minton.Controllers
{
    public class ErrorController : Controller
    {
        public IActionResult Error404Alt() => View();
        public IActionResult Error404() => View();
        public IActionResult Error500() => View();
    }
}