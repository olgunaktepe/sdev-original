using Microsoft.AspNetCore.Mvc;

namespace Minton.Controllers
{
    public class PagesController : Controller
    {
        public IActionResult Gallery() => View();
        public IActionResult Invoice() => View();
        public IActionResult Search() => View();
        public IActionResult Pricing() => View();
        public IActionResult Faqs() => View();
        public IActionResult ComingSoon() => View();
        public IActionResult Maintenance() => View();
        public IActionResult Sitemap() => View();
        public IActionResult Timeline() => View();
        public IActionResult Starter() => View();
    }
}