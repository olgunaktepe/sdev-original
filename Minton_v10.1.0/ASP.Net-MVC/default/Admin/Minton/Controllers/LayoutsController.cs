using Microsoft.AspNetCore.Mvc;

namespace Minton.Controllers
{
    public class LayoutsController : Controller
    {
        public IActionResult Preloader() => View();
        public IActionResult Horizontal() => View();
        public IActionResult Detached() => View();
        public IActionResult TwoColumn() => View();
        public IActionResult Vertical() => View();
    }
}