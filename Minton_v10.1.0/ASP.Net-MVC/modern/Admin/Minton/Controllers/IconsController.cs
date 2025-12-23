using Microsoft.AspNetCore.Mvc;

namespace Minton.Controllers
{
    public class IconsController : Controller
    {
        public IActionResult FontAwesome() => View();
        public IActionResult Boxicons() => View();
        public IActionResult Remix() => View();
        public IActionResult Mdi() => View();
        public IActionResult Feather() => View();
        public IActionResult Weather() => View();
    }
}