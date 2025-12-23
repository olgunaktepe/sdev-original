using Microsoft.AspNetCore.Mvc;

namespace Minton.Controllers
{
    public class ExtendedController : Controller
    {
        public IActionResult Nestable() => View();
        public IActionResult Treeview() => View();
        public IActionResult SweetAlert() => View();
        public IActionResult Tour() => View();
        public IActionResult RangeSlider() => View();
        public IActionResult Scrollspy() => View();
    }
}